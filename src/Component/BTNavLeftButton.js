import React,{PureComponent} from 'react'
import {TouchableOpacity,Image} from 'react-native'
import {Actions} from 'react-native-router-flux'


export default class BTNavLeftButton extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        let back_arr = this.props.backArr=='white' ? require('../Public/img/back_arr.png') : require('../Public/img/back_arr_black.png')
        return(
            <TouchableOpacity onPress={()=>{Actions.pop()}} style={{width:64,height:44,justifyContent:"center",alignItems:'center'}}>
                <Image source={back_arr} style={{width:22,height:10}}/>
            </TouchableOpacity>
        )
    }
}