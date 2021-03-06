const express = require('express')
const fs = require('fs')
const app = express()
const port = 8080

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async getAll() {
        try {
            return JSON.parse(
                await fs.promises.readFile(this.archivo, "utf-8")
            );
        } catch (error) {
            console.log(`Error al iniciar el metodo GetAll: ${error}`);
        }
    }


}



app.listen(port, () => {
    try {
        console.log(`Servidor iniciado en puerto ${port}`)
    } catch (error) {
        console.log(`Error al iniciar el puerto: ${error}`)
    }
})


app.get('/', (req, res) => {
    res.send(

        ` <h1 style="color: red" >Bienvenido al servidor de Pato</h1> `

    )
})


app.get('/productos', async (req, res) => {

    let productos = await new Contenedor('productos.txt').getAll()

    res.send(`<h1>PRODUCTOS</h1> <ul  style="list-style: none" > ${productos.map(prod => {
        let card = `<li><img src='${prod.thumbnail}' style="width: 30px" />${prod.title}, <br> Precio:$ ${prod.price}</li>`


        return card
    })}</ul>`)
})


app.get('/productoRandom', async (req, res) => {

    let productos = await new Contenedor('productos.txt').getAll()

    let random = Math.floor(Math.random() * productos.length);

    res.send(

        `<img src='${productos[random].thumbnail}' style="width: 100px" /><br>${productos[random].title}, <br> Precio:$ ${productos[random].price}`

    )
})
