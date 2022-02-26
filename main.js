require('dotenv').config({path: './.env'})
const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./db')

app.use(cors())
app.use(express.json())


app.get('/', async (req,res) => {
const response = await db.getAll()
res.send(response.rows)
})

app.get('/dames', async (req,res) => {
    const response = await db.getWomen()
    console.log(response)
    res.send(response.rows)
    
})


app.get('/heren', async(req,res) => {
    const response = await db.getMen()
    res.send(response.rows)
})

app.get('/gndr/:gender/item_id=:id', async (req,res) => {
    const id = req.params.id
    const gender = req.params.gender

    db.getItem(id, gender).then((response) => {
        res.send(response)
        console.log(response)
    }).catch((err) => err && res.send(err))
})

app.listen(process.env.PORT || 4040)
