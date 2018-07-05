const Realm = require('realm')

const AccountSchema = {
    name:'Account',
    primaryKey:'account',
    properties:{
        account:'string',
        keystore:'string'
    }
}

const realm = new Realm({schema:[AccountSchema]})

export default realm