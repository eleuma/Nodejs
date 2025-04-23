const express=require('express')
const app=express()
const useRouter=require('./routers/userRouters')
const morgan=require('morgan')
const userLogin=require('./middlewares/userLogin')
const path=require('path')
const connection=require('./database/connection')

app.use(express.json())
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    const data={
      "title":"Titulo de la pagina",
      "message":"Bienvenido a mi sitio web",
      "showMessage":true,
      "items":[1,2,3,4,5]
    }
    
  res.render('index',data)
})

app.use('/users',useRouter)
app.use(morgan('dev'))
app.use(userLogin)


app.listen(3000,()=>{
  console.log('Aplicacion con express ejecutandose en el puerto 3000')
})