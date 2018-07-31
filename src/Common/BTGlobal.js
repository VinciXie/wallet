
import {Platform,Dimensions} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import locale from '../locales/index'
import px2dp from './px2dp'
import '../lib/bundle'
import Storage from '../DB/Storage'
import DB from '../DB/DB'
import BTCrypto from '../lib/BTCrypto'

global.DeviceInfo = DeviceInfo
global.isIOS = Platform.OS==='ios'
global.Locale = locale
global.px2dp = px2dp
global.ScreenWidth = Dimensions.get('window').width
global.ScreenHeight = Dimensions.get('window').height
global.Scale = Dimensions.get('window').scale
global.BTCrypto = BTCrypto
global.Storage = Storage
global.DB =  DB

export default global