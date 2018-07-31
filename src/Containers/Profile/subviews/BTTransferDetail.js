import React,{PureComponent} from 'react'
import {View,Text} from 'react-native'

const px2dp = global.px2dp
export default class BTTransferDetail extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={{backgroundColor:'white',flex:1}}>
                <View style={{backgroundColor:'white',flex:1,marginTop:px2dp(64),padding:px2dp(20)}}>
                    <Text style={{fontSize:px2dp(24)}}>交易详情</Text>
                    <View style={{height:px2dp(1),backgroundColor:'#C7C7C7',marginTop:px2dp(20)}}></View>

                    <CellItem title="付款地址" detail="kdfdsujflsdfj"/>
                    <CellItem title="收款地址" detail="sdkflhdsksdkflhdsksdkflhdskfljsdlfjsdfdslkffljsdlfjsdfdslkfsdkflhdskfljsdlfjsdfdslkffljsdlfjsdfdslkf"/>
                    <CellItem title="交易数量" detail="dsfdsfgsg"/>
                    <CellItem title="交易时间" detail="2018-10-29"/>
                    <CellItem title="交易号" detail="dsklfhjlskdjflds"/>
                    <CellItem title="区块号" detail="lksdfjdslifjdsfl"/>

                </View>
            </View>
        )
    }
}

class CellItem extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={{marginTop:px2dp(20)}}>
                <Text style={{fontSize:14,color:'#2B2B2B'}}>{this.props.title}</Text>
                <Text style={{fontSize:12,color:'#AFAFAF',marginTop:px2dp(5)}}>{this.props.detail}</Text>
            </View>
        )
    }
}