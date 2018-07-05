import locale from 'react-native-i18n'
import en from './languages/en'
import zh from './languages/zh'

locale.defaultLocale = 'en'
locale.translations = {en,zh}
locale.locale = 'zh'

export default locale