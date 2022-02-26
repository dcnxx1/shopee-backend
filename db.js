const {Client} = require('pg')

const client = new Client({
    connectionString: process.env.CON_STRING,
    ssl: {
        rejectUnauthorized: false
      }
})

client.connect()

// host: process.env.CON_HOST,
//     database: process.env.CON_DB,
//     user: process.env.CON_USER,
//     password: process.env.CON_PASS,
//     port: process.env.CON_PORT 


function translator(val) {
if(val == 'heren'){
    return 'male'
} else if(val == 'dames'){
    return 'female'
}
}


module.exports = {
    getAll: () => {
        return client.query('SELECT * FROM Stock')
    },
    getWomen : () => {
      
        return client.query(`SELECT * FROM Stock WHERE sex='female'`)
    },
    getMen : () => {
        return client.query(`SELECT * FROM Stock WHERE sex='male'`)
    },

    getItem : (id, gender) => {
        const forWho = translator(gender)
        return new Promise((resolve, reject )=> {
            client.query(`SELECT * FROM Stock WHERE id=${id} AND sex='${forWho}'`).then((res) => {
                if(!res.rows.length == 0){
                    resolve(...res.rows)
                } else {
                    reject('ERR_ITEM_DOES_NOT_EXISTS')
                }
            }).catch(err =>{if (err) reject(err)})
        })
    
    }
}