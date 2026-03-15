const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post("/pedido", async (req, res) => {

    try {
        const response = await axios.post("http://pedidos:3001/pedidos", req.body);
        res.json(response.data);

    } catch (error) {
        
        res.status(500).json({
            erro: "Erro no gateway"
        });

    }

});

app.get("/pedidos", async (req, res) => {
    
    const response = await axios.get("http://pedidos:3001/pedidos");
    res.json(response.data);

});

app.listen(3000, () => {
    console.log("Gateway rodando");
});