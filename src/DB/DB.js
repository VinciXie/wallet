
import sqlite from 'react-native-sqlite-storage'

sqlite.DEBUG(true)
const database_name = 'Database'
const database_version = '1.0'
const database_displayname = 'Wallet DB'
const database_size = 2000

const errorCB = (err)=>{
    console.log("SQL Error: " + err);
}
  
const successCB = ()=>{
    console.log("SQL executed fine");
}
  
const openCB = ()=>{
    console.log("Database OPENED");
}

class DB{
    constructor(){
        this.db = null
        this.openDB()
    }
    openDB(){
        this.db = sqlite.openDatabase(database_name,database_version,database_displayname,database_size,openCB,errorCB)
        this.createTable((error,result)=>{
        })
    }

    createTable(callback){
        if(!this.db){
            this.openDB()
        }

        this.db.transaction((tx)=>{
            let sql = `CREATE TABLE IF NOT EXISTS ACCOUNTS(`+'account,'+'keystore);'
            tx.executeSql(sql,[],callback,errorCB)
        },errorCB,successCB)
    }

    createAccount({account,keystore},callback){
        this.db.transaction((tx)=>{
          let sql = "SELECT * FROM ACCOUNTS where account=\'"+account+"\'"
          tx.executeSql(sql,[],(tx,result)=>{
            if(result.rows.length>0){
              console.log('account already exist')
            }else{
              let sql = 'INSERT INTO ACCOUNTS(account,keystore) values(?,?)'
              tx.executeSql(sql,[account,keystore],callback)
            }
          })
        })
    }

    findAccounts(account,callback){
      this.db.transaction((tx)=>{
        let sql = "SELECT * FROM ACCOUNTS"
        if(account != ''){
            sql = "SELECT * FROM ACCOUNTS where account=\'"+account+"\'"
        }
        tx.executeSql(sql,[],callback)
      })
    }

    remove(account,callback){
        this.db.transaction((tx)=>{
          let sql = "DELETE FROM ACCOUNTS where account=\'"+account+"\'"
          tx.executeSql(sql,[],callback)
        })
    }
}

export default new DB()