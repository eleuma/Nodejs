const userLogin=(req,res,next)=>{
    let isLogin=true
    if(!isLogin){
        return res.status(401).json({'message':"usuario no logueado"})
    }
    next()
}
module.exports=userLogin