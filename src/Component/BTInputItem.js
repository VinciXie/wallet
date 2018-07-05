import React,{PureComponent} from 'react'
import {View,Text,TextInput,StyleSheet,Image,TouchableOpacity} from 'react-native'

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
                <Image source={require('../Public/img/right_arr.png')} style={{width:7,height:12}}/>
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View style={[styles.container,this.props.style]}>
                <View></View>
                <View style={styles.content}>
                    <Text style={[styles.textStyle,{color:this.props.color},this.props.textStyle]}>{this.props.title}</Text>
                    <TextInput
                        clearButtonMode="while-editing"
                        {...this.props}
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
        height:50,
        justifyContent:'space-between',
        marginLeft:20,
        marginRight:20
    },
    content:{
        flexDirection:'row',
        alignItems:'center'
    },
    textStyle:{
        width:95,
        height:22,
        fontSize:20,
        textAlign:'left'
    },
    lineStyle:{
        height:0.5
    },
    inputStyle:{
        height:30,
        width:215
    },
    arrStyle:{width:44,height:44,paddingLeft:20,justifyContent:'center',alignItems:'flex-start'}
})