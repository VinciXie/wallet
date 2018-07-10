import React,{PureComponent} from 'react'
import {View,Text,FlatList,StyleSheet} from 'react-native'
import BTWalletCard from './BTWalletCard'
import { Actions } from 'react-native-router-flux';
import {findAccounts} from '../../DB/AccountDB'

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
                <Text style={{fontSize:24,marginTop:68,marginLeft:20,marginBottom:10,fontWeight:'bold',alignSelf:'flex-start'}}>管理钱包</Text>
                <FlatList
                    style={{flex:1,marginBottom:20}}
                    data={this.state.accounts}
                    renderItem={({item})=><BTWalletCard style={{marginTop:10}} onPress={(account)=>{Actions.push('walletDetail',{account})}} {...item}/>}
                />
            </View>
        )
    }
}