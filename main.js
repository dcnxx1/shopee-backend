require('dotenv').config({path: './.env'})
const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db')
const pdf=  require('./pdf/pdf')




app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', (req,res) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
})

app.get('/', async (req,res) => {
const response = await db.getAll()
res.send(response.rows)
})

app.get('/dames', async (req,res) => {
    const response = await db.getWomen()

    res.send(response.rows)
    
})


app.use('/pdf' , async (req,res, next) => {
    const generatePdf = await pdf.make(req.body.arrayBag) 
    req.pdf = generatePdf 
    next()
})



app.post('/pdf', (req,res) => {
    res.set('Content-Type', 'application/pdf')
    res.send(req.pdf)
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

    }).catch((err) => err && res.send(err))
})

app.listen(process.env.PORT || 4040)
