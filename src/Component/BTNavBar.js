import React,{PureComponent} from 'react'
import {View,Image,TouchableOpacity,ImageBackground} from 'react-native'
import {Actions} from 'react-native-router-flux'

export default class BTNavBar extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        let back_arr = '../Public/img/nav_bg.jpg' || this.props.back_arr
        return(
            <ImageBackground source={require(back_arr)} style={{height:64,justifyContent:"center"}}>
                <TouchableOpacity onPress={()=>{Actions.pop()}} style={{backgroundColor:'red',height:64,width:22,justifyContent:"center",marginLeft:20}}>
                    <Image source={require('../Public/img/back_arr.png')} style={{width:22,height:10}}/>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}