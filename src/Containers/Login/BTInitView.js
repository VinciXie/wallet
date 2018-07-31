import React,{PureComponent} from 'react'
import {View,StyleSheet,Image,Text,ImageBackground} from 'react-native'
import {Button} from 'antd-mobile-rn'
import {Actions} from 'react-native-router-flux'
import Locale from '../../locales/index'
const Storage = global.Storage
const px2dp = global.px2dp

export default class BTInitView extends PureComponent{
    constructor(props){
        super(props)
    }

    async componentDidMount(){
        try{
            let account = await Storage.load({key:'account'})
            let storeLocale = await Storage.load({key:'locale'})
            if(account){
                Actions.reset('home')
            }
            if(storeLocale){
                Locale.locale = Locale.locale
            }
        }catch(error){

        }
    }

    jumpToCreateAccount(){
        Actions.push('createAccount')
    }

    jumpToLogin(){
        Actions.push('login')
    }

    render(){
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../../Public/img/login_bg.png')} style={{width:global.ScreenWidth,height:global.ScreenHeight}}>
                    <View style={styles.bottomStyle}>
                        <Button type="primary" style={styles.buttonStyle} onClick={()=>{this.jumpToCreateAccount()}}><Text style={styles.buttonTextStyle}>{Locale.t("Init_CreateAccont")}<Image style={{width:px2dp(25),height:px2dp(12)}} source={require('../../Public/img/next_arr.png')}/></Text></Button>
                        <Button type="primary" style={styles.buttonStyle} onClick={()=>this.jumpToLogin()}><Text style={styles.buttonTextStyle}>{Locale.t("Init_ImportAccount")}<Image style={{width:px2dp(25),height:px2dp(12)}} source={require('../../Public/img/next_arr.png')}/></Text></Button>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#057CFF',
        justifyContent:"space-between",
        paddingBottom:global.px2dp(200)
    },
    bottomStyle:{
        marginTop:px2dp(443),
        alignItems:'center'
    },
    buttonStyle:{
        width:px2dp(333),
        height:px2dp(60),
        marginBottom:px2dp(20),
        borderRadius:px2dp(15)
    },
    buttonTextStyle:{
        color:'white',
        fontSize:24
    }
})