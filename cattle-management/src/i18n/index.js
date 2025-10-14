import { createI18n } from 'vue-i18n'

// 语言包
import zh from './locales/zh.json'

// 支持的语言列表
export const availableLocales = [
  {
    name: 'zh',
    title: '中文'
  }
]

// 默认语言
const DEFAULT_LOCALE = 'zh'

// 消息对象
const messages = {
  zh
}

// 创建i18n实例
const i18n = createI18n({
  legacy: false, // 使用Composition API模式
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages
})

export default i18n