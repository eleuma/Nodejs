const UserService=require('../services/userService')
const userService=new UserService()


exports.getAllUsers=async(req,res)=>{
    const user =await userService.getAllUsers()
    res.status(200).json(user)
}

exports.getUser=async(req,res)=>{
const id=req.params.id

const user =await userService.filterById(id)
if(!user){
    return res.status(400).json({'message':"Usuario no encontradp"})
}
res.status(200).json(user)
}
exports.createUser=async(req,res)=>{
    try{
        let data=req.body
        await userService.create(data)
        res.status(201).send('usuario registrado')
    }catch{
        res.status(500).json({"error":console.error.messageÇ})
    }
    let data=req.body
    const{nombre,apellido,email,telefono}=data
    console.log(nombre,apellido,email,telefono)
}
exports.updateUser=async(req,res)=>{
    let data=req.body
    const id=req.params.id
    const user=await userService.filterById(id)
    if(!user){
        return res.status(400).json({'message':"usuario no encontrado"})
    }
    await UserService.update(id,data)
    res.status(201).send('se modifico correctamente')

}
exports.deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await userService.filterById(id);
  
      if (!user) {
        return res.status(400).json({ message: "Usuario no encontrado" });
      }
  
      await userService.delete(id);
      res.status(200).send('Se eliminó el usuario correctamente');
      
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };