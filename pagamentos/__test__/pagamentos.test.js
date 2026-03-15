const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());

app.post("/pagar", (req, res) => {
    res.json({ status: "pago" });
});

describe("Testes Pagamentos", () => {
    it("Deve processar pagamento com sucesso", async () => {
        const res = await request(app)
            .post("/pagar")
            .send({ valor: 100 });

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("pago");
    });
});