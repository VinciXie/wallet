import React, {PureComponent} from 'react'
import {View,Text,StyleSheet,FlatList,ScrollView,Image} from 'react-native'
import locale from '../../locals/index'
import {Button,Carousel,WingBlank} from 'antd-mobile'
import BTCard from './BTCard'
import { Item } from 'antd-mobile/lib/tab-bar';
import BTItemView from './subviews/BTItemView'


export default class BTHome extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            dataSource:[
                {
                    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
                    title: 'Meet hotel',
                    des: '不是所有的兼职汪都需要风吹日晒',
                  },
                  {
                    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
                    title: 'McDonald\'s invites you',
                    des: '不是所有的兼职汪都需要风吹日晒',
                  },
                  {
                    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
                    title: 'Eat the week',
                    des: '不是所有的兼职汪都需要风吹日晒',
                  },
                  {
                    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
                    title: 'Eat the week',
                    des: '不是所有的兼职汪都需要风吹日晒',
                  },
                  {
                    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
                    title: 'Eat the week',
                    des: '不是所有的兼职汪都需要风吹日晒',
                  },
                  {
                    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
                    title: 'Eat the week',
                    des: '不是所有的兼职汪都需要风吹日晒',
                  },
                  {
                    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
                    title: 'Eat the week',
                    des: '不是所有的兼职汪都需要风吹日晒',
                  }
            ]
        }
    }

    changeLocale(){
        locale.locale = 'en'
        this.forceUpdate()
    }

    itemView(item,index){
        let headView = <View key={index} style={[styles.itemViewStyle,{borderTopLeftRadius:25,borderTopRightRadius:25,paddingTop:25,paddingLeft:25}]}><Text style={{fontSize:25}}>资产详情</Text></View>
        let resItem = headView
        let leng = this.state.dataSource.length - 1
        if(index==0){
            resItem = headView
        }else if(index==leng){
            resItem = <BTItemView key={index} style={[styles.itemViewStyle,{borderBottomLeftRadius:25,borderBottomRightRadius:25,paddingBottom:25}]} data={item}/>
        }else{
            resItem = <BTItemView key={index} style={styles.itemViewStyle} data={item}/>
        }

        return(
            resItem
        )
    }

    render(){
        let data = this.state.dataSource
        data.unshift({img: "https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png", title: "Meet hotel", des: "不是所有的兼职汪都需要风吹日晒"})
        return(
            <View style={{flex:1,paddingBottom:20}}>
                <FlatList
                    style={{flex:1,backgroundColor:'#F5F6FA'}}
                    data={data}
                    renderItem={({item,index})=>this.itemView(item,index)}
                    ListHeaderComponent={<HeaderCard/>}
                />
            </View>
        )
    }
}

class HeaderCard extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            data: ['1', '2', '3'],
            imgHeight: 176,
        }
    }

    render(){
        return(
            <View style={[styles.headerStyle,{marginBottom:20}]}>
                <WingBlank>
                    <Carousel
                        dots={false}
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => console.log('slide to', index)}
                    >
                    {this.state.data.map((val,index) => (
                       <BTCard key={index}/>
                    ))}
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
        height:230,
        backgroundColor:"white",
        justifyContent:"center"
    },
    itemViewStyle:{
        height:70,
        backgroundColor:'white',
        marginLeft:18,
        marginRight:18,
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row'
    }
})