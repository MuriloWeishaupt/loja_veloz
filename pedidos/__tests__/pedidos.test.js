const request = require('supertest');
const express = require('express');
const axios = require('axios');

jest.mock('axios'); 

const app = express();
app.use(express.json());

app.post("/pedidos", async (req, res) => {
    try {
        await axios.post("http://estoque-service:3003/reservar", req.body);
        await axios.post("http://pagamentos-service:3002/pagar", { valor: 100 });
        res.json({ status: "pedido criado" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar pedido" });
    }
});

describe("Testes Pedidos", () => {
    it("Deve criar pedido com sucesso", async () => {
        axios.post.mockResolvedValue({}); 
        const res = await request(app).post("/pedidos").send({ produto: "notebook", quantidade: 1 });
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("pedido criado");
    });

    it("Deve falhar quando estoque/pagamento der erro", async () => {
        axios.post.mockRejectedValue(new Error("Erro mock"));
        const res = await request(app).post("/pedidos").send({ produto: "notebook", quantidade: 1 });
        expect(res.statusCode).toBe(500);
        expect(res.body.erro).toBe("Erro ao criar pedido");
    });
});