import express from "express";
import cors from "cors";


// SDK de Mercado Pago
import { MercadoPagoConfig, Preference} from 'mercadopago';
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken:'APP_USR-3712487128255922-032209-a82b6270579e767b9340f979d39f3c29-1736729703'});


const app = express()
const port = 3000;

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("soy el server: ");

});

app.post("/pago", async (req, res) => {
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
                success: "http://www.youtube.com/@johangarzon9582",
                failure: "http://www.youtube.com/@johangarzon9582",
                pending: "http://www.youtube.com/@johangarzon9582"
            },
            auto_retun: "approved",
        };
        const preference = new Preference(client)
        const result = await preference.create({ body })

        res.json({
            id: result.id
        })
        console.log(result, "444444444444")
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al crear la preferencia" 
        });
    }
})



// Maneja los webhooks de Mercado Pago
app.post("/webhook", (req, res) => {
    const { body } = req; // Destructura el cuerpo de la solicitud
    const { id, status, metadata, ...otherData } = body; // Destructura la información relevante del cuerpo

    // Valida la autenticidad del webhook
    const isValidSignature = webhook.verifySignature(body);

    if (isValidSignature) {
        // Procesa la información recibida del webhook
        console.log("Información del pago recibida:");
        console.log("ID de pago:", id);
        console.log("Estado de pago:", status);
        console.log("Metadata:", metadata);
        console.log("Otros datos:", otherData);

        // Hace un POST a una URL específica con la información recibida
        const url = "https://tuurl.com"; // Reemplaza "https://tuurl.com" con tu URL destino
        axios.post(url, { id, status, metadata, ...otherData })
            .then(response => {
                console.log("POST exitoso:", response.data);
            })
            .catch(error => {
                console.error("Error al hacer POST:", error);
            });

        res.sendStatus(200);
    } else {
        console.error("Firma inválida en el webhook de Mercado Pago");
        res.sendStatus(400);
    }
});



app.listen(port, () => {
    console.log(`el servidor esta corriendo en el puerto ${port}`)
})