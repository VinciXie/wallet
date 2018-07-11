import React,{PureComponent} from 'react'
import {View,Text,TextInput,Image,TouchableOpacity,Clipboard,Alert,Modal} from 'react-native'
import BTDivView from '../../Component/BTDivView'
import BTButton from '../../Component/BTButton'
import BTWalletCard from './BTWalletCard'
import {BTFetch} from '../../Common/BTFetch'
import {findAccounts,removeAccount} from '../../DB/AccountDB'
import {Toast} from 'antd-mobile'
import BTPasswordInput from '../../Component/BTPasswordInput'
const Storage = global.Storage
const BTCrypto = global.BTCrypto
const Keystore = BTCrypto.keystore

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
    
    async componentDidMount(){
        let account = this.props.account
        let keystore = ''
        let Accounts =  await findAccounts(account)
        if(Accounts.length > 0){
            let accountInfo = Accounts[0]
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
                Toast.fail('获取账户数量失败')
                totalCount = '?'
                this.setState({totalCount,account,keystore})
            }
        }catch(error){
            Toast.fail('获取账户数量失败')
            totalCount = '?'
            this.setState({totalCount,account,keystore})
        }

    }

    copyKeystore(){
        Clipboard.setString(this.state.keystore)
    }

    async removeKeystore(){
        Alert.alert('警告','删除前请备份您的keystore文件，一旦丢失将无法找回',[
            {text:'取消',onPress:()=>{}},
            {text:'确定',onPress:()=>{this.setState({showPasswordInput:true})}}
        ])
    }

    async deleteAccount(){
        if(this.state.password==''){
            Toast.fail('请输入密码')
            return
        }
        this.setState({showPasswordInput:false})
        Toast.loading('正在验证')
        setTimeout(async()=>{
            try{
                let privateKey = Keystore.recover(this.state.password,JSON.parse(this.state.keystore))
                if(privateKey){
                   let result = await removeAccount(this.state.account)
                   if(result){
                       Toast.success('删除成功')
                   }else{
                       Toast.fail('删除失败')
                   }
                }else{
                    Toast.fail('密码错误')
                }
           }catch(error){
               Toast.fail('删除失败')
           }
        },1000)
    }

    render(){
        console.log({state:this.state})
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
                <Text style={{fontSize:14,color:'#007AFF',marginTop:px2dp(10)}}>请将Keystore妥善保管,任何人获得你的keystore内容都有可能操作你的账户资金</Text>
                <BTButton title="复制Keystore至粘贴板" style={{marginTop:px2dp(20),borderRadius:px2dp(45),width:px2dp(333),height:px2dp(60)}} onClick={()=>{this.copyKeystore()}}/>
                <TouchableOpacity onPress={()=>{this.removeKeystore()}}><Text style={{color:'#007AFF',marginTop:px2dp(20)}}>移除账户</Text></TouchableOpacity>
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
                <Text style={{fontSize:14,color:'#007AFF',marginTop:global.px2dp(20)}}>当APP被删后在其他手机上使用钱包时,需导入当前钱包备份私钥，否则可能永久丢失钱包资产，请务必备份好钱包，并妥善保管备份信息。</Text>
            </View>
        )
    }
}
