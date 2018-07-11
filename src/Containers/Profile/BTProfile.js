import React,{PureComponent} from 'react'
import {View,StyleSheet,Text,Image,TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'

const px2dp = global.px2dp

export default class BTProfile extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{height:px2dp(225),backgroundColor:'#007AFF'}}>
                    <View style={{marginTop:px2dp(38),height:px2dp(65),flexDirection:'row'}}>
                        <View style={{marginLeft:px2dp(18),width:px2dp(65),height:px2dp(65),borderRadius:px2dp(45),backgroundColor:'red'}}></View>
                        <Text style={{fontSize:24,color:'white',marginLeft:px2dp(24)}}>Chirst-2008</Text>
                    </View>
                    <View style={{marginTop:px2dp(30),flex:1,flexDirection:'row',justifyContent:'center'}}>
                        <View style={{width:px2dp(60),height:px2dp(68),marginRight:px2dp(45)}}><CardItem title="管理钱包" onPress={()=>{Actions.push('walletList')}}/></View>
                        <View style={{width:px2dp(60),height:px2dp(68),marginLeft:px2dp(45)}}><CardItem title="交易记录" onPress={()=>{Actions.push('transferRecode')}}/></View>
                    </View>
                </View>

                <View style={{padding:px2dp(20)}}>
                    <Text style={{color:'#9A9A9A'}}>其他</Text>
                    <CellItem title="切换语言" onPress={()=>{Actions.push('changeLanguage')}}/>
                    <CellItem title="关于我们" onPress={()=>{alert('关于我们')}}/>
                    <CellItem title="问题反馈" onPress={()=>{alert('问题反馈')}}/>
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
            <TouchableOpacity style={{flexDirection:'row',marginTop:px2dp(20),alignItems:'center'}} onPress={()=>this.props.onPress()}>
                <Image source={require('../../Public/img/profile_highlight.png')} style={{width:px2dp(35),height:px2dp(35),marginRight:px2dp(20)}}/>
                <Text>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

class CardItem extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <TouchableOpacity style={{flex:1,alignItems:'center'}} onPress={()=>{this.props.onPress()}}>
                    <Image source={require('../../Public/img/add_card.png')} style={{width:px2dp(36),height:px2dp(36)}}/>
                    <Text style={{fontSize:14,color:'#FFFFFF',width:px2dp(60),marginTop:px2dp(12)}}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    }
})