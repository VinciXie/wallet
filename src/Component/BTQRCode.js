import React,{PureComponent} from 'react'
import {View,StyleSheet,Text} from 'react-native'
import QRCode from 'react-native-qrcode'
import BTButton from '../Component/BTButton'

export default class BTQRCode extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            qrcode:'sdkljfldsfj'
        }
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <View style={{height:133,backgroundColor:'#049BFF'}}></View>
                <View style={{width:88,height:88,alignSelf:'center',backgroundColor:'red',marginTop:-44,borderRadius:45}}></View>
                <Text style={{marginTop:5,marginLeft:20,fontSize:15,fontWeight:'bold'}}>收款地址</Text>
                <Text style={{width:350,height:59,fontSize:17,backgroundColor:'#F8F8F8',textAlign:'left',alignSelf:'center'}}>0x8c7a5871a3f100a2c063e225812e3f5332007363de6ae328632d03caf75a911b</Text>
                <View style={{width:210,height:210,backgroundColor:'red',alignSelf:'center',marginTop:22}}>
                    <QRCode
                        style={{flex:1}}
                        value={this.state.qrcode}
                        size={210}
                        bgColor='black'
                        fgColor='white'
                    />
                </View>
                <BTButton title="复制收款地址" style={{alignSelf:'center',marginTop:16,width:333,height:60,borderRadius:45}}/>  
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{}
})