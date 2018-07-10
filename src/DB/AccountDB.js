import realm from './AccountModel'
console.log({path:realm.path})

const createAccount = async({account,keystore})=>{
    let result = false
    try{
        await realm.write(()=>{
            let Account = realm.create('Account',{account,keystore})
            console.log({Account})
            if(Account){result=true}
        })
    }catch(error){
        console.log(error)
    }
    return result
}

const findAccounts = async(account)=>{
    let Accounts = realm.objects('Account')
    return (typeof account == 'undefined') ? Array.from(Accounts) : Array.from(Accounts.filtered('account = \"'+account+'\"'))
}

const removeAccount = async(accountname)=>{
      let Accounts = realm.objects('Account')
      let accounts = Array.from(Accounts.filtered('account = \"' + accountname + '\"'))
      let account = accounts[0]
      let result = false
      try{
        await realm.write(()=>{
            realm.delete(account)
            result = true
        })
      }catch(error){
        console.log({error})
      }
      return result
}

module.exports = {
    createAccount,
    findAccounts,
    removeAccount
}