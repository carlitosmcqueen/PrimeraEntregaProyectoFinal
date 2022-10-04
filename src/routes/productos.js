const express = require("express");
const { Router } = express;
const router = Router();
const Datos = require("../../funciones");
const constructor = new Datos("./Data/productos.json");

const {adminAuth} = require("../middlewares/middlewares")

router.get('/', async (req, res)=>{
    try{
        res.send(await constructor.getAll());
        console.log(await constructor.getAll());
    }catch (error){
        res.send({error:"no se pudo leer el archivo"})
    }  
})
router.get('/:id',async (req, res)=>{
    const {id}= req.params
    try {
        res.send(await constructor.getById(id))
    }catch(e){
        res.status(404).send({error:true,msj:e.message})
    }
})

router.post("/",adminAuth(true),async (req,res)=>{
    try{
        const data = req.body
        constructor.save(data)
        res.send({estado:"se agrego el producto"})
    }catch{
        res.send({error:false,msg:"Producto no cargado"})
    }  
})
router.put("/:id",adminAuth(true),(req, res)=>{
    const {id} = req.params
    try{
        const productoNuevo = req.body
        const idProducto = parseInt(id)
        res.send(constructor.updateById(idProducto,productoNuevo))

    }catch (err){
        res.status(404).send(err.msg)

    }

})
router.delete("/:id",adminAuth(true),(req, res) => {
    const {id} = req.params
    try{
        const idProducto = parseInt(id)
        res.send(constructor.deleteById(idProducto))

    }catch (error) {
        res.status(404).send(error.msg)
    }
})


module.exports = router;
