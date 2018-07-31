import React,{PureComponent} from 'react'
import {View,Image,TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'

export default class BTNavRightButton extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <TouchableOpacity onPress={()=>{Actions.push('coinTypeModal')}}>
                <Image source={this.props.iconPath} style={{width:22,height:22,marginRight:20}}/>
            </TouchableOpacity>
        )
    }
}