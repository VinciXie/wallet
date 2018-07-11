import React,{PureComponent} from 'react'
import {View,Text,Image,TouchableOpacity} from 'react-native'
import BTDivView from '../../../Component/BTDivView'

const px2dp = global.px2dp

export default class BTChangeLanguage extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            selected:'zh'
        }
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <View style={{flex:1,marginTop:px2dp(64),padding:px2dp(20),backgroundColor:'white'}}>
                    <Text style={{fontSize:24}}>语言</Text>
                    <BTDivView style={{marginTop:px2dp(20)}}/>

                    <CellItem title="简体中文" selected={this.state.selected == 'zh'} onPress={()=>this.setState({selected:'zh'})}/>
                    <CellItem title="English" selected={this.state.selected == 'en'} onPress={()=>this.setState({selected:'en'})}/>
                    
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
        let iconStyle = this.props.selected ? {width:px2dp(20),height:px2dp(20)} : {width:0,height:0}
        return(
            <View>
                <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:px2dp(50)}} onPress={()=>{this.props.onPress()}}>
                    <Text>{this.props.title}</Text>
                    <Image source={require('../../../Public/img/selected.png')} style={iconStyle}/>
                </TouchableOpacity>
                <BTDivView/>
            </View>
        )
    }
}