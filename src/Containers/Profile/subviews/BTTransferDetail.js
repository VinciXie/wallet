import React,{PureComponent} from 'react'
import {View,Text} from 'react-native'

export default class BTTransferDetail extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={{backgroundColor:'white',flex:1}}>
                <View style={{backgroundColor:'white',flex:1,marginTop:64,padding:20}}>
                    <Text style={{fontSize:24}}>交易详情</Text>
                    <View style={{height:1,backgroundColor:'#C7C7C7',marginTop:20}}></View>

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
            <View style={{marginTop:20}}>
                <Text style={{fontSize:14,color:'#2B2B2B'}}>{this.props.title}</Text>
                <Text style={{fontSize:12,color:'#AFAFAF',marginTop:5}}>{this.props.detail}</Text>
            </View>
        )
    }
}