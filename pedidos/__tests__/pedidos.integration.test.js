const request = require("supertest");
const express = require("express");
const axios = require("axios");
const { Pool } = require("pg");


jest.mock("axios");

const app = express();
app.use(express.json());


const pool = new Pool({
    host: "localhost",      
    user: "postgres",
    password: "postgres",
    database: "pedidos",
    port: 5432
});


app.post("/pedidos", async (req, res) => {
    const { produto, quantidade } = req.body;

    try {
        await axios.post("http://estoque-service:3003/reservar", { produto, quantidade });
        await axios.post("http://pagamentos-service:3002/pagar", { valor: 100 });

        const result = await pool.query(
            "INSERT INTO pedidos (produto, quantidade) VALUES ($1, $2) RETURNING *",
            [produto, quantidade]
        );

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar pedido" });
    }
});

describe("Testes integrados de Pedidos", () => {
    beforeAll(async () => {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS pedidos (
                id SERIAL PRIMARY KEY,
                produto VARCHAR(50),
                quantidade INT
            )
        `);
    });

    afterAll(async () => {
        await pool.query("DROP TABLE pedidos");
        await pool.end();
    });

    it("Deve criar um pedido com sucesso", async () => {
        axios.post.mockResolvedValue({ data: { status: "ok" } });

        const res = await request(app)
            .post("/pedidos")
            .send({ produto: "notebook", quantidade: 2 });

        expect(res.statusCode).toBe(200);
        expect(res.body.produto).toBe("notebook");
        expect(res.body.quantidade).toBe(2);
    });

    it("Deve falhar se o estoque estiver indisponível", async () => {
        axios.post.mockRejectedValue({ response: { data: { erro: "Estoque insuficiente" } } });

        const res = await request(app)
            .post("/pedidos")
            .send({ produto: "mouse", quantidade: 1000 });

        expect(res.statusCode).toBe(500);
        expect(res.body.erro).toBe("Erro ao criar pedido");
    });
});