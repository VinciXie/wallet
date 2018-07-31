import locale from 'react-native-i18n'
import en from './languages/en' 
import zh from './languages/zh'
import DeviceInfo from 'react-native-device-info'
import Storage from '../DB/Storage'

locale.fallbacks = true

let deviceLocale = DeviceInfo.getDeviceLocale()
locale.translations = {'en':en,'zh-Hans-US':zh}

Storage.load({key:'locale'}).then(response=>{
    if(response){
        locale.locale = response.locale
    }
}).catch(error=>{

})

if(typeof locale.locale == undefined){
    locale.locale = deviceLocale
}

export default locale

