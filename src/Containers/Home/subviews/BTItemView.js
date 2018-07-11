import React,{PureComponent} from 'react'
import {View,Image,Text,StyleSheet} from 'react-native'

export default class BTItemView extends PureComponent{
    constructor(props){
        super(props)
    }
    // TODO:这里要根据BTO和DTO的图标进行切换，等UI图
    render(){
        let data = this.props.data
        let price = this.props.price
        let coinPrice = data.token_type == 'BTO' ?  price.bto_usdt_price : 0      
        // let coinPrice = price.bto_usdt_price 
        let usdtP = coinPrice * data.value / Math.pow(10,8)
        let cnyP = usdtP * price.usdt_cny_price
        return(
            <View style={[styles.itemViewStyle,this.props.style]}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={require('../../../Public/img/bto.png')} style={styles.iconStyle}/>
                    <View style={{width:global.px2dp(138)}}>
                        <Text style={{color:'#007AFF',textAlign:'left'}}>{this.props.data.token_type}</Text>
                        {/* <Text style={{color:'#AFAFAF'}} numberOfLines={1}>{this.props.data.des || ''}</Text> */}
                    </View>
                </View>
                <View style={{marginRight:px2dp(20)}}>
                    <Text>${usdtP.toFixed(2)}</Text>
                    <Text style={{color:'#AFAFAF'}}>≈￥{cnyP.toFixed(2)}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    iconStyle:{
        width:px2dp(35),
        height:px2dp(35),
        margin:px2dp(20)
    },
    itemViewStyle:{
        height:px2dp(70),
        backgroundColor:'white',
        marginLeft:px2dp(18),
        marginRight:px2dp(18),
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row'
    }
})