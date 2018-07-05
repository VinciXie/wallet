import React,{PureComponent} from 'react'
import {View,Text,Image,TouchableOpacity} from 'react-native'
import BTDivView from '../../../Component/BTDivView'

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
                <View style={{flex:1,marginTop:64,padding:20,backgroundColor:'white'}}>
                    <Text style={{fontSize:24}}>语言</Text>
                    <BTDivView style={{marginTop:20}}/>

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
        let iconStyle = this.props.selected ? {width:20,height:20} : {width:0,height:0}
        return(
            <View>
                <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:50}} onPress={()=>{this.props.onPress()}}>
                    <Text>{this.props.title}</Text>
                    <Image source={require('../../../Public/img/selected.png')} style={iconStyle}/>
                </TouchableOpacity>
                <BTDivView/>
            </View>
        )
    }
}