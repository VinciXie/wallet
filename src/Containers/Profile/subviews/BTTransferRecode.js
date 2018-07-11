import React,{PureComponent} from 'react'
import {View,FlatList,Text,Image,StyleSheet,TouchableOpacity} from 'react-native'
import { Actions } from 'react-native-router-flux';
import {BTFetch} from '../../../Common/BTFetch'
const Storage = global.Storage

const px2dp = global.px2dp

export default class BTTransferRecode extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            data:[
                {
                    type:'收款',
                    address:'dksjflsadhfgslkgjfdlsgjsad',
                    count:'350BTO',
                    time:'2018-10-13'
                },
                {
                    type:'收款',
                    address:'dksjflsadhfgslkgjfdlsgjsad',
                    count:'350BTO',
                    time:'2018-10-13'
                },
                {
                    type:'收款',
                    address:'dksjflsadhfgslkgjfdlsgjsad',
                    count:'350BTO',
                    time:'2018-10-13'
                },
                {
                    type:'收款',
                    address:'dksjflsadhfgslkgjfdlsgjsad',
                    count:'350BTO',
                    time:'2018-10-13'
                },
                {
                    type:'收款',
                    address:'dksjflsadhfgslkgjfdlsgjsad',
                    count:'350BTO',
                    time:'2018-10-13'
                },
                {
                    type:'收款',
                    address:'dksjflsadhfgslkgjfdlsgjsad',
                    count:'350BTO',
                    time:'2018-10-13'
                },
            ]
        }
    }

    componentDidMount(){
        this.getTransferHistory()
    }

    async getTransferHistory(){
        let url = '/user/GetTransfer'

        try{
            let result = await Storage.load({key:'account'})
            let params = {
                username:result.account,
                token_type:'BTO'
            }
            BTFetch(url,'POST',params).then(response=>{
                console.log({response})
            }).catch(error=>{
    
            })
        }catch(error){

        }
    }

    headerView(){
        return(
            <View>
                <Text style={{fontSize:24}}>交易记录</Text>
                <View style={{backgroundColor:'#C7C7C7',height:px2dp(1),marginTop:px2dp(20)}}></View>
            </View>
        )
    }

    render(){
        return(
            <View>
                <FlatList
                    data={this.state.data}
                    style={{marginTop:px2dp(48),padding:px2dp(20)}}
                    ListHeaderComponent={this.headerView()}
                    renderItem={({item,index})=><CellItem key={index} {...item}/>}
                />
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
            <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{Actions.push('transferDetail')}}>
                <Image source={require('../../../Public/img/profile_highlight.png')} style={{width:px2dp(35),height:px2dp(35),marginTop:px2dp(20),marginBottom:px2dp(20),marginRight:px2dp(20)}}/>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingRight:20}}>
                    <View style={{width:px2dp(152),marginRight:px2dp(10)}}>
                        <Text>收款</Text>
                        <Text numberOfLines={1} style={styles.fontStyle}>dklshgfkjfsghdffgdfghgfhfghfghfghfghfghkjghdf</Text>
                    </View>
                    <View style={{width:px2dp(120),alignItems:"flex-end",marginRight:px2dp(20)}}>
                        <Text numberOfLines={1}>153BTO</Text>
                        <Text numberOfLines={1} style={styles.fontStyle}>2018-10-13 18:34:23</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    fontStyle:{fontSize:12,color:'#AFAFAF'}
})


