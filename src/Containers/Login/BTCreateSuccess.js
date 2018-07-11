import React,{PureComponent} from 'react'
import {View,StyleSheet,Text,Image} from 'react-native'
import BTButton from '../../Component/BTButton'
import { Actions } from 'react-native-router-flux';

const px2dp = global.px2dp

export default class BTCreateSuccess extends PureComponent{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log({props:this.props})
    }

    render(){
        let keystore = this.props.keystore
        return(
            <View style={styles.container}>
                <View style={styles.topStyle}>
                    {/* <Image source={require('../../Public/img/back_arr.png')} style={{marginTop:44,marginLeft:24,width:25,height:12,alignSelf:'flex-start'}}/> */}
                    <Image style={{width:px2dp(52),height:px2dp(52),marginTop:px2dp(11+44)}} source={require('../../Public/img/success.png')}/>
                    <Text style={{fontSize:16,marginTop:px2dp(12)}}>账户创建成功</Text>
                    <View style={styles.userStyle}></View>
                    <Text style={{fontSize:24,marginTop:px2dp(24)}}>{keystore.account}</Text>
                </View>
                <View style={styles.middleStyle}>
                    <Image source={require('../../Public/img/suggest.png')} style={{width:px2dp(35),height:px2dp(35),marginLeft:px2dp(20),marginRight:px2dp(20)}}/>
                    <Text style={styles.middleTextStyle}>强烈建议您在使用钱备份账户Keystore文件，一旦丢失不可找回</Text>
                </View>
                <View style={styles.dividerStyle}></View>

                <BTButton title="备份Keystore文件" style={{alignSelf:'center',marginTop:px2dp(74),borderRadius:px2dp(20)}} onClick={()=>{Actions.push("BTBackUpKeystore",{keystore})}}/>

                <Text style={{color:'#007AFF',fontSize:15,marginTop:px2dp(16),alignSelf:'center'}} onPress={()=>{Actions.push('login')}}>直接登录</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    topStyle:{
        height:px2dp(222),
        backgroundColor:"#C5FF76",
        alignItems:'center'
    },
    userStyle:{
        width:px2dp(88),
        height:px2dp(88),
        backgroundColor:"red",
        marginTop:px2dp(26),
        borderRadius:px2dp(45)
    },
    middleStyle:{
        height:px2dp(40),
        marginTop:px2dp(135),
        flexDirection:'row',
        alignItems:'center'
    },
    middleTextStyle:{
        width:px2dp(226),
        height:px2dp(40),
        color:"#007AFF",
        fontSize:14,
        textAlign:'left'
    },
    dividerStyle:{
        width:px2dp(335),
        height:px2dp(1),
        backgroundColor:'#E5E5E5',
        marginTop:px2dp(31),
        alignSelf:'center'
    }
})