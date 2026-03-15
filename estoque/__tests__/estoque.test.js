const request = require('supertest');
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
        return res.status(400).json({ erro: "Estoque insuficiente" });
    }

    estoque[produto] -= quantidade;
    res.json({ status: "reservado" });
});

describe("Testes Estoque", () => {
    it("Deve reservar um produto com estoque suficiente", async () => {
        const res = await request(app)
            .post("/reservar")
            .send({ produto: "notebook", quantidade: 2 });

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("reservado");
    });

    it("Deve retornar erro quando estoque insuficiente", async () => {
        const res = await request(app)
            .post("/reservar")
            .send({ produto: "notebook", quantidade: 100 });

        expect(res.statusCode).toBe(400);
        expect(res.body.erro).toBe("Estoque insuficiente");
    });
});