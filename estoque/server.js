const express = require('express');

const app = express();

app.use(express.json());

let estoque = {
    notebook: 10,
    mouse: 20,
    teclado: 15
};

app.post("/reservar", (req, res) => {
    const { produto, quantidade } = req.body;

    if (!estoque[produto] || estoque[produto] < quantidade) {
        return res.status(400).json({
            erro: "Estoque insuficiente"
        });
    }

    estoque[produto] -= quantidade;

    res.json({
        status: "reservado"
    });

});

app.listen(3003, () => {
    console.log("Estoque rodando");
})