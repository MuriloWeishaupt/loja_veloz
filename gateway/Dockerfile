FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

FROM node:20-alpine

WORKDIR /app

RUN addgroup -S app && adduser -S app -G app

COPY --from=builder /app /app/

USER app

EXPOSE 3000

CMD ["npm", "start"]