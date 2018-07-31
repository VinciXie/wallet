import React,{PureComponent} from 'react'
import {View,FlatList,Text,Image,StyleSheet,TouchableOpacity,Modal} from 'react-native'
import BTCoinType from '../../../Containers/Transaction/BTCoinType'
import {BTFetch} from '../../../Common/BTFetch'
import {Toast} from 'antd-mobile-rn'
import {Actions} from 'react-native-router-flux'
import RefreshListView,{RefreshState} from '../../../Component/JLRefreshFlatList'
import Locale from '../../../locales/index'
const Storage = global.Storage
const px2dp = global.px2dp
const page_size = 10
// const Locale = global.Locale

export default class BTTransferHistory extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            data:[],
            account:'',
            coinType:'BTO',
            visible:false,
            page_num:1,
            refreshState:RefreshState.Init
        }
    }

    componentDidMount(){
        this.onHeaderRefresh()
    }

    async onHeaderRefresh(){
        let url = '/user/GetTransfer'
        this.setState({data:[]})

        try{
            let result = await Storage.load({key:'account'})
            let params = {
                username:result.account,
                token_type:this.state.coinType,
                page_num:1
            }
            Toast.loading(Locale.t('Message_RequestingTransferHistore'),4*1000)
            BTFetch(url,'POST',params).then(response=>{
                if(response && response.code==1){
                    Toast.hide()
                    let data = response.data
                    let row = data.row
                    let refreshState = (data.row_count < page_size) ? RefreshState.NoMoreData : RefreshState.Normal
                    console.log({refreshState})
                    this.setState({data:row,account:result.account,refreshState})
                }else{
                    Toast.fail(Locale.t('Message_RequestTransferHistoreFailed'))
                }
            }).catch(error=>{
                Toast.fail(Locale.t('Message_RequestTransferHistoreFailed'))
            })
        }catch(error){
            Toast.fail(Locale.t('Message_RequestTransferHistoreFailed'))
        }
    }

    async onFooterRefresh(){
        let url = '/user/GetTransfer'
        let page_num = this.state.page_num + 1

        try{
            let result = await Storage.load({key:'account'})
            let params = {
                username:result.account,
                token_type:this.state.coinType,
                page_num:page_num
            }
            Toast.loading(Locale.t('Message_RequestingTransferHistore'),4*1000)
            BTFetch(url,'POST',params).then(response=>{
                if(response && response.code==1){
                    Toast.hide()
                    let data = response.data
                    let row = data.row
                    let refreshState = (data.row_count < page_size) ? RefreshState.NoMoreData : RefreshState.Normal
                    let newData = [...this.state.data,...row]
                    this.setState({data:newData,account:result.account,page_num,refreshState})
                }else{
                    Toast.fail(Locale.t('Message_RequestTransferHistoreFailed'))
                }
            }).catch(error=>{
                Toast.fail(Locale.t('Message_RequestTransferHistoreFailed'))
            })
        }catch(error){
            Toast.fail(Locale.t('Message_RequestTransferHistoreFailed'))
        }
    }

    headerView(){
        return(
            <View>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:44}}>
                   <TouchableOpacity onPress={()=>{Actions.pop()}}><Image source={require('../../../Public/img/back_arr_black.png')} style={{width:22,height:10}}/></TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.setState({visible:true})}}><Image source={require('../../../Public/img/nav_right_btn.png')} style={{width:22,height:22,marginRight:20}}/></TouchableOpacity>
                </View>
                <View>
                    <Text style={{fontSize:24}}>{Locale.t('Message_TransferRecoder')}</Text>
                    <View style={{backgroundColor:'#C7C7C7',height:px2dp(1),marginTop:px2dp(20)}}></View>
                </View>
            </View>
        )
    }

    render(){
        console.log({data:this.state.data})
        return(
            <View style={{flex:1}}>
                <Modal visible={this.state.visible} transparent={true}>
                    <BTCoinType onPress={(coinType)=>{
                        this.setState({coinType,visible:false})
                        this.onHeaderRefresh()
                    }}/>
                </Modal>
                <RefreshListView
                    refreshState={this.state.refreshState}
                    data={this.state.data}
                    style={{marginTop:px2dp(20),padding:px2dp(20)}}
                    ListHeaderComponent={this.headerView()}
                    onHeaderRefreshing={()=>{this.onHeaderRefresh()}}
                    onFooterLoadingMore={()=>{this.onFooterRefresh()}}
                    renderItem={({item,index})=><CellItem coinType={this.state.coinType} account={this.state.account} key={index} {...item}/>}
                />
            </View>
        )
    }
}

class CellItem extends PureComponent{
    constructor(props){
        super(props)
    }

    timetrans(date){
        var date = new Date(date*1000);//如果date为13位不需要乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m+s;
    }

    render(){
        console.log({props:this.props})
        let transferType = this.props.from == this.props.account ? '转账' : '收款'
        let time = this.timetrans(this.props.timestamp)
        let value = Number(this.props.Value) / Math.pow(10,8)
        let icon = this.props.from == this.props.account ? require('../../../Public/img/coin_in.png') : require('../../../Public/img/coin_out.png')
        return(
            <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{}}>
                <Image source={icon} style={{width:px2dp(35),height:px2dp(35),marginTop:px2dp(20),marginBottom:px2dp(20),marginRight:px2dp(20)}}/>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingRight:20}}>
                    <View style={{width:px2dp(152),marginRight:px2dp(10)}}>
                        <Text>{transferType}</Text>
                        <Text numberOfLines={1} style={styles.fontStyle}>{this.props.transaction_id}</Text>
                    </View>
                    <View style={{width:px2dp(120),alignItems:"flex-end",marginRight:px2dp(20)}}>
                        <Text numberOfLines={1}>{value}{this.props.coinType}</Text>
                        <Text numberOfLines={1} style={styles.fontStyle}>{time}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    fontStyle:{fontSize:12,color:'#AFAFAF',marginTop:px2dp(10)}
})


