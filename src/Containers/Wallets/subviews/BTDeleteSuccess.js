import React,{PureComponent} from 'react'
import {View,Image,Text,TouchableOpacity} from 'react-native'
import BTButton from '../../../Component/BTButton'
import { Actions } from '../../../../node_modules/react-native-router-flux';
import Locale from '../../../locales/index'
// const Locale = global.Locale
const Storage = global.Storage
const DB = global.DB

export default class BTDeleteSuccess extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            account:''
        }
    }

    async componentDidMount(){
        try{
            let accountInfo = await Storage.load({key:'account'})
            this.setState({account:accountInfo.account})
        }catch(error){

        }
    }

    async backButtonClik(){
        DB.findAccounts('',async(tx,response)=>{
            console.log({tx,response})
            let len = response.rows.length
            if(len>0){
                try{
                    await Storage.load({key:'account'})
                    Actions.reset('home')
                }catch(error){
                    let Account = response.rows.item(0)
                    Storage.save({key:'account',data:{
                        account:Account.account,
                        data:{
                            keystore:Account.keystore
                        }
                    }})
                    Actions.reset('home')
                }
            }else{
                Actions.reset('initView')
            }
        })
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <View style={{height:222,backgroundColor:'#C5FF76'}}>
                    <TouchableOpacity onPress={()=>{this.backButtonClik()}}><Image source={require('../../../Public/img/back_arr_black.png')} style={{width:22,height:10,marginTop:44,marginLeft:20}}/></TouchableOpacity>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Image source={require('../../../Public/img/success.png')} style={{width:52,height:52,marginBottom:12}}/>
                        <Text>{Locale.t('Message_DeleteSuccess')}</Text>
                    </View>
                </View>
                <View style={{width:88,height:88,borderRadius:45,backgroundColor:'red',alignSelf:'center',marginTop:-44}}/>
                {/* <Text style={{alignSelf:'center',fontSize:24,marginTop:17,fontWeight:'bold'}}>{this.state.account}</Text> */}
                <BTButton  onClick={()=>this.backButtonClik()} title={Locale.t('Message_Sure')} style={{alignSelf:'center',marginTop:190,width:333,height:60,borderRadius:35}}/>
            </View>
        )
    }
}