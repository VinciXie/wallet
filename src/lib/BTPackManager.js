import * as BTPack from './msgpack'

export const registPack = (did)=>{
    let arrSize = BTPack.PackArraySize(2)
    let arrid = BTPack.PackStr16(did.Didid)
    let arrStr = BTPack.PackStr16(JSON.stringify(did.Didinfo))
    return [...arrSize,...arrid,...arrStr]
}

export const transactionPack = (did)=>{
    let arr1Size = BTPack.PackArraySize(4)
    let arrFrom = BTPack.PackStr16(did.from)
    let arrTo = BTPack.PackStr16(did.to)
    let arrTokenType = []
    if (did.token_type != 'BTO') {
      arrTokenType = BTPack.PackStr16(did.token_type)
    }
    let arrPrice = BTPack.PackUint64(did.price)
    // console.log('arrPrice', arrPrice);
    let arrRemark = BTPack.PackStr16(did.remark)

    let arrBuf = [...arr1Size,...arrFrom,...arrTo,...arrTokenType,...arrPrice,...arrRemark]

    return arrBuf
}