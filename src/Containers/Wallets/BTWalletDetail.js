import React,{PureComponent} from 'react'
import {View,Text,TextInput,Image,TouchableOpacity,Clipboard} from 'react-native'
import BTDivView from '../../Component/BTDivView'
import BTButton from '../../Component/BTButton'
import BTWalletCard from './BTWalletCard'
import {BTFetch} from '../../Common/BTFetch'
import {findAccounts,removeAccount} from '../../DB/AccountDB'
import {Toast} from 'antd-mobile'
const Storage = global.Storage

export default class BTWalletDetail extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            totalCount:0,
            account:'',
            keystore:''
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
        let result = await removeAccount(this.state.account)
        if(result){
            Toast.success('删除成功')
        }else{
            Toast.fail('删除失败')
        }
    }

    render(){
        console.log({state:this.state})
        return(
            <View style={{flex:1,backgroundColor:'white',alignItems:'center',padding:20}}>
                <BTWalletCard style={{marginTop:44}} totalCount={this.state.totalCount} account={this.props.account}/>
                <Text style={{marginTop:22,marginBottom:10,alignSelf:'flex-start'}}>keystore</Text>
                <TextInput editable={false} style={{width:350,height:113,backgroundColor:'#EBEBEB',fontSize:14,lineHeight:20}} multiline={true}>{this.state.keystore}</TextInput>
                <BTNoteView style={{marginLeft:20,marginRight:20,marginBottom:10}}/>
                <BTDivView/>
                <Text style={{fontSize:14,color:'#007AFF',marginTop:10}}>请将Keystore妥善保管,任何人获得你的keystore内容都有可能操作你的账户资金</Text>
                <BTButton title="复制Keystore至粘贴板" style={{marginTop:20,borderRadius:45,width:333,height:60}} onClick={()=>{this.copyKeystore()}}/>
                <TouchableOpacity onPress={()=>{this.removeKeystore()}}><Text style={{color:'#007AFF',marginTop:20}}>移除账户</Text></TouchableOpacity>
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
                <Image source={require('../../Public/img/suggest.png')} style={{width:35,height:35,margin:20}}/>
                <Text style={{fontSize:14,color:'#007AFF',marginTop:global.px2dp(20)}}>当APP被删后在其他手机上使用钱包时,需导入当前钱包备份私钥，否则可能永久丢失钱包资产，请务必备份好钱包，并妥善保管备份信息。</Text>
            </View>
        )
    }
}
