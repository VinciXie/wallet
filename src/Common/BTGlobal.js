
import {Platform,Dimensions} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import locale from '../locals/index'
import px2dp from './px2dp'
import '../lib/bundle'
import Storage from '../DB/Storage'

global.DeviceInfo = DeviceInfo
global.isIOS = Platform.OS==='ios'
global.locale = locale
global.px2dp = px2dp
global.ScreenWidth = Dimensions.get('window').width
global.ScreenHeight = Dimensions.get('window').height
global.Scale = Dimensions.get('window').scale
global.BTCrypto = window.BTCrypto
global.Storage = Storage

export default global