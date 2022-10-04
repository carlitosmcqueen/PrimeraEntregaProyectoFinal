const express = require('express');
const app = express();

const productosRouter = require('./src/routes/productos')
const carritoRouter = require('./src/routes/carrito')

app.use(express.urlencoded({extended:true}));
app.use(express.json());





app.use("/api/productos",productosRouter);
app.use("/api/carrito",carritoRouter);


app.listen(8080, () => {
    console.log(`servidor iniciado`)
})