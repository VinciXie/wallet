import React,{PureComponent} from 'react'
import {TextInput} from 'react-native'
import {Toast, View} from 'antd-mobile-rn'

export default class BTNumberInput extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            value:'999'
        }
    }

    onChangeText(value){
        console.log({value})
        this.setState({num:'888'})

        // if(isNaN(value)) {
        //     // this.setState({visible:true,title:window.localeInfo["Wallet.PleaseInputNumber"]})
        //     Toast.fail('请收入数字')
        //     // this.props.onChangeText(value)
        //     return;
        // }else if(value > Math.pow(10,9)){
        //     // this.setState({visible:true,title:window.localeInfo["Wallet.NumberIsTooBig"]})
        //     Toast.fail('输入金额过大')
            
        //     return
        // }else{
        //     // this.props.onChangeText(value)
        //     console.log("setr statejlkj++++++++")
        //     this.setState({num:value})
        // }
    }

    render(){
        return(
            <View>
                <TextInput 
                    style={{width:400,height:50,backgroundColor:'red'}}
                    keyboardType="numeric"
                    value={this.state.value}
                    // onChangeText={(value)=>{this.setState({num:555})}}
                />
            </View>
        )
    }
}