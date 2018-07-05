import React,{PureComponent} from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity,Modal} from 'react-native'
import BTInputItem from '../../Component/BTInputItem'
import BTButton from '../../Component/BTButton'
import {Actions} from 'react-native-router-flux'
import BTCoinType from './BTCoinType'
export default class BTTransaction extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            acceptAccount:'',
            number:'',
            visible:false
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.scanResult){
            let scanResult = nextProps.scanResult
            this.setState({acceptAccount:scanResult})
        }
    }

    scanAccount(){
        Actions.push('qrscaner',{backComponent:'transaction'})
    }

    numberChange(value){
        if(isNaN(value)) {
            // this.setState({visible:true,title:window.localeInfo["Wallet.PleaseInputNumber"]})
            alert("请输入数字")
            return;
        }else if(value > Math.pow(10,9)){
            // this.setState({visible:true,title:window.localeInfo["Wallet.NumberIsTooBig"]})
            alert('输入金额过大')
            return
        }else{
            console.log({value})
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Modal transparent={true} visible={this.state.visible} style={{backgroundColor:'red',width:400,height:400}}>
                    <BTCoinType onPress={()=>{this.setState({visible:false})}}/>
                </Modal>


                <View style={styles.navStyle}>
                    <TouchableOpacity onPress={()=>{Actions.pop()}}><Image source={require('../../Public/img/back_arr_black.png')} style={{width:25,height:12}}/></TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.scanAccount()}}><Image source={require('../../Public/img/scaner_black.png')} style={{width:32,height:27}}/></TouchableOpacity>
                </View>
                <Text style={{fontSize:24,marginTop:12,marginLeft:20}}>转账</Text>
                <View>
                    <BTInputItem title="转账账户" color="black" showArr={true} lineStyle={{backgroundColor:'#E5E5E5'}} placeholder="dfsffdsf" arrPress={()=>{alert('arrorPress')}}/>
                    <BTInputItem title="收款地址" value={this.state.acceptAccount} color="black" lineStyle={{backgroundColor:'#E5E5E5'}} placeholder="dfsffdsf"/>
                    <BTInputItem title="转账数量" keyboardType="numeric" onChangeText={(value)=>{this.numberChange(value)}} color="black" lineStyle={{backgroundColor:'#E5E5E5'}} placeholder="dfsffdsf"/>
                    <BTInputItem title="选择币种" color="black" showArr={true} lineStyle={{backgroundColor:'#E5E5E5'}} placeholder="dfsffdsf" arrPress={()=>{this.setState({visible:true})}}/>
                </View>
                <BTButton title="下一步" style={styles.buttonStyle} onClick={()=>{Actions.push("coinType")}}/>

                

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{flex:1,backgroundColor:'white'},
    navStyle:{height:64,justifyContent:'space-between',alignItems:'center',flexDirection:'row',paddingTop:20,paddingLeft:20,paddingRight:20},
    buttonStyle:{alignSelf:'center',width:333,height:60,marginTop:10,borderRadius:45}
})