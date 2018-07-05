import React,{PureComponent} from 'react'
import {View,StyleSheet,Text,Image} from 'react-native'
import BTButton from '../../Component/BTButton'
import { Actions } from 'react-native-router-flux';

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
                    <Image style={{width:52,height:52,marginTop:11+44}} source={require('../../Public/img/success.png')}/>
                    <Text style={{fontSize:16,marginTop:12}}>账户创建成功</Text>
                    <View style={styles.userStyle}></View>
                    <Text style={{fontSize:24,marginTop:17}}>{keystore.account}</Text>
                </View>
                <View style={styles.middleStyle}>
                    <Image source={require('../../Public/img/suggest.png')} style={{width:35,height:35,marginLeft:20,marginRight:20}}/>
                    <Text style={styles.middleTextStyle}>强烈建议您在使用钱备份账户Keystore文件，一旦丢失不可找回</Text>
                </View>
                <View style={styles.dividerStyle}></View>

                <BTButton title="备份Keystore文件" style={{alignSelf:'center',marginTop:74,borderRadius:20}} onClick={()=>{Actions.push("BTBackUpKeystore",{keystore})}}/>

                <Text style={{color:'#007AFF',fontSize:15,marginTop:16,alignSelf:'center'}} onPress={()=>{Actions.push('login')}}>直接登录</Text>
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
        height:222,
        backgroundColor:"#C5FF76",
        alignItems:'center'
    },
    userStyle:{
        width:88,
        height:88,
        backgroundColor:"red",
        marginTop:26,
        borderRadius:45
    },
    middleStyle:{
        height:40,
        marginTop:135,
        flexDirection:'row',
        alignItems:'center'
    },
    middleTextStyle:{
        width:226,
        height:40,
        color:"#007AFF",
        fontSize:14,
        textAlign:'left'
    },
    dividerStyle:{
        width:335,
        height:1,
        backgroundColor:'#E5E5E5',
        marginTop:31,
        alignSelf:'center'
    }
})