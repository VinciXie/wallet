import React,{PureComponent} from 'react'
import {View,Text,TouchableOpacity} from 'react-native'

const px2dp = global.px2dp

export default class BTWalletCard extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        console.log({card:this.props})
        let totalCount =  (this.props.totalCount >=0 || this.props.totalCount=='?') ? this.props.totalCount.toFixed(2) : '*****' 
        return(
            <View style={this.props.style}>
                <TouchableOpacity onPress={()=>{this.props.onPress && this.props.onPress(this.props.account)}}>
                    <View style={{backgroundColor:'#007AFF',width:px2dp(349),height:px2dp(152),borderRadius:px2dp(15),alignItems:'center'}}>
                        <Text style={{alignSelf:'flex-start',marginLeft:px2dp(20),marginTop:px2dp(20),fontSize:24,color:'white'}}>{this.props.account}</Text>
                        <Text style={{marginTop:px2dp(33),color:'white',fontSize:14}}>我的资产</Text>
                        <Text style={{marginTop:px2dp(10),fontSize:25,color:'white',fontWeight:'bold'}}>{totalCount}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}