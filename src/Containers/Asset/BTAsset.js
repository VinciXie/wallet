import React,{PureComponent} from 'react'
import {View,StyleSheet,Text,Image,TextInput} from 'react-native'

import {RefreshState} from '../../Component/JLRefreshFlatList'
import BTRefreshFlastList from '../../Component/JLRefreshFlatList'
import BTDivView from '../../Component/BTDivView'
import BTSearchBar from '../../Component/BTSearchBar'

export default class BTAsset extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            refreshState:RefreshState.Normal,
            data:[
                {name:"john"},
                {name:"john"},
                {name:"john"},
                {name:"john"},
                {name:"john"},
                {name:"john"},
            ]
        }
    }

    headerView(){
        return(
            <View style={{marginTop:16}}>
                <Text style={{fontSize:24,marginBottom:10,fontWeight:'bold'}}>我的文件库</Text>
                <BTDivView/>
                <View style={{width:334,height:36,alignSelf:'center',marginTop:10}}>
                    <BTSearchBar/>
                </View>
            </View>
        )
    }

    onHeaderRefreshing(){
        this.setState({refreshState:RefreshState.onHeaderRefreshing})
        setTimeout(()=>{
            this.setState({refreshState:RefreshState.Normal})
        },3000)
    }

    onFooterLoadingMore(){
        this.setState({refreshState:RefreshState.onFooterLoadingMore})

        setTimeout(()=>{
            this.setState({refreshState:RefreshState.Normal})
        },3000)
    }

    render(){
        // alert(this.state.refreshState)
        return(
            <View style={styles.container}>
                <BTRefreshFlastList
                    data={this.state.data}
                    refreshState={this.state.refreshState}
                    renderItem={({item})=><View style={styles.itemStyle}/>}
                    onHeaderRefreshing={()=>{this.onHeaderRefreshing()}}
                    onFooterLoadingMore={()=>{this.onFooterLoadingMore()}}
                    ListHeaderComponent={this.headerView()}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{flex:1,backgroundColor:'white',paddingLeft:20,paddingRight:20},
    itemStyle:{height:150,alignSelf:'center',width:350,marginTop:20,backgroundColor:'red',borderRadius:25}
})