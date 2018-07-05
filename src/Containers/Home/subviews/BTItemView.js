import React,{PureComponent} from 'react'
import {View,Image,Text,StyleSheet} from 'react-native'

export default class BTItemView extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={[styles.itemViewStyle,this.props.style]}>
                <Image source={require('../../../Public/img/bto.png')} style={styles.iconStyle}/>
                <View style={{width:global.px2dp(138)}}>
                    <Text style={{color:'#007AFF'}}>BTO</Text>
                    <Text style={{color:'#AFAFAF'}} numberOfLines={1}>{this.props.data.des}</Text>
                </View>
                <View style={{marginRight:20}}>
                    <Text>1.230</Text>
                    <Text style={{color:'#AFAFAF'}}>≈￥1.230</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    iconStyle:{
        width:35,
        height:35,
        margin:20
    },
    itemViewStyle:{
        height:70,
        backgroundColor:'white',
        marginLeft:18,
        marginRight:18,
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row'
    }
})