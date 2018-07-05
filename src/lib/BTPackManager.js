import * as msgpack from './msgpack'

export const registPack = (did)=>{
    let arrSize = msgpack.PackArraySize(2)
    let arrid = msgpack.PackStr16(did.Didid)
    let arrStr = msgpack.PackStr16(JSON.stringify(did.Didinfo))
    return [...arrSize,...arrid,...arrStr]
}
