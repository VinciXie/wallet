import React,{PureComponent} from 'react'
import {StyleSheet,Text,Image} from 'react-native'
import {Button} from 'antd-mobile'

export default class BTButton extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Button type="primary" style={[styles.buttonStyle,this.props.style]} {...this.props}>
                <Text style={[styles.buttonTextStyle,this.props.textStyle]}>{this.props.title} 
                    <Image style={{width:25,height:12}} source={require('../Public/img/next_arr.png')}/>
                </Text>
            </Button>
        )
    }
}

const styles = StyleSheet.create({
    buttonStyle:{
        width:333,
        height:60,
        borderRadius:50
    },
    buttonTextStyle:{
        width:192,
        height:28,
        color:'white',
        fontSize:global.px2dp(20)
    }
})