import React, {PureComponent} from 'react'
import {View,Text,StyleSheet,FlatList,ScrollView,Image} from 'react-native'
import locale from '../../locals/index'
import {Button,Carousel,WingBlank,Toast} from 'antd-mobile'
import BTCard from './BTCard'
import BTItemView from './subviews/BTItemView'
import {BTFetch} from '../../Common/BTFetch'
import {findAccounts,findAccount} from '../../DB/AccountDB'
const px2dp = global.px2dp
const Storage = global.Storage

export default class BTHome extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            account:'',
            totalCount:0,
            data:[],
            usdt_cny_price:0,
            bto_usdt_price:0,
            accounts:[]
        }
    }

    async getBTOPrice(){
        Toast.loading('正在获取资产价格',10*1000)
        let isSuccess = false
        let usdt_cny = 'https://data.gateio.io/api2/1/ticker/usdt_cny'
        let bto_usdt = 'https://data.gateio.io/api2/1/ticker/bto_usdt'
        try{
            let usdt_cny_res = await fetch(usdt_cny).then(response=>response.json())
            let bto_usdt_res = await fetch(bto_usdt).then(response=>response.json())
            let usdt_cny_price = usdt_cny_res.last
            let bto_usdt_price = bto_usdt_res.last
            Storage.save({key:'price',data:{usdt_cny_price,bto_usdt_price}})
            this.setState({bto_usdt_price,usdt_cny_price})
            Toast.hide()
        }catch(error){
            Toast.fail('获取价格失败')
            console.log(error)
        }
        return isSuccess
    }

    async getCount(account){
        Toast.loading('正在获取资产价格',10*1000)
        try{
            let Account = await Storage.load({key:'account'})
            let price=  await Storage.load({key:'price'})
            if(Account){
                account = account || Account.account
                let url = '/user/GetBalance'
                let params = {
                    username:account
                }

                let res = await BTFetch(url,'POST',params)
                console.log({res})
                Toast.hide()
                if(res && res.code==1){
                    let data = res.data
                    let totalCount = 0
                    data.forEach(item => {
                        if(item.token_type=='BTO'){
                            totalCount = item.value / Math.pow(10,8) * price.bto_usdt_price * price.usdt_cny_price
                        }
                    });
                    data.unshift({cny:0,token_type:'',usd:0,value:0})
                    this.setState({
                        data:data,
                        totalCount:totalCount,
                        account
                    })
                }else{
                    Toast.fail('资产数据请求失败')
                }
            }
        }catch(error){
            Toast.fail('获取资产失败')
            console.log({error})
        }
    }

    async componentDidMount(){
        await this.getBTOPrice()
        await this.getCount()
    }

    changeLocale(){
        locale.locale = 'en'
        this.forceUpdate()
    }

    itemView(item,index){
        let price = {
            usdt_cny_price:this.state.usdt_cny_price,
            bto_usdt_price:this.state.bto_usdt_price
        }
        let headView = <View key={index} style={[styles.itemViewStyle,{borderTopLeftRadius:25,borderTopRightRadius:25,paddingTop:25,paddingLeft:25}]}><Text style={{fontSize:25}}>资产详情</Text></View>
        let resItem = headView
        let leng = this.state.data.length - 1
        if(index==0){
            resItem = headView
        }else if(index==leng){
            resItem = <BTItemView key={index} style={[styles.itemViewStyle,{borderBottomLeftRadius:25,borderBottomRightRadius:25,paddingBottom:25}]} data={item} price={price}/>
        }else{
            resItem = <BTItemView key={index} style={styles.itemViewStyle} data={item} price={price}/>
        }

        return(
            resItem
        )
    }

    render(){
        let data = this.state.data
        return(
            <View style={{flex:1,paddingBottom:px2dp(20),backgroundColor:'white'}}>
                <Text style={{marginTop:px2dp(45),marginLeft:(20),fontSize:24,fontWeight:'bold'}}>{this.state.account}</Text>
                <FlatList
                    automaticallyAdjustContentInsets={false} // 去掉顶部空白
                    style={{flex:1,backgroundColor:'#F5F6FA'}}
                    data={data}
                    renderItem={({item,index})=>this.itemView(item,index)}
                    ListHeaderComponent={<HeaderCard {...this.state} selected={this.props.selected} changeAccount={(account)=>{this.getCount(account),this.setState({account})}}/>}
                />
            </View>
        )
    }
}

class HeaderCard extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            accounts: [],
            imgHeight: 176,
        }
    }


    async componentDidMount(){
        await this.findAccounts()
    }

    async componentWillReceiveProps(){
        await this.findAccounts()
    }

    async findAccounts(){
        let accounts = await findAccounts()
        if(accounts.length>0){
            this.setState({accounts})
        }else{
            try{
                let account = await Storage.load({key:'account'})
                this.setState({accounts:[account]})
            }catch(error){
                console.log(error)
            }
        }
    }

    async chengeAccount(nextAccount){
        let accountArr = await findAccounts(nextAccount+'')
        if(accountArr.length>0){
            let account = accountArr[0]
            this.props.changeAccount(account.account)
            Storage.save({key:'account',data:{
                account:account.account,
                data:{
                    keystore:account.keystore,
                    privateKey:account.privateKey
                }
            }})
        }
    }

    render(){
        return(
            <View style={[styles.headerStyle,{marginBottom:px2dp(20)}]}>
                <WingBlank>
                    <Carousel
                        beforeChange={(from, to) => alert('beforechange')}
                        afterChange={index => {
                            let accounts = this.state.accounts
                            let Account = accounts[index]
                            let nextAccount = Account.account
                            this.chengeAccount(nextAccount)
                        }}
                    >
                    {this.state.accounts.map((item,index) => {
                        return (
                            <BTCard key={index} {...this.props} {...item}/>
                         )
                    })}
                    </Carousel>
                </WingBlank>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"flex-start",
        backgroundColor:"#F5F6FA"
    },
    headerStyle:{
        height:px2dp(230),
        backgroundColor:"white",
        justifyContent:"center"
    },
    itemViewStyle:{
        height:(70),
        backgroundColor:'white',
        marginLeft:px2dp(18),
        marginRight:px2dp(18),
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row'
    }
})