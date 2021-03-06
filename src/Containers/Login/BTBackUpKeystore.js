import React,{PureComponent} from 'react'
import {View,StyleSheet,Image,Text,TouchableOpacity,Clipboard} from 'react-native'
import {TextareaItem} from 'antd-mobile-rn'
import BTButton from '../../Component/BTButton'
import { Actions } from 'react-native-router-flux'
import Locale from '../../locales/index'
// const Locale = global.Locale

const px2dp = global.px2dp

export default class BTBackUpKeystore extends PureComponent{
    constructor(props){
        super(props)
    }

    backUpKeystore(){
        let keystore = JSON.stringify(this.props.keystore)
        Clipboard.setString(keystore)
    }

    render(){
        let keystore = JSON.stringify(this.props.keystore)
        console.log({keystore})
        return(
            <View style={styles.container}>
                <View style={styles.topStyle}>
                    <Text style={{marginTop:px2dp(12+44),fontSize:24,marginLeft:px2dp(20),fontWeight:'bold'}}>{Locale.t('Regist_BackUpKeystore')}</Text>
                    <Text style={{fontSize:12,marginLeft:px2dp(20),lineHeight:px2dp(25)}}>{Locale.t('Message_NoteDeleteKeystore')}</Text>
                </View>
                <View style={styles.iconStyle}></View>
                <Text style={{fontSize:24,marginTop:px2dp(17),alignSelf:"center"}}>{this.props.keystore.account}</Text>

                <Text style={{marginLeft:px2dp(20)}}>Keystore</Text>
                <TextareaItem editable={false} rows={2} style={{alignSelf:"center",width:px2dp(350),height:px2dp(60),fontSize:16,borderWidth:px2dp(1),borderColor:"#EBEBEB"}}>{keystore}</TextareaItem>

                <View style={styles.suggestViewStyle}>
                    <Image source={require('../../Public/img/suggest.png')} style={{width:px2dp(35),height:px2dp(35),marginLeft:px2dp(20),marginRight:px2dp(20)}}/>
                    <Text style={styles.middleTextStyle}>{Locale.t('Message_NoteSaveKeystore')}</Text>
                </View>

                <View style={styles.dividerStyle}></View>

                <BTButton title={Locale.t('Regist_BackUpKeystore')} style={{alignSelf:'center',marginTop:px2dp(14),borderRadius:px2dp(20)}} onClick={()=>{this.backUpKeystore()}}/>

                <Text style={{color:'#007AFF',fontSize:15,marginTop:px2dp(16),alignSelf:'center'}} onPress={()=>{Actions.push('login')}}>{Locale.t('Regist_LoginFirst')}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{flex:1,backgroundColor:'white'},
    topStyle:{height:px2dp(222),backgroundColor:"#C5FF76"},
    iconStyle:{width:px2dp(88),height:px2dp(88),backgroundColor:'red',marginTop:px2dp(-44),alignSelf:'center',borderRadius:px2dp(45)},
    dividerStyle:{width:px2dp(335),height:px2dp(1),backgroundColor:'#E5E5E5',marginTop:px2dp(11),alignSelf:'center'},
    suggestViewStyle:{height:px2dp(60),marginTop:px2dp(17),alignItems:'center',flexDirection:'row'},
    middleTextStyle:{width:px2dp(278),height:px2dp(60),color:"#007AFF",fontSize:14,textAlign:'left'},
})