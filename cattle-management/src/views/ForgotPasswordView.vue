<template>
  <div class="forgot-password-container">
    <div class="forgot-password-box">
      <div class="logo-section">
        <!-- 左侧logo空间 -->
        <div class="logo-placeholder">
          <img v-if="logoUrl" :src="logoUrl" alt="Logo" class="logo-image">
          <div v-else class="logo-text">{{ $t('forgotPassword.title') }}</div>
        </div>
      </div>
      <div class="form-section">
        <h2 class="forgot-password-title">{{ $t('forgotPassword.title') }}</h2>
        
        <!-- 步骤指示器 -->
        <div class="steps">
          <div 
            :class="['step', { active: step >= 1 }]" 
            @click="step = 1"
          >
            <div class="step-number">1</div>
            <div class="step-label">{{ $t('forgotPassword.step1') }}</div>
          </div>
          <div 
            :class="['step', { active: step >= 2 }]" 
            @click="step = 2"
          >
            <div class="step-number">2</div>
            <div class="step-label">{{ $t('forgotPassword.step2') }}</div>
          </div>
          <div 
            :class="['step', { active: step >= 3 }]" 
            @click="step = 3"
          >
            <div class="step-number">3</div>
            <div class="step-label">{{ $t('forgotPassword.step3') }}</div>
          </div>
        </div>

        <!-- 第一步：验证身份 -->
        <form v-if="step === 1" @submit.prevent="verifyIdentity" class="forgot-password-form">
          <div class="form-group">
            <label for="phoneNumber">{{ $t('forgotPassword.phoneNumber') }}:</label>
            <input 
              id="phoneNumber"
              v-model="forgotPasswordForm.phoneNumber" 
              type="tel" 
              :placeholder="$t('forgotPassword.phoneRequired')" 
              required
            />
          </div>
          <div class="form-group">
            <label for="smsCode">{{ $t('forgotPassword.smsCode') }}:</label>
            <div class="sms-code-group">
              <input 
                id="smsCode"
                v-model="forgotPasswordForm.smsCode" 
                type="text" 
                :placeholder="$t('forgotPassword.smsCodeRequired')" 
                required
              />
              <button 
                type="button" 
                :disabled="smsCountdown > 0 || sendingSms"
                @click="sendSmsCode"
                class="sms-code-btn"
              >
                {{ sendingSms ? $t('forgotPassword.sendingSms') : (smsCountdown > 0 ? $t('forgotPassword.resendSmsCode', { count: smsCountdown }) : $t('forgotPassword.getSmsCode')) }}
              </button>
            </div>
          </div>
          <div class="form-actions">
            <button type="button" @click="goToLogin" class="secondary-button">{{ $t('forgotPassword.backToLogin') }}</button>
            <button type="submit" class="primary-button" :disabled="loading">
              {{ loading ? $t('forgotPassword.verifying') : $t('forgotPassword.nextStep') }}
            </button>
          </div>
        </form>

        <!-- 第二步：重置密码 -->
        <form v-if="step === 2" @submit.prevent="resetPassword" class="forgot-password-form">
          <div class="form-group">
            <label for="newPassword">{{ $t('forgotPassword.newPassword') }}:</label>
            <input 
              id="newPassword"
              v-model="forgotPasswordForm.newPassword" 
              type="password" 
              :placeholder="$t('forgotPassword.newPasswordRequired')" 
              required
            />
          </div>
          <div class="form-group">
            <label for="confirmPassword">{{ $t('forgotPassword.confirmPassword') }}:</label>
            <input 
              id="confirmPassword"
              v-model="forgotPasswordForm.confirmPassword" 
              type="password" 
              :placeholder="$t('forgotPassword.confirmPasswordRequired')" 
              required
            />
          </div>
          <div class="form-actions">
            <button type="button" @click="step = 1" class="secondary-button">{{ $t('forgotPassword.prevStep') }}</button>
            <button type="submit" class="primary-button" :disabled="loading">
              {{ loading ? $t('forgotPassword.resetting') : $t('forgotPassword.finish') }}
            </button>
          </div>
        </form>

        <!-- 第三步：完成 -->
        <div v-if="step === 3" class="success-section">
          <div class="success-icon">✓</div>
          <h3>{{ $t('forgotPassword.successTitle') }}</h3>
          <p>{{ $t('forgotPassword.successMessage') }}</p>
          <button @click="goToLogin" class="primary-button">{{ $t('forgotPassword.loginNow') }}</button>
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
  name: 'ForgotPasswordView',
  setup() {
    const router = useRouter()
    
    // 当前步骤
    const step = ref(1)
    
    // 忘记密码表单
    const forgotPasswordForm = ref({
      phoneNumber: '',
      smsCode: '',
      newPassword: '',
      confirmPassword: ''
    })
    
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
    
    // 发送短信验证码
    const sendSmsCode = async () => {
      if (!forgotPasswordForm.value.phoneNumber) {
        alert('请输入手机号')
        return
      }
      
      try {
        sendingSms.value = true
        // 实际项目中这里会调用发送短信的API
        const response = await userApi.sendSmsCode(forgotPasswordForm.value.phoneNumber)
        
        if (response.success) {
          console.log('发送短信验证码到:', forgotPasswordForm.value.phoneNumber)
          
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
    
    // 验证身份
    const verifyIdentity = async () => {
      if (!forgotPasswordForm.value.phoneNumber || !forgotPasswordForm.value.smsCode) {
        alert('请输入手机号和验证码')
        return
      }
      
      try {
        loading.value = true
        // 实际项目中这里会调用验证身份的API
        // 模拟验证过程
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 验证成功，进入下一步
        step.value = 2
      } catch (error) {
        console.error('验证失败:', error)
        alert('验证失败，请稍后重试')
      } finally {
        loading.value = false
      }
    }
    
    // 重置密码
    const resetPassword = async () => {
      if (!forgotPasswordForm.value.newPassword || !forgotPasswordForm.value.confirmPassword) {
        alert('请输入新密码和确认密码')
        return
      }
      
      if (forgotPasswordForm.value.newPassword !== forgotPasswordForm.value.confirmPassword) {
        alert('两次输入的密码不一致')
        return
      }
      
      try {
        loading.value = true
        // 实际项目中这里会调用重置密码的API
        const response = await userApi.resetPassword({
          phoneNumber: forgotPasswordForm.value.phoneNumber,
          smsCode: forgotPasswordForm.value.smsCode,
          newPassword: forgotPasswordForm.value.newPassword
        })
        
        if (response.success) {
          console.log('重置密码:', forgotPasswordForm.value)
          
          // 重置成功，进入完成步骤
          step.value = 3
        } else {
          alert(response.message || '重置密码失败')
        }
      } catch (error) {
        console.error('重置密码失败:', error)
        alert('重置密码失败，请稍后重试')
      } finally {
        loading.value = false
      }
    }
    
    // 清理定时器
    onUnmounted(() => {
      if (countdownTimer) {
        clearInterval(countdownTimer)
      }
    })
    
    return {
      step,
      forgotPasswordForm,
      loading,
      sendingSms,
      smsCountdown,
      logoUrl,
      verifyIdentity,
      resetPassword,
      sendSmsCode,
      goToLogin
    }
  }
}
</script>

<style scoped>
.forgot-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px 0;
}

.forgot-password-box {
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

.forgot-password-title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  position: relative;
}

.steps::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  height: 2px;
  background: #ddd;
  z-index: 1;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  cursor: pointer;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ddd;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 5px;
}

.step-label {
  font-size: 14px;
  color: #666;
}

.step.active .step-number {
  background: #4CAF50;
}

.step.active .step-label {
  color: #4CAF50;
  font-weight: bold;
}

.forgot-password-form {
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

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.primary-button {
  padding: 12px 20px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.primary-button:hover:not(:disabled) {
  background: #45a049;
}

.primary-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.secondary-button {
  padding: 12px 20px;
  background: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.secondary-button:hover {
  background: #e0e0e0;
}

.success-section {
  text-align: center;
  padding: 20px 0;
}

.success-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #4CAF50;
  color: white;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.success-section h3 {
  margin-bottom: 10px;
  color: #333;
}

.success-section p {
  margin-bottom: 20px;
  color: #666;
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