import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import url from './routes/urlRouter.js'
import { dbConnection } from './config/db.js'


const app = express()

const __filename = fileURLToPath(import.meta.url)
console.log(__filename)

const __dirname = path.dirname(__filename)

console.log(__dirname)


app.set('view engine','ejs')
app.set('views','views')

app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())



app.get('/', (req, res) => {
    res.render('index',{pageTitle:'Home'})
})

app.use(url)

app.use((req,res)=>{
    res.render('404',{
        pageTitle:'Page Not Found'
    })
})


dbConnection()
app.listen(3000)