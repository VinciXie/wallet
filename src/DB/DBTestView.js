import React,{PureComponent} from 'react'
import {View,Text} from 'react-native'
import {Button,Popover} from 'antd-mobile-rn'

const Item = Popover.Item

import DB from './DB'

export default class DBTestView extends PureComponent{
    constructor(props){
        super(props)
    }

    insert(){
        console.log('insert')
        DB.createAccount({account:'john',keystore:'skldjflsdfj'},(tx,result)=>{
            console.log({tx,result})
        })
    }

    select(){
        DB.findAccounts('',(tx,response)=>{
            let len = response.rows.length
            for(let i = 0;i<len;i++){
                let row = response.rows.item(i)
                console.log({account:row.account,keystore:row.keystore})
            }
        })
    }

    delete(){
        DB.remove('yuanjunliang',(tx,result)=>{
            console.log({tx,result})
        })
    }

    openMenu(){
        openMenu('menu')
    }

    render(){
        return(
            <View style={{flex:1}}>
            <Popover 
                name="menu"
                visible={true}
                style={{width:300,height:400}}
                contextStyle={{flex:1,margin:50}}
                triggerStyle={{flexDirection:'row',paddingHorizontal:10}}
                overlayStyle={{left:90,marginTop:20}}
                overlay={[
                    <Item key="4"><Button>JSLKDFJSLDF</Button></Item>,
                    <Item key="5"><Button>JSLKDFJSLDF</Button></Item>
                ]}
            >
                <Text>slklsdjfls</Text>
                {/* <Button type="primary" style={{marginTop:20}} onClick={()=>{this.openMenu()}}>打开</Button>
                <Button type="primary" style={{marginTop:20}} onClick={()=>{this.insert()}}>插入</Button>
                <Button type="primary" style={{marginTop:20}} onClick={()=>{this.select()}}>查询</Button>
                <Button type="primary" style={{marginTop:20}} onClick={()=>{this.delete()}}>删除</Button> */}
            </Popover>
            </View>
        )
    }
}