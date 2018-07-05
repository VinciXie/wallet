import React,{PureComponent} from 'react'
import {View} from 'react-native'

export default class BTDivView extends PureComponent{
    render(){
        return(
            <View style={[{height:1,backgroundColor:'#C7C7C7',width:350},this.props.style]}></View>
        )
    }
}