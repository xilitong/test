<template>
  <div class="register-container">
    <div class="register-box">
      <div class="logo-section">
        <!-- 左侧logo空间 -->
        <div class="logo-placeholder">
          <img v-if="logoUrl" :src="logoUrl" alt="Logo" class="logo-image">
          <div v-else class="logo-text">{{ $t('register.title') }}</div>
        </div>
      </div>
      <div class="form-section">
        <h2 class="register-title">{{ $t('register.title') }}</h2>
        
        <form @submit.prevent="handleRegister" class="register-form">
          <div class="form-group">
            <label for="username">{{ $t('register.username') }}:</label>
            <input 
              id="username"
              v-model="registerForm.username" 
              type="text" 
              :placeholder="$t('register.username')" 
              required
            />
          </div>
          
          <div class="form-group">
            <label for="phoneNumber">{{ $t('register.phoneNumber') }}:</label>
            <input 
              id="phoneNumber"
              v-model="registerForm.phoneNumber" 
              type="tel" 
              :placeholder="$t('register.phoneNumber')" 
              required
            />
          </div>
          
          <div class="form-group">
            <label for="smsCode">{{ $t('register.smsCode') }}:</label>
            <div class="sms-code-group">
              <input 
                id="smsCode"
                v-model="registerForm.smsCode" 
                type="text" 
                :placeholder="$t('register.smsCode')" 
                required
              />
              <button 
                type="button" 
                :disabled="smsCountdown > 0 || sendingSms"
                @click="sendSmsCode"
                class="sms-code-btn"
              >
                {{ sendingSms ? $t('register.sendingSms') : (smsCountdown > 0 ? $t('register.resendSmsCode', { count: smsCountdown }) : $t('register.getSmsCode')) }}
              </button>
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">{{ $t('register.password') }}:</label>
            <input 
              id="password"
              v-model="registerForm.password" 
              type="password" 
              :placeholder="$t('register.password')" 
              required
            />
          </div>
          
          <div class="form-group">
            <label for="confirmPassword">{{ $t('register.confirmPassword') }}:</label>
            <input 
              id="confirmPassword"
              v-model="registerForm.confirmPassword" 
              type="password" 
              :placeholder="$t('register.confirmPassword')" 
              required
            />
          </div>
          
          <div class="form-group">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                v-model="agreeTerms"
              />
              <span class="checkbox-text">{{ $t('register.agreeTerms') }}<a href="#" class="terms-link">{{ $t('register.userAgreement') }}</a>{{ $t('register.and') }}<a href="#" class="terms-link">{{ $t('register.privacyPolicy') }}</a></span>
            </label>
          </div>
          
          <button type="submit" class="register-button" :disabled="!agreeTerms || loading">
            {{ loading ? $t('register.registering') : $t('register.registerButton') }}
          </button>
        </form>
        
        <div class="register-footer">
          <button @click="goToLogin" class="login-link">{{ $t('register.hasAccount') }}</button>
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
  name: 'RegisterView',
  setup() {
    const router = useRouter()
    
    // 注册表单
    const registerForm = ref({
      username: '',
      phoneNumber: '',
      smsCode: '',
      password: '',
      confirmPassword: ''
    })
    
    // 同意条款
    const agreeTerms = ref(false)
    
    // 加载状态
    const loading = ref(false)
    const sendingSms = ref(false)
    
    // 短信倒计时
    const smsCountdown = ref(0)
    let countdownTimer = null
    
    const logoUrl = ref('') // 可以设置实际logo路径
    
    // 跳转到登录页面
    const goToLogin = () => {
      router.push('/login')
    }
    
    // 注册处理
    const handleRegister = async () => {
      if (!agreeTerms.value) {
        alert('请先同意用户协议和隐私政策')
        return
      }
      
      if (registerForm.value.password !== registerForm.value.confirmPassword) {
        alert('两次输入的密码不一致')
        return
      }
      
      try {
        loading.value = true
        // 实际项目中这里会调用注册API
        const response = await userApi.register({
          username: registerForm.value.username,
          phoneNumber: registerForm.value.phoneNumber,
          smsCode: registerForm.value.smsCode,
          password: registerForm.value.password
        })
        
        if (response.success) {
          console.log('注册信息:', registerForm.value)
          alert('注册成功！')
          
          // 注册成功后跳转到登录页面
          router.push('/login')
        } else {
          alert(response.message || '注册失败')
        }
      } catch (error) {
        console.error('注册失败:', error)
        alert('注册失败，请稍后重试')
      } finally {
        loading.value = false
      }
    }
    
    // 发送短信验证码
    const sendSmsCode = async () => {
      if (!registerForm.value.phoneNumber) {
        alert('请输入手机号')
        return
      }
      
      try {
        sendingSms.value = true
        // 实际项目中这里会调用发送短信的API
        const response = await userApi.sendSmsCode(registerForm.value.phoneNumber)
        
        if (response.success) {
          console.log('发送短信验证码到:', registerForm.value.phoneNumber)
          
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
      registerForm,
      agreeTerms,
      loading,
      sendingSms,
      smsCountdown,
      logoUrl,
      handleRegister,
      sendSmsCode,
      goToLogin
    }
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px 0;
}

.register-box {
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

.register-title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.register-form {
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

.checkbox-label {
  display: flex;
  align-items: center;
  font-weight: normal;
  cursor: pointer;
  white-space: nowrap;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  margin: 0;
}

.checkbox-text {
  margin-left: 8px;
}

.terms-link {
  color: #4CAF50;
  text-decoration: none;
}

.terms-link:hover {
  text-decoration: underline;
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

.register-button {
  width: 100%;
  padding: 12px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 10px;
}

.register-button:hover:not(:disabled) {
  background: #45a049;
}

.register-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.register-footer {
  text-align: center;
  margin-top: 20px;
}

.login-link {
  background: none;
  border: none;
  color: #4CAF50;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
}

.login-link:hover {
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