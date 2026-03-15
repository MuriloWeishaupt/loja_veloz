const request = require("supertest");
const app = require("../server"); 

describe("Estoque Service", () => {
    it("Deve reservar produto quando quantidade suficiente", async () => {
        const res = await request(app)
            .post("/reservar")
            .send({ produto: "notebook", quantidade: 2 });

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("reservado");
    });

    it("Deve falhar quando quantidade insuficiente", async () => {
        const res = await request(app)
            .post("/reservar")
            .send({ produto: "mouse", quantidade: 1000 });

        expect(res.statusCode).toBe(400);
        expect(res.body.erro).toBe("Estoque insuficiente");
    });
});