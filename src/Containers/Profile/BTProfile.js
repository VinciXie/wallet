import React,{PureComponent} from 'react'
import {View,StyleSheet,Text,Image,TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'

export default class BTProfile extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{height:225,backgroundColor:'#007AFF'}}>
                    <View style={{marginTop:38,height:65,flexDirection:'row'}}>
                        <View style={{marginLeft:18,width:65,height:65,borderRadius:45,backgroundColor:'red'}}></View>
                        <Text style={{fontSize:24,color:'white',marginLeft:24}}>Chirst-2008</Text>
                    </View>
                    <View style={{marginTop:30,flex:1,flexDirection:'row',justifyContent:'center'}}>
                        <View style={{width:60,height:68,marginRight:45}}><CardItem title="管理钱包" onPress={()=>alert('管理钱包')}/></View>
                        <View style={{width:60,height:68,marginLeft:45}}><CardItem title="交易记录" onPress={()=>{Actions.push('transferRecode')}}/></View>
                    </View>
                </View>

                <View style={{padding:20}}>
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
            <TouchableOpacity style={{flexDirection:'row',marginTop:20,alignItems:'center'}} onPress={()=>this.props.onPress()}>
                <Image source={require('../../Public/img/profile_highlight.png')} style={{width:35,height:35,marginRight:20}}/>
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
                    <Image source={require('../../Public/img/add_card.png')} style={{width:36,height:36}}/>
                    <Text style={{fontSize:14,color:'#FFFFFF',width:60,marginTop:12}}>{this.props.title}</Text>
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