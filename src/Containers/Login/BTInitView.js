import React,{PureComponent} from 'react'
import {View,StyleSheet,Image,Text,ImageBackground} from 'react-native'
import {Button} from 'antd-mobile'
import {Actions} from 'react-native-router-flux'
const Storage = global.Storage

export default class BTInitView extends PureComponent{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        Storage.load({key:'account'}).then(response=>{
            if(response){
                Actions.reset('home')
            }
        }).catch(error=>{
            console.log({error})
        })
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
                        <Button type="primary" style={styles.buttonStyle} onClick={()=>{this.jumpToCreateAccount()}}><Text style={styles.buttonTextStyle}>创建账号 <Image style={{width:25,height:12}} source={require('../../Public/img/next_arr.png')}/></Text></Button>
                        <Button type="primary" style={styles.buttonStyle} onClick={()=>this.jumpToLogin()}><Text style={styles.buttonTextStyle}>导入账号 <Image style={{width:25,height:12}} source={require('../../Public/img/next_arr.png')}/></Text></Button>
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
        marginTop:443,
        alignItems:'center'
    },
    buttonStyle:{
        width:333,
        height:60,
        marginBottom:20,
        borderRadius:15
    },
    buttonTextStyle:{
        color:'white',
        fontSize:global.px2dp(24)
    }
})