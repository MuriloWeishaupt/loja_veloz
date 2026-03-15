const request = require('supertest');
const express = require('express');
const axios = require('axios');

jest.mock('axios');

const app = express();
app.use(express.json());

app.post("/pedido", async (req, res) => {
    try {
        const response = await axios.post("http://pedidos:3001/pedidos", req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ erro: "Erro no gateway" });
    }
});

app.get("/pedidos", async (req, res) => {
    const response = await axios.get("http://pedidos:3001/pedidos");
    res.json(response.data);
});

describe("Testes Gateway", () => {
    it("POST /pedido deve retornar sucesso", async () => {
        axios.post.mockResolvedValue({ data: { status: "pedido criado" } });
        const res = await request(app).post("/pedido").send({ produto: "notebook", quantidade: 1 });
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("pedido criado");
    });

    it("GET /pedidos deve retornar lista", async () => {
        axios.get.mockResolvedValue({ data: [{ produto: "notebook", quantidade: 1 }] });
        const res = await request(app).get("/pedidos");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
    });
});