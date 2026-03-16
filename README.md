# Loja Veloz

[![Node.js](https://img.shields.io/badge/Node.js-20-green)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-20-blue)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-kind-blue)](https://kubernetes.io/)
[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI/CD-orange)](https://github.com/features/actions)
[![License](https://img.shields.io/badge/License-MIT-lightgrey)](LICENSE)

---

## 📝 Descrição

**Loja Veloz** é um sistema de microserviços para gerenciamento de pedidos, pagamentos e estoque, desenvolvido com **Node.js**, **PostgreSQL**, **Docker** e **Kubernetes**. O projeto inclui CI/CD automatizado via **GitHub Actions** e HPA (Horizontal Pod Autoscaler) para escalabilidade automática de serviços críticos.

Microserviços:

- **Pedidos:** Criação e listagem de pedidos.
- **Pagamentos:** Processamento de pagamentos.
- **Estoque:** Gerenciamento de produtos disponíveis.
- **Gateway:** API Gateway que orquestra chamadas entre serviços.

---

## ⚙️ Tecnologias Utilizadas

- **Backend:** Node.js  
- **Banco de Dados:** PostgreSQL  
- **Containerização:** Docker  
- **Orquestração:** Kubernetes (Kind)  
- **CI/CD:** GitHub Actions  
- **Testes:** Jest  
- **Observabilidade (futuro):** Logs centralizados e tracing distribuído  

---

## 🚀 Funcionalidades

- Criação de pedidos com validação de estoque e pagamento.
- Listagem de pedidos existentes.
- Deploy automatizado via GitHub Actions.
- Escalabilidade automática via HPA.
- Estrutura modular e facilmente extensível para novos microserviços.

---

## 🛠️ Como Rodar Localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/loja-veloz.git
cd loja-veloz
```
## 2. Instalar dependências

### Microserviços

```bash
# Microserviço Pedidos
cd pedidos
npm install
cd ../pagamentos
npm install
cd ../estoque
npm install
cd ../gateway
npm install
cd ..
```

## 3. Configurar o banco de dados

O microserviço Pedidos utiliza PostgreSQL.
Crie o banco pedidos e configure usuário e senha correspondentes.


## 3. Executar testes

```bash
cd pedidos
npx jest
cd ..
```
Repita para os demais microserviços.

## 5. Executar via Docker e Kubernetes

Build das imagens docker

```bash
docker build -t seu-usuario/loja_veloz-pedidos:1.1 ./pedidos
```

Criar cluster local com kind

```bash
kind create cluster --name loja-veloz
```

Aplicar deploy dos microserviços e HPA

```bash
kubectl apply -f ./k8s/pedidos/
kubectl apply -f ./k8s/hpa/pedidos-hpa.yaml
```

# CI/CD - Projeto de Microserviços

Este repositório contém a configuração do pipeline CI/CD para microserviços, utilizando GitHub Actions, Docker e Kubernetes (Kind).

---

## 📦 Workflow do GitHub Actions

O workflow realiza as seguintes etapas:

1. **Checkout do código**  
2. **Setup do Node.js**  
3. **Execução de testes**  
4. **Build e push das imagens Docker**  
5. **Criação do cluster Kind e deploy dos microserviços**  
6. **Configuração de HPA** para escalabilidade horizontal

---

## 📈 Estratégias Implementadas

- **Deploy:** Rolling Update para atualização contínua sem downtime.  
- **Escalabilidade:** HPA configurado para microserviços críticos (Pedidos e Gateway).  
- **Observabilidade:** Ainda não implementada; recomenda-se futura implementação de logs centralizados e tracing distribuído.

---

## 🔧 Próximos Passos

- Adicionar observabilidade com logs centralizados e tracing distribuído (OpenTelemetry/Jaeger).  
- Implementar VPA para otimização vertical de recursos.  
- Criar dashboards de métricas para monitoramento do cluster.  
- Melhorar automação de testes integrados e mocks de serviços externos.

---

## 👤 Autor

**Murilo Weishaupt** – Desenvolvedor responsável pelo projeto
