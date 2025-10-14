<template>
  <div class="login-container">
    <div class="login-box">
      <div class="logo-section">
        <!-- 左侧logo空间 -->
        <div class="logo-placeholder">
          <img v-if="logoUrl" :src="logoUrl" alt="Logo" class="logo-image">
          <div v-else class="logo-text">{{ $t('login.title') }}</div>
        </div>
      </div>
      <div class="form-section">
        <h2 class="login-title">{{ $t('login.title') }}</h2>
        
        <!-- 登录方式切换 -->
        <div class="login-methods">
          <button 
            :class="{ active: loginMethod === 'account' }"
            @click="loginMethod = 'account'"
            class="method-btn"
          >
            {{ $t('login.accountLogin') }}
          </button>
          <button 
            :class="{ active: loginMethod === 'phone' }"
            @click="loginMethod = 'phone'"
            class="method-btn"
          >
            {{ $t('login.phoneLogin') }}
          </button>
          <button 
            :class="{ active: loginMethod === 'wechat' }"
            @click="loginMethod = 'wechat'"
            class="method-btn"
          >
            {{ $t('login.wechatLogin') }}
          </button>
        </div>

        <!-- 账号登录表单 -->
        <form v-if="loginMethod === 'account'" @submit.prevent="handleAccountLogin" class="login-form">
          <div class="form-group">
            <label for="username">{{ $t('login.username') }}:</label>
            <input 
              id="username"
              v-model="accountForm.username" 
              type="text" 
              :placeholder="$t('login.usernameRequired')" 
              required
            />
          </div>
          <div class="form-group">
            <label for="password">{{ $t('login.password') }}:</label>
            <input 
              id="password"
              v-model="accountForm.password" 
              type="password" 
              :placeholder="$t('login.passwordRequired')" 
              required
            />
          </div>
          <button type="submit" class="login-button" :disabled="loading">{{ loading ? $t('login.loggingIn') : $t('login.loginButton') }}</button>
        </form>

        <!-- 手机号登录表单 -->
        <form v-if="loginMethod === 'phone'" @submit.prevent="handlePhoneLogin" class="login-form">
          <div class="form-group">
            <label for="phoneNumber">{{ $t('login.phoneNumber') }}:</label>
            <input 
              id="phoneNumber"
              v-model="phoneForm.phoneNumber" 
              type="tel" 
              :placeholder="$t('login.phoneRequired')" 
              required
            />
          </div>
          <div class="form-group">
            <label for="smsCode">{{ $t('login.smsCode') }}:</label>
            <div class="sms-code-group">
              <input 
                id="smsCode"
                v-model="phoneForm.smsCode" 
                type="text" 
                :placeholder="$t('login.smsCodeRequired')" 
                required
              />
              <button 
                type="button" 
                :disabled="smsCountdown > 0 || sendingSms"
                @click="sendSmsCode"
                class="sms-code-btn"
              >
                {{ sendingSms ? $t('login.sendingSms') : (smsCountdown > 0 ? $t('login.resendSmsCode', { count: smsCountdown }) : $t('login.getSmsCode')) }}
              </button>
            </div>
          </div>
          <button type="submit" class="login-button" :disabled="loading">{{ loading ? $t('login.loggingIn') : $t('login.loginButton') }}</button>
        </form>

        <!-- 微信扫码登录 -->
        <div v-if="loginMethod === 'wechat'" class="wechat-login">
          <div class="qrcode-placeholder">
            <div class="qrcode-area">
              <div class="qrcode-image">
                <!-- 这里应该是实际的二维码 -->
                <div class="qrcode-content">二维码区域</div>
              </div>
              <p class="qrcode-tip">{{ $t('login.wechatQrCodeTip') }}</p>
            </div>
          </div>
          <div class="qrcode-status">
            <p>{{ $t('login.wechatQrCodeStatus') }}: <span>{{ $t('login.wechatQrCodeWaiting') }}</span></p>
          </div>
        </div>

        <!-- 注册和忘记密码链接 -->
        <div class="login-footer">
          <button @click="goToRegister" class="register-link">{{ $t('login.registerLink') }}</button>
          <button @click="goToForgotPassword" class="forgot-password-link">{{ $t('login.forgotPasswordLink') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { userApi } from '@/services/api'

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter()
    
    // 登录方式
    const loginMethod = ref('account') // account, phone, wechat
    
    // 账号登录表单
    const accountForm = ref({
      username: '',
      password: ''
    })
    
    // 手机号登录表单
    const phoneForm = ref({
      phoneNumber: '',
      smsCode: ''
    })
    
    // 加载状态
    const loading = ref(false)
    const sendingSms = ref(false)
    
    // 短信倒计时
    const smsCountdown = ref(0)
    let countdownTimer = null
    
    // 微信登录状态
    const wechatStatus = ref('等待扫描')
    
    const logoUrl = ref('') // 可以设置实际logo路径
    
    // 切换到注册页面
    const goToRegister = () => {
      router.push('/register')
    }
    
    // 跳转到忘记密码页面
    const goToForgotPassword = () => {
      router.push('/forgot-password')
    }
    
    // 账号登录
    const handleAccountLogin = async () => {
      // 简单验证，实际项目中应该调用API进行验证
      if (!accountForm.value.username || !accountForm.value.password) {
        alert('请输入用户名和密码')
        return
      }
      
      try {
        loading.value = true
        // 实际项目中这里会调用API进行登录
        const response = await userApi.login({
          username: accountForm.value.username,
          password: accountForm.value.password
        })
        
        if (response.success) {
          // 存储登录状态
          localStorage.setItem('isAuthenticated', 'true')
          router.push('/dashboard')
        } else {
          alert(response.message || '登录失败')
        }
      } catch (error) {
        console.error('登录失败:', error)
        alert('登录失败，请稍后重试')
      } finally {
        loading.value = false
      }
    }
    
    // 手机号登录
    const handlePhoneLogin = async () => {
      if (!phoneForm.value.phoneNumber || !phoneForm.value.smsCode) {
        alert('请输入手机号和验证码')
        return
      }
      
      try {
        loading.value = true
        // 实际项目中这里会调用API进行登录
        const response = await userApi.loginByPhone({
          phoneNumber: phoneForm.value.phoneNumber,
          smsCode: phoneForm.value.smsCode
        })
        
        if (response.success) {
          // 存储登录状态
          localStorage.setItem('isAuthenticated', 'true')
          router.push('/dashboard')
        } else {
          alert(response.message || '登录失败')
        }
      } catch (error) {
        console.error('登录失败:', error)
        alert('登录失败，请稍后重试')
      } finally {
        loading.value = false
      }
    }
    
    // 发送短信验证码
    const sendSmsCode = async () => {
      if (!phoneForm.value.phoneNumber) {
        alert('请输入手机号')
        return
      }
      
      try {
        sendingSms.value = true
        // 实际项目中这里会调用发送短信的API
        const response = await userApi.sendSmsCode(phoneForm.value.phoneNumber)
        
        if (response.success) {
          console.log('发送短信验证码到:', phoneForm.value.phoneNumber)
          
          // 启动倒计时
          smsCountdown.value = 60
          countdownTimer = setInterval(() => {
            smsCountdown.value--
            if (smsCountdown.value <= 0) {
              clearInterval(countdownTimer)
            }
          }, 1000)
        } else {
          alert(response.message || '发送验证码失败')
        }
      } catch (error) {
        console.error('发送验证码失败:', error)
        alert('发送验证码失败，请稍后重试')
      } finally {
        sendingSms.value = false
      }
    }
    
    // 清理定时器
    onUnmounted(() => {
      if (countdownTimer) {
        clearInterval(countdownTimer)
      }
    })
    
    return {
      loginMethod,
      accountForm,
      phoneForm,
      loading,
      sendingSms,
      smsCountdown,
      wechatStatus,
      logoUrl,
      handleAccountLogin,
      handlePhoneLogin,
      sendSmsCode,
      goToRegister,
      goToForgotPassword
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px 0;
}

.login-box {
  display: flex;
  width: 900px;
  max-width: 90vw;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.logo-section {
  flex: 1;
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-placeholder {
  text-align: center;
  color: white;
}

.logo-image {
  max-width: 80%;
  max-height: 200px;
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
}

.form-section {
  flex: 1.5;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 80vh;
  overflow-y: auto;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.login-methods {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.method-btn {
  flex: 1;
  padding: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 14px;
}

.method-btn.active {
  color: #4CAF50;
  border-bottom: 2px solid #4CAF50;
}

.login-form {
  width: 100%;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
}

.sms-code-group {
  display: flex;
  gap: 10px;
}

.sms-code-group input {
  flex: 1;
}

.sms-code-btn {
  padding: 10px 12px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 14px;
}

.sms-code-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.login-button {
  width: 100%;
  padding: 12px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.login-button:hover:not(:disabled) {
  background: #45a049;
}

.login-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.wechat-login {
  text-align: center;
}

.qrcode-placeholder {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.qrcode-area {
  text-align: center;
}

.qrcode-image {
  width: 180px;
  height: 180px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qrcode-content {
  color: #999;
}

.qrcode-tip {
  margin-top: 15px;
  color: #666;
}

.qrcode-status {
  margin-top: 20px;
}

.qrcode-status span {
  color: #4CAF50;
  font-weight: bold;
}

.login-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.register-link,
.forgot-password-link {
  background: none;
  border: none;
  color: #4CAF50;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
}

.register-link:hover,
.forgot-password-link:hover {
  color: #45a049;
}
/* 滚动条样式 */
.form-section::-webkit-scrollbar {
  width: 6px;
}

.form-section::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.form-section::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.form-section::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>