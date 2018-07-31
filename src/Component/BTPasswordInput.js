import React,{PureComponent} from 'react'
import {View,StyleSheet,ImageBackground,TouchableOpacity,Image,Text} from 'react-native'
import {InputItem} from 'antd-mobile-rn'

export default class BTPasswordImput extends PureComponent{
    constructor(props){
        super(props)
    }

    headerView(){
        return(
            <View>
                <View style={{height:44,justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity style={styles.backImageStyle} onPress={()=>{this.props.onPress()}}>
                        <Image source={require('../Public/img/back_arr_black.png')} style={{width:23,height:10,marginLeft:20}}/>
                    </TouchableOpacity>
                    <Text style={{fontSize:18}}>请输入支付密码</Text>
                    <TouchableOpacity style={{width:44,height:44,justifyContent:'center'}} onPress={()=>this.props.commitButtonClick()}><Text>确定</Text></TouchableOpacity>
                </View>
                <View style={{backgroundColor:'#CFCFCF',height:0.5}}></View>
            </View>
        )
    }

    render(){
        return(
            <TouchableOpacity onPress={()=>{this.props.onPress()}} style={{flex:1}}>
                <ImageBackground source={require('../Public/img/alpha_bg.png')} style={styles.container}>
                    <View style={{height:445,backgroundColor:'white'}}>
                        {this.headerView()}
                        <InputItem 
                            style={{marginTop:20,width:310,height:50,alignSelf:'center',borderBottomWidth:1,borderBottomColor:'#CFCFCF'}} 
                            type="password"
                            onChange={(value)=>{this.props.onChange(value)}}
                            placeholder="请输入该账户密码"
                            clear={true}
                        />
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container:{flex:1,justifyContent:'flex-end'},
})