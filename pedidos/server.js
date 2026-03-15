const express = require('express');
const { Pool } = require('pg');
const axios = require('axios');

const app = express();
app.use(express.json());

const pool = new Pool({
    host: "db",
    user: "postgres",
    password: "postgres",
    database: "pedidos",
    port: 5432
});

app.post("/pedidos", async (req, res) => {
    const { produto, quantidade } = req.body;

    try {
        await axios.post("http://estoque-service:3003/reservar", {
            produto,
            quantidade
        });

    await axios.post("http://pagamentos-service:3002/pagar", {
        valor: 100
    });

    const result = await pool.query(
        "INSERT INTO pedidos (produto, quantidade) VALUES ($1, $2) RETURNING *",
        [produto, quantidade]
    );

    res.json(result.rows[0]);

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ erro: "Erro ao criar pedido", detalhe: error.response?.data || error.message });
}
})

app.get("/pedidos", async (req, res) => {
    const result = await pool.query("SELECT * FROM pedidos");
    res.json(result.rows);
});

app.listen(3001, () => {
    console.log("Pedidos rodando");
})

