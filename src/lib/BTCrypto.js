import React,{PureComponent} from 'react'
import {View,NativeModules} from 'react-native'
import './bundle'

const BTKeystore = NativeModules.BTKeystore
const Crypto = window.BTCrypto
const BTCrypto = Object.assign({},Crypto,BTKeystore)

export default BTCrypto