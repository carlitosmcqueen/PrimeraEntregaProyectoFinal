const fs = require('fs');
const moment = require('moment');
class Datos {
    constructor(archivo) {
        this.archivo = archivo
    }
    async save(producto) {
        try {
            const data = await fs.promises.readFile(`${this.archivo}`, `utf-8`)
            const productos = JSON.parse(data);
            const id = productos.length + 1;
            producto.id = id;
            productos.push(producto);
            const productosString = JSON.stringify(productos);
            await fs.promises.writeFile(`${this.archivo}`, productosString)
            return producto.id

        } catch (error) {
            return "no se guardar"

        }
    }

    async getById(id) {
        const data = await fs.promises.readFile(`${this.archivo}`, "utf-8");
        const productos = JSON.parse(data);
        const producto = productos.find((producto) => producto.id === id);
        if(producto){
            console.log(producto)
            return producto
        }else{
            return "hubo un error"
        }
    }
    async random() {
        try {
            const data = await fs.promises.readFile(`${this.archivo}`, "utf-8")
            const dataArray = JSON.parse(data);
            const aleatorio = Math.floor(Math.random() * dataArray.length);
            const valor = dataArray[aleatorio]
            return valor
        } catch {
            return "ocurrio un error inesperado"
        }
    }
    async deleteById(id) {

        try {
            const data = await fs.promises.readFile(`${this.archivo}`, "utf-8")
            const productos = JSON.parse(data);
            const arrayBorrado = productos.filter((item) => item.id !== id)
            const verricar = productos.find((item) => item.id === id);
            if (verricar) {
                await fs.promises.writeFile(`${this.archivo}`, JSON.stringify(arrayBorrado))
                return "se borro el archivo correctamente"
            } else {
                return "no se encontro el archivo"
            }

        } catch (error) {
            return "error el leer el archivo borrado por id"
        }

    }
    async getAll() {
        try {
            const data = await fs.promises.readFile(`${this.archivo}`, "utf-8")
            const datos = JSON.parse(data)
            return datos

        } catch (error) {
            return "error al leer el archivo"
        }
    }
    async deleteAll() {
        try {
            fs.promises.writeFile(`${this.archivo}`, JSON.stringify([]))
            console.log('se borro la lista')
        } catch (err) {
            console.error("ocurrio un error", err)
        }

    }

    async updateById(id, objetoNuevo) {
        try {
            const data = fs.readFileSync(this.archivo, "utf-8");
            let dataParseada = JSON.parse(data);
            let productoViejo = dataParseada.find((objeto) => objeto.id === id);

            if (productoViejo === undefined) {
                throw {
                    msg: "404 Not found"
                };
            }
            let productosFiltrados = dataParseada.filter((objeto) => objeto.id !== id);
            productoViejo = {
                id,
                ...objetoNuevo
            };
            productosFiltrados.push(productoViejo);
            fs.writeFileSync(this.archivo, JSON.stringify(productosFiltrados, null, 2));
            return "se remplazo el producto";


        } catch (error) {
            return "no se encontro el producto a cambiar"
        }

    }

    //-------------------------- CARRITO---------------------
    saveCarrito() {
        try {
            const data = fs.readFileSync(`${this.archivo}`, `utf-8`)
            const dataParseada = JSON.parse(data)
            const id = dataParseada.length +1
            const hora = moment().hour()+".hs"
            const productos = []
            const producto = {id,hora,productos}
            dataParseada.push(producto)
            fs.writeFileSync(`${this.archivo}`,JSON.stringify(dataParseada,null, 2))
            return id

        }catch (error) {
            return "ocurrio un error inesperado"
        }   
    }
    async saveInCarrito(id,productoNuevo){
        try {
            const data = await fs.promises.readFile(`${this.archivo}`, `utf-8`)
            const dataParseada = JSON.parse(data)
            let carrito = dataParseada.find((obj) => obj.id == id)
            carrito.productos.push(productoNuevo)
            await fs.promises.writeFile(`${this.archivo}`,JSON.stringify(dataParseada,null, 2))
            return "se agrego al carrito" 
        }catch(error){
            return "no se pudo agregar al carrito"
        }
    }

    
    async deleteProducto(id,idProducto){
        try{
            const data = await fs.promises.readFile(`${this.archivo}`, `utf-8`)
            const dataParseada = JSON.parse(data)
            let carrito = dataParseada.find((obj)=> obj.id == id)
            let productos = carrito.productos.filter((obj)=>obj.id != idProducto)
            carrito.productos = productos
            fs.promises.writeFile(`${this.archivo}`,JSON.stringify(dataParseada,null, 2))
            return "se ha logrado eliminar el producto"
        }catch (error) {
            return "error al borrar el producto"
            
        }
        
    }
}
module.exports = Datos;