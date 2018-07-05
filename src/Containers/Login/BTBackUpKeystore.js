import React,{PureComponent} from 'react'
import {View,StyleSheet,Image,Text,TouchableOpacity,Clipboard} from 'react-native'
import {TextareaItem} from 'antd-mobile'
import BTButton from '../../Component/BTButton'
import { Actions } from 'react-native-router-flux';

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
                    <Text style={{marginTop:12+44,fontSize:24,marginLeft:20,fontWeight:'bold'}}>备份Keystore</Text>
                    <Text style={{fontSize:12,marginLeft:20,lineHeight:25}}>当APP被删后在其他手机上使用钱包时，需导入当前钱包备份私钥，否则可能永久丢失钱包资产，请务必备份好钱包，并妥善保管备份信息。</Text>
                </View>
                <View style={styles.iconStyle}></View>
                <Text style={{fontSize:24,marginTop:17,alignSelf:"center"}}>Chare</Text>

                <Text style={{marginLeft:20}}>Keystore</Text>
                <TextareaItem editable={false} rows={2} style={{alignSelf:"center",width:350,height:60,fontSize:16,borderWidth:1,borderColor:"#EBEBEB"}}>{keystore}</TextareaItem>

                <View style={styles.suggestViewStyle}>
                    <Image source={require('../../Public/img/suggest.png')} style={{width:35,height:35,marginLeft:20,marginRight:20}}/>
                    <Text style={styles.middleTextStyle}>请将Keystore内容抄录在纸上，并妥善保管任何人获得你的keystore内容都有可能操作你的账户</Text>
                </View>

                <View style={styles.dividerStyle}></View>

                <BTButton title="备份Keystore文件" style={{alignSelf:'center',marginTop:14,borderRadius:20}} onClick={()=>{this.backUpKeystore()}}/>

                <Text style={{color:'#007AFF',fontSize:15,marginTop:16,alignSelf:'center'}} onPress={()=>{Actions.push('login')}}>直接登录</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{flex:1,backgroundColor:'white'},
    topStyle:{height:222,backgroundColor:"#C5FF76"},
    iconStyle:{width:88,height:88,backgroundColor:'red',marginTop:-44,alignSelf:'center',borderRadius:45},
    dividerStyle:{width:335,height:1,backgroundColor:'#E5E5E5',marginTop:11,alignSelf:'center'},
    suggestViewStyle:{height:60,marginTop:17,alignItems:'center',flexDirection:'row'},
    middleTextStyle:{width:278,height:60,color:"#007AFF",fontSize:14,textAlign:'left'},
})