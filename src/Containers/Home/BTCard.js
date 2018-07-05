import React,{PureComponent} from 'react'
import {View,StyleSheet,Image,Text,TouchableOpacity} from 'react-native'
import { Actions } from 'react-native-router-flux';

export default class BTCard extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.topStyle}>
                    <TouchableOpacity onPress={()=>{Actions.push('createAccount')}}><Image style={styles.iconStyle} source={require('../../Public/img/add_card.png')}></Image></TouchableOpacity>
                    <TouchableOpacity onPress={()=>{Actions.push('transaction')}}><Image style={styles.iconStyle} source={require('../../Public/img/scaner.png')}></Image></TouchableOpacity>
                </View>
                <View style={styles.centerStyle}>
                    <Text style={{color:'white'}}>我的资产</Text>
                    <Text style={styles.textStyle}>≈￥435435</Text>
                </View>
                <View style={styles.bottomStyle}>
                    <TouchableOpacity onPress={()=>{Actions.push('qrcode')}}>
                        <Image style={styles.iconStyle} source={require('../../Public/img/qrcode.png')}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#057AFF',
        width:global.px2dp(340),
        height:global.px2dp(188),
        borderRadius:25
    },
    iconStyle:{
        width:32,
        height:27
    },
    topStyle:{
        marginTop:14,
        height:27,
        marginLeft:16,
        marginRight:16,
        flexDirection:'row',
        justifyContent:"space-between"
    },
    centerStyle:{
        flex:1,
        margin:8,
        justifyContent:"center",
        alignItems:'center'
    },
    textStyle:{
        fontSize:30,
        color:'white',
        fontWeight:'bold'
    },
    bottomStyle:{
        height:42,
        marginBottom:22,
        justifyContent:'center',
        alignItems:'center'
    }
})