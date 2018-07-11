import React,{PureComponent} from 'react'
import BTGlobal from './Common/BTGlobal'
import BTRouter from './BTRouter'
import {BTFetch} from './Common/BTFetch'

export default class BTMain extends PureComponent{
    constructor(props){
        super(props)
    }

    // async getPrice(){
    //     let timestamp = (new Date()).getTime()
    //     let usdt_cny = 'https://data.gateio.io/api2/1/ticker/usdt_cny'
    //     let bto_usdt = 'https://data.gateio.io/api2/1/ticker/bto_usdt'
    //     try{
    //         let usdt_cny_res = await fetch(usdt_cny).then(response=>response.json())
    //         let bto_usdt_res = await fetch(bto_usdt).then(response=>response.json())
    //         let usdt_cny_price = usdt_cny_res.last
    //         let bto_usdt_price = bto_usdt_res.last


    //     }catch(error){
    //         console.log({error})
    //     }
    // }

    // componentDidMount(){
    //     this.getPrice()
    // }

    render(){
        return(
            <BTRouter/>
        )
    }
}