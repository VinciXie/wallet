import realm from './AccountModel'
console.log({path:realm.path})

const createAccount = async({account,keystore})=>{
    let result = false
    try{
        await realm.write(()=>{
            let Account = realm.create('Account',{account,keystore})
            if(Account){result=true}
        })
    }catch(error){
        console.log(error)
    }
    return result
}

const findAccounts = async(account)=>{
    let Accounts = realm.objects('Account')
    return (typeof account == 'undefined') ? Array.from(Accounts) : Array.from(Accounts.filtered('account = '+account))
}

module.exports = {
    createAccount,
    findAccounts
}