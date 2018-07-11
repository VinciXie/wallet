import React,{PureComponent} from 'react'
import {View,Text,FlatList,StyleSheet} from 'react-native'
import BTWalletCard from './BTWalletCard'
import { Actions } from 'react-native-router-flux';
import {findAccounts} from '../../DB/AccountDB'

const px2dp = global.px2dp

export default class BTWalletList extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            accounts:[]
        }
    }

    async componentDidMount(){
        let AccountArr = await findAccounts()
        let accounts = []
        AccountArr.forEach(item => {
            accounts.push({account:item.account})
        });
        this.setState({accounts})
    }

    render(){
        return(
            <View style={{flex:1,alignItems:'center'}}>
                <Text style={{fontSize:24,marginTop:px2dp(68),marginLeft:px2dp(20),marginBottom:px2dp(10),fontWeight:'bold',alignSelf:'flex-start'}}>管理钱包</Text>
                <FlatList
                    style={{flex:1,marginBottom:px2dp(20)}}
                    data={this.state.accounts}
                    renderItem={({item})=><BTWalletCard style={{marginTop:px2dp(10)}} onPress={(account)=>{Actions.push('walletDetail',{account})}} {...item}/>}
                />
            </View>
        )
    }
}