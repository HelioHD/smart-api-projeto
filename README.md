

# Projeto SmartExpenses

Aplicação Mobile para controle de finanças para maior facilidade de organização. Destinada para empresa e para pessoa física.

## Feito por 

Esse Projeto é um projeto Acadêmico realizado na faculdade UNICEUB na máteria de Projeto Integrador I e II :


#### Participantes

- Hélio Delfino Lopes de Alcântara (Back-End)
- Matheus Baptista (Front-End)



#### Professor Orientador

- Sergio Cozzetti Bertoldi de Souza
## Links Importantes

 - [Azure DevOps do Projeto](https://dev.azure.com/SmartExpensesProject/Smart%20Expenses)
 - [Repositorio Back-End](https://github.com/HelioHD/smart-api-projeto)
 - [Repositorio Back-End Login](https://github.com/HelioHD/smartLogin)
 - [Repositorio Front-End](https://github.com/manuteu/smart-expenses-app)


## Tecnologias e Ferramentas

**Front-End:** React-Native

**Back-End:** Node, Express, MySQL, JWT, Bcrypt, Heroku

**Organização:** Azure DevOps, Scrum 


# Api Rest - NodeJs CRUD + Express + Mysql

Api criada para o projeto SmartExpenses utilizando Express, MySQL e NodeJS


## Como usar a API

#### GET 

```http
  GET https://apismartex.herokuapp.com/api/rotas/receita/
  GET https://apismartex.herokuapp.com/api/rotas/despesa/
```

#### POST 

```http
  POST  https://apismartex.herokuapp.com/api/rotas/receita/
```

| Json                 |         
| :--------            |
| {                    | 
| "valor": "2000",     |
| "data": "02122021"   |
|  }                   | 


```http
  POST  https://apismartex.herokuapp.com/api/rotas/despesa/
```

| Json                 |         
| :--------            |
| {                    |   
| "nome": "Arroz",     | 
| "valor": "20",       |
| "tipo": "Alimentação"|
|  }                   | 


## Rodando Localmente

Clone o Projeto ou Baixe

```bash
  git clone https://github.com/HelioHD/smart-api-projeto.git
```

Vá para o diretorio do projeto 

```bash
  cd /api/
```

Instale as dependencias

```bash
  npm install
```

Inicie o Servidor

```bash
  npm start
```


Para reiniciar o Servidor

```bash
  rs
```


Crie os bancos de dados mundando a string de conexão em Config/default.json

```bash
    node C:\apiSmart\api\banco-de-dados\criarTabelas.js
```



