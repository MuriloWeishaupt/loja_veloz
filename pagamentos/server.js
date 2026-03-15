const express = require('express');

const app = express();

app.use(express.json());

app.post("/pagar", (req, res) => {
    console.log("Pagamento processado");

    res.json({
        status: "pago"
    });
});

app.listen(3002, () => {
    console.log("Pagamentos rodando");
});