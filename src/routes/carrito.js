const express = require('express');
const {Router} = express;
const router = Router();
const Datos = require('../../funciones')
const constructor = new Datos("./Data/carrito.json");
const productoCarrito = new Datos("./Data/productos.json");


router.post("/",  (req, res) => {
    try{
        const data = {}
        constructor.saveCarrito(data)
        res.send("se creo el carrito")
    }catch(error){
        res.status(401).send(error)
    }
})

router.delete("/:id", async (req, res) => {
    const {id} = req.params
    try{
        await constructor.deleteById(parseInt(id))
        res.send("se borro el carrito")
    }catch(error){
        res.status(401).send(error)

    }
})

router.get("/:id/productos", async (req, res)=>{
    const {id} = req.params
    try{
        const data = await constructor.getById(parseInt(id))
        res.send(data.productos)
        
    }catch(error){
        res.status(401).send(error)
    }
})

router.post('/:id/productos', async (req, res)=>{
    
    try{
        const {id} = req.params
        const producto = req.body
        const agregarProducto = await productoCarrito.getById(parseInt(producto.id))
        await constructor.saveInCarrito(id,agregarProducto)
        res.send("se agrego el producto al carrito")
    }catch(error){
        res.status(401).send(error)
    }
})

router.delete('/:id/productos/:idProducto',async (req, res)=>{
    const {id,idProducto} = req.params
    try{
        await constructor.deleteProducto(id,idProducto)
        res.send("se elimino el producto del carrito!")
    }catch(error){
        res.status(401).send(error)
    }
})

module.exports = router;

