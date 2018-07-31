import React,{PureComponent} from 'react'
import {View,Text,TextInput,Image,TouchableOpacity,Clipboard,Alert,Modal} from 'react-native'
import BTDivView from '../../Component/BTDivView'
import BTButton from '../../Component/BTButton'
import BTWalletCard from './BTWalletCard'
import {BTFetch} from '../../Common/BTFetch'
import Locale from '../../locales/index'
import {Toast} from 'antd-mobile-rn'
import BTPasswordInput from '../../Component/BTPasswordInput'
import { Actions } from '../../../node_modules/react-native-router-flux';
const Storage = global.Storage
const BTCrypto = global.BTCrypto
const Keystore = BTCrypto.keystore
const DB = global.DB
// const Locale = global.Locale

const px2dp = global.px2dp

export default class BTWalletDetail extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            totalCount:0,
            account:'',
            keystore:'',
            password:'',
            showPasswordInput:false
        }
    }

    componentWillMount(){
        let account = this.props.account
        let keystore = ''
        DB.findAccounts(account,async(tx,response)=>{
            let len = response.rows.length
            if(len>0){
                let accountInfo = response.rows.item(0)
                keystore = accountInfo.keystore
            }
            try{
                let price = await Storage.load({key:'price'})
                let url = '/user/GetBalance'
                let params = {
                    username:account
                }
                let res = await BTFetch(url,'POST',params)
                if(res && res.code==1){
                    let data = res.data
                    let totalCount = 0
                    data.forEach(item => {
                        if(item.token_type=='BTO'){
                            totalCount = item.value / Math.pow(10,8) * price.bto_usdt_price * price.usdt_cny_price
                        }
                    })
                    this.setState({totalCount,account,keystore})
                }else{
                    Toast.fail(Locale.t('Message_GetAssetFailed'))
                    totalCount = '?'
                    this.setState({totalCount,account,keystore})
                }
            }catch(error){
                Toast.fail(Locale.t('Message_GetAssetFailed'))
                totalCount = '?'
                this.setState({totalCount,account,keystore})
            }
        })
    }
    
    copyKeystore(){
        Clipboard.setString(this.state.keystore)
    }

    async removeKeystore(){
        Alert.alert(Locale.t('Message_Alert'),Locale.t('Message_AlertDeleteKeystore'),[
            {text:Locale.t('Message_Cancel'),onPress:()=>{}},
            {text:Locale.t('Message_Sure'),onPress:()=>{this.setState({showPasswordInput:true})}}
        ])
    }

    async deleteAccount(){
        if(this.state.password==''){
            Toast.fail(Locale.t('Regist_Password'))
            return
        }
        let localAccountInfo =  await Storage.load({key:'account'})
        console.log({localAccountInfo})
        this.setState({showPasswordInput:false})
        Toast.loading(Locale.t('Message_OnVerify'))
        setTimeout(async()=>{
            console.log('setTimeout')
            try{
                let privateKey = Keystore.recover(this.state.password,JSON.parse(this.state.keystore))
                if(privateKey){
                    DB.remove(this.state.account,async(tx,response)=>{
                        if(response){
                            // 如果删除的是当前登录账户，要同步删除localStore中的账户
                            if(this.state.account == localAccountInfo.account){
                                try{
                                    Storage.remove({key:'account'})
                                    Toast.success(Locale.t('Message_DeleteSuccess'))
                                    Actions.push('deleteSuccess')
                                }catch(error){
                                    Toast.fail(Locale.t('Message_DeleteFailed'))
                                }
                            }else{
                                Toast.success(Locale.t('Message_DeleteSuccess'))
                                Actions.push('deleteSuccess')
                            }
                        }else{
                            Toast.fail(Locale.t('Message_DeleteFailed'))
                        }
                    })
                }else{
                    Toast.fail(Locale.t('Message_PasswordWrong'))
                }
           }catch(error){
               Toast.fail(Locale.t('Message_DeleteFailed'))
           }
        },1000)
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'white',alignItems:'center',padding:px2dp(20)}}>
                <Modal transparent={true} visible={this.state.showPasswordInput} style={{flex:1}}>
                    <BTPasswordInput onPress={()=>{this.setState({showPasswordInput:false})}} onChange={(value)=>{this.setState({password:value})}} commitButtonClick={()=>{this.deleteAccount()}}/>
                </Modal>
                <BTWalletCard style={{marginTop:px2dp(44)}} totalCount={this.state.totalCount} account={this.props.account}/>
                <Text style={{marginTop:px2dp(22),marginBottom:px2dp(10),alignSelf:'flex-start'}}>keystore</Text>
                <TextInput editable={false} style={{width:px2dp(350),height:px2dp(113),backgroundColor:'#EBEBEB',fontSize:14,lineHeight:px2dp(20)}} multiline={true}>{this.state.keystore}</TextInput>
                <BTNoteView style={{marginLeft:px2dp(20),marginRight:px2dp(20),marginBottom:px2dp(10)}}/>
                <BTDivView/>
                <Text style={{fontSize:14,color:'#007AFF',marginTop:px2dp(10)}}>{Locale.t('Message_NoteSaveKeystore')}</Text>
                <BTButton title={Locale.t('Profile_CopyKeystore')} style={{marginTop:px2dp(20),borderRadius:px2dp(45),width:px2dp(333),height:px2dp(60)}} onClick={()=>{this.copyKeystore()}}/>
                <TouchableOpacity onPress={()=>{this.removeKeystore()}}><Text style={{color:'#007AFF',marginTop:px2dp(20)}}>{Locale.t('Profile_RemoveAccount')}</Text></TouchableOpacity>
            </View>
        )
    }
}

class BTNoteView extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={[{flexDirection:'row',alignItems:'center',justifyContent:'center'},this.props.style]}>
                <Image source={require('../../Public/img/suggest.png')} style={{width:px2dp(35),height:px2dp(35),margin:px2dp(20)}}/>
                <Text style={{fontSize:14,color:'#007AFF',marginTop:global.px2dp(20)}}>{Locale.t('Message_NoteDeleteKeystore')}</Text>
            </View>
        )
    }
}
