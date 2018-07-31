import React,{PureComponent} from 'react'
import {View,Text,FlatList,StyleSheet} from 'react-native'
import BTWalletCard from './BTWalletCard'
import { Actions } from 'react-native-router-flux';
import {Toast} from 'antd-mobile-rn'
import Locale from '../../locales/index'
// const Locale = global.Locale
const DB = global.DB

const px2dp = global.px2dp

export default class BTWalletList extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            accounts:[]
        }
    }

    componentDidMount(){
        let accounts = []
        DB.findAccounts('',async(tx,response)=>{
            let len = response.rows.length
            if(len>0){
                for(let i = 0;i<len;i++){
                    let row = response.rows.item(i)
                    console.log({row})
                    accounts.push(row)
                }
                this.setState({accounts})
            }else{
                try{
                    let account = await Storage.load({key:'account'})
                    this.setState({accounts:[account]})
                }catch(error){
                    console.log(error)
                    Toast.fail(Locale.t('Message_GetAccountFailed'))
                }
            }
        })
    }

    render(){
        return(
            <View style={{flex:1,alignItems:'center'}}>
                <Text style={{fontSize:24,marginTop:px2dp(68),marginLeft:px2dp(20),marginBottom:px2dp(10),fontWeight:'bold',alignSelf:'flex-start'}}>{Locale.t('Profile_ManageWallet')}</Text>
                <FlatList
                    style={{flex:1,marginBottom:px2dp(20)}}
                    data={this.state.accounts}
                    renderItem={({item})=><BTWalletCard style={{marginTop:px2dp(10)}} onPress={(account)=>{Actions.push('walletDetail',{account})}} {...item}/>}
                />
            </View>
        )
    }
}