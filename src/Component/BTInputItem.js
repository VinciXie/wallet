import React,{PureComponent} from 'react'
import {View,Text,TextInput,StyleSheet,Image,TouchableOpacity} from 'react-native'

const px2dp = global.px2dp

export default class BTInputItem extends PureComponent{
    constructor(props){
        super(props)
    }

    static defaultProps = {
        showArr:false,
        color:'white'
    }

    arrow(){
        return(
            <TouchableOpacity onPress={()=>{this.props.arrPress()}} style={styles.arrStyle}>
                <Image source={require('../Public/img/right_arr.png')} style={{width:px2dp(7),height:px2dp(12)}}/>
            </TouchableOpacity>
        )
    }

    render(){
        let {style,...otherProps} = this.props
        return(
            <View style={[styles.container,this.props.style]}>
                <View></View>
                <View style={styles.content}>
                    <Text style={[styles.textStyle,{color:this.props.color},this.props.textStyle]}>{this.props.title}</Text>
                    <TextInput
                        clearButtonMode="while-editing"
                        {...otherProps}
                        style={[styles.inputStyle,{color:this.props.color},this.props.inputStyle]}
                    />
                    {this.props.showArr ? this.arrow() : <View/>}
                </View>
                <View style={[styles.lineStyle,{backgroundColor:this.props.color},this.props.lineStyle]}></View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        height:px2dp(50),
        justifyContent:'space-between',
        marginLeft:px2dp(20),
        marginRight:px2dp(20)
    },
    content:{
        flexDirection:'row',
        alignItems:'center'
    },
    textStyle:{
        width:px2dp(95),
        height:px2dp(22),
        fontSize:px2dp(17),
        textAlign:'left'
    },
    lineStyle:{
        height:0.5,
        marginBottom:px2dp(4)
    },
    inputStyle:{
        width:px2dp(215),
        alignItems:'center'
    },
    arrStyle:{width:px2dp(44),height:px2dp(44),paddingLeft:px2dp(20),justifyContent:'center',alignItems:'flex-start'}
})