const BTCrypto = global.BTCrypto
const BTProto = BTCrypto.protobuf

export const messageSign = (msg,privateKey)=>{
    let message_pb = require('./message_pb')
    let msgProto = BTProto.messageProtoEncode(message_pb,msg)
    let chainId = Buffer.from("00000000000000000000000000000000","hex")
    let newMsgProto = new Uint8Array()
    newMsgProto = [...msgProto,...chainId]
    let hash = BTCrypto.sha256(BTCrypto.buf2hex(newMsgProto))
    return BTCrypto.sign(hash,privateKey)
}