import React,{PureComponent} from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity,Modal} from 'react-native'
import BTInputItem from '../../Component/BTInputItem'
import BTButton from '../../Component/BTButton'
import {Actions} from 'react-native-router-flux'
import BTCoinType from './BTCoinType'
import BTPasswordInput from '../../Component/BTPasswordInput'
import {Toast} from 'antd-mobile-rn'
import {getBlockInfo} from '../../Common/BTCommonApi'
import {transactionPack} from '../../lib/BTPackManager'
import {messageSign} from '../../lib/BTSignManager'
import {BTFetch} from '../../Common/BTFetch'
import Locale from '../../locales/index'
// const Locale = global.Locale

const px2dp = global.px2dp
const BTCrypto = global.BTCrypto
const Keystore = BTCrypto.keystore
const Storage = global.Storage


export default class BTTransaction extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            from:'',
            to:'',
            number:'',
            visible:false,
            showPasswordInput:false,
            password:'',
            coinType:'BTO'
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.scanResult){
            let scanResult = nextProps.scanResult
            this.setState({to:scanResult})
        }
    }

    scanAccount(){
        Actions.push('qrscaner',{backComponent:'transaction'})
    }

    numberChange(value){
        if(isNaN(value)) {
            // this.setState({visible:true,title:window.localeInfo["Wallet.PleaseInputNumber"]})
            alert("请输入数字")
            return;
        }else if(value > Math.pow(10,9)){
            // this.setState({visible:true,title:window.localeInfo["Wallet.NumberIsTooBig"]})
            alert('输入金额过大')
            return
        }else{
            console.log({value})
        }

        this.setState({number:value})
    }

    async nextButtonClick(){
        if(this.state.to==''){
            Toast.fail(Locale.t('Message_PlaceInputAcceptAccount'))
            return
        }

        if(Number(this.state.number)<=0){
            Toast.fail(Locale.t('Message_NumberMustGreaterZero'))
            return
        }

        this.setState({showPasswordInput:true})
    }

     async commitButtonClick(){
        this.setState({showPasswordInput:false})
        Toast.loading(Locale.t('Message_IsTransfer'),10*1000)
        let blockInfo = await getBlockInfo()

        try{
            setTimeout(async()=>{
                let currentAccount = await Storage.load({key:'account'})
                let from = currentAccount.account
                let keystore = JSON.parse(currentAccount.data.keystore)
                let password = this.state.password
    
                let privateKey = Keystore.recover(password,keystore)
    
                let did = {
                    "from": from,
                    "to": this.state.to,
                    token_type:this.state.coinType,
                    "price": this.state.number * Math.pow(10,8),
                    "remark": "April's rent"
                }
                let didBuf = transactionPack(did)
                let fetchParam = {
                    "version": 1,
                    ...blockInfo,
                    "sender": from,
                    "contract": this.state.coinType === "DTO" ? "bottoscontract" : "bottos",
                    "method": "transfer",
                    "sig_alg": 1
                }
    
                fetchParam.param = didBuf
    
                let sign = messageSign(fetchParam,privateKey)
                fetchParam.signature = sign.toString('hex')
                fetchParam.param = BTCrypto.buf2hex(didBuf)
                let url = '/user/transfer'
                BTFetch(url,'POST',fetchParam).then(response=>{
                    console.log({response})
                    if(response && response.code==1){
                        Toast.success(Locale.t('Message_TransferSuccess'))
                        Actions.pop()
                    }else{
                        Toast.fail(Locale.t('Message_TransferFailed'))
                    }
                    
                }).catch(error=>{
                    console.log({error})
                    Toast.fail(Locale.t('Message_TransferFailed'))
                })
            },1000)
        }catch(error){
            Toast.fail(Locale.t('Message_TransferFailed'))
            console.log({error})
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Modal transparent={true} visible={this.state.visible} style={{backgroundColor:'red',width:px2dp(400),height:px2dp(400)}}>
                    <BTCoinType onPress={(coinType)=>{this.setState({visible:false,coinType})}}/>
                </Modal>
                <Modal transparent={true} visible={this.state.showPasswordInput} style={{flex:1}}>
                    <BTPasswordInput onPress={()=>{this.setState({showPasswordInput:false})}} onChange={(value)=>{this.setState({password:value})}} commitButtonClick={()=>{this.commitButtonClick()}}/>
                </Modal>

                <View style={styles.navStyle}>
                    <TouchableOpacity onPress={()=>{Actions.pop()}}><Image source={require('../../Public/img/back_arr_black.png')} style={{width:px2dp(25),height:px2dp(12)}}/></TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.scanAccount()}}><Image source={require('../../Public/img/scaner_black.png')} style={{width:px2dp(32),height:px2dp(27)}}/></TouchableOpacity>
                </View>
                <Text style={{fontSize:24,marginTop:px2dp(12),marginLeft:px2dp(20)}}>{Locale.t('Transfer_Transaction')}</Text>
                <View>
                    {/* <BTInputItem title="转账账户" color="black" showArr={true} lineStyle={{backgroundColor:'#E5E5E5'}} placeholder="dfsffdsf" arrPress={()=>{alert('arrorPress')}}/> */}
                    <BTInputItem title={Locale.t('Transfer_Address')} onChangeText={(value)=>{this.setState({to:value})}} color="black" lineStyle={{backgroundColor:'#E5E5E5'}} placeholder="请输入收款账户地址"/>
                    <BTInputItem title={Locale.t('Transfer_Count')} keyboardType="numeric" onChangeText={(value)=>{this.numberChange(value)}} color="black" lineStyle={{backgroundColor:'#E5E5E5'}} placeholder="请输入转账数量"/>
                    <BTInputItem title={Locale.t('Transfer_CoinType')} editable={false} value={this.state.coinType} color="black" showArr={true} lineStyle={{backgroundColor:'#E5E5E5'}} placeholder="请选择币种" arrPress={()=>{this.setState({visible:true})}}/>
                </View>
                <BTButton title={Locale.t('Other_Next')} style={styles.buttonStyle} onClick={()=>{this.nextButtonClick()}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{flex:1,backgroundColor:'white'},
    navStyle:{height:px2dp(64),justifyContent:'space-between',alignItems:'center',flexDirection:'row',paddingTop:px2dp(20),paddingLeft:px2dp(20),paddingRight:px2dp(20)},
    buttonStyle:{alignSelf:'center',width:px2dp(333),height:px2dp(60),marginTop:px2dp(10),borderRadius:px2dp(45)}
})