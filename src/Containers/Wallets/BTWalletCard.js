import React,{PureComponent} from 'react'
import {View,Text,TouchableOpacity} from 'react-native'

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
                    <View style={{backgroundColor:'#007AFF',width:349,height:152,borderRadius:15,alignItems:'center'}}>
                        <Text style={{alignSelf:'flex-start',marginLeft:20,marginTop:20,fontSize:24,color:'white'}}>{this.props.account}</Text>
                        <Text style={{marginTop:33,color:'white',fontSize:14}}>我的资产</Text>
                        <Text style={{marginTop:10,fontSize:25,color:'white',fontWeight:'bold'}}>{totalCount}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}