import React,{PureComponent} from 'react'
import {View,Text,Image,TouchableOpacity} from 'react-native'
import BTDivView from '../../../Component/BTDivView'
import Locale from '../../../locales/index'
import Storage from '../../../DB/Storage'
import {Actions} from 'react-native-router-flux'

const px2dp = global.px2dp

export default class BTChangeLanguage extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            selected:'zh-Hans-US'
        }
    }

    async componentDidMount(){
        console.log({props:this.props})
        let locale = await Storage.load({key:'locale'})
        this.setState({selected:locale.locale})
    }

    changeLanguage(language){
        this.setState({selected:language})
        Locale.locale = language
        Storage.save({key:'locale',data:{
            locale:language
        }})
        // this.forceUpdate()
    }

    componentWillUnmount(){
        Actions.replace('home')
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <View style={{flex:1,marginTop:px2dp(64),padding:px2dp(20),backgroundColor:'white'}}>
                    <Text style={{fontSize:24}}>语言</Text>
                    <BTDivView style={{marginTop:px2dp(20)}}/>
                    <CellItem title="简体中文" selected={this.state.selected == 'zh-Hans-US'} onPress={()=>this.changeLanguage('zh-Hans-US')}/>
                    <CellItem title="English" selected={this.state.selected == 'en'} onPress={()=>this.changeLanguage('en')}/>
                    
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