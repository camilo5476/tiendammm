import express from "express";
import cors from "cors";

// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken:'APP_USR-3068369922515206-032120-1f90a6e6e37992b830dd37a35d475636-1736729703'});

const app = express()
const port = 3000;

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("soy el server: ");
});

app.post("/pay", async (req, res) => {
    try {
        const body = {
            items: [{
                title: req.body.title,
                quantity: Number(req.body.quantity),
                unit_price: Number(req.body.price),
                size : Number(req.body.talla),
                currency_id: "COP",
            }],
            back_urls: {
                success: "https://65fdad39fb849b29e8c12718--merry-naiad-e180d4.netlify.app/",
                failure: "https://65fdad53c1de1f230414c9b7--bucolic-bonbon-2beec3.netlify.app/",
            },
            auto_return: "approved", // Cambié "auto_retun" a "auto_return"
        };

        const preference = new Preference(client)
        const result = await preference.create(body)

        res.json({
            id: result.id
        });

        console.log(result, "444444444444")
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al crear la preferencia" 
        });
    }
});

app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto ${port}`);
});
