# 🔐 PassManager
---

<h1 align="center"><img src="https://img.icons8.com/clouds/2x/password-window.png"/></h1>

<h1 align="center">🔒 PassManager - API 🔓</h1>
<p align="center"><strong>API para gerenciamento de senhas feita com node e express.</strong></p>

<br>

A API foi desenvolvida com a intenção de passar em um teste, conforme proposto no teste todos os dados quando alterados são salvos em um arquivo json <strong>"data.json"</strong> que fica localizado na raiz do projeto.

<br>

<h1 align="center">O que foi proposto no TESTE</h1>
<h2>Criar API RESTFUL usando nodejs express</h2>
- Criar 4 endpoints GET/POST/PUT/DELETE

<h2>Premissas</h2>
- Salvar (email, senha)
- Cada usuário deverá ter um ID único
- Gravar as informações arquivo JSON.

<h2>Documentação</h2>


HTTP | ROUTE | BODY | DESCRIÇÃO |
--- | ------ | ------ |  ------ |
GET | /api/v1/users | | Listar todos usuarios
GET | /api/v1/users/user_id | | Listar único usuário
POST | /api/v1/users | JSON (email,senha) | Criar único usuário
PUT | /api/v1/users/user_id | JSON (email,senha) | Alterar único usuário
DELETE | /api/v1/users | | Deletar todos usuarios
DELETE | /api/v1/users/user_id | | Deletar único usuário

<br>
<br>
<br>

# 🎮 Modo de uso
---

<h1 align="center">🧑‍💻 Rodando a API </h1>

<h2>Clone este repositório</h2>

```bash
$ git clone https://github.com/caiopratali/passmanager-api-node
```


<h2>Acesse a pasta do projeto no terminal/cmd</h2>

```bash
$ cd passmanager-api-node
```


<h2>Abra o projeto no vscode</h2>

```bash
$ code .
```


<h2>Instale as dependências</h2>

```bash
$ yarn
```


<h2>Execute a aplicação em modo de desenvolvimento</h2>

```bash
$ yarn dev
```

<h2>O servidor inciará na porta:3333</h2>

```bash
http://localhost:3333/api/v1
```

<br>
<br>
<br>

## 🎯 Métodos
---

<h1 align="center">🪧 Rotas da API </h1>


### GET - Listas um ou mais usuários

http://localhost:3333/api/v1/users

http://localhost:3333/api/v1/users/user_id


<h5>Possiveis retornos (STATUS CODE):</h5>
<h5>200 - SUCESSO</h5>

<h5>400 - ERRO</h5>
Usuário não encontrado

```json
  "message": "User not found"
```

### POST - Criar um usuário

http://localhost:3333/api/v1/users

exemplo de requisição:

```json
{
	"email": "caio@pratalli.com.br",
	"password": "1234"
}
```

<h5>Possiveis retornos (STATUS CODE):</h5>

<h5>201 - USUÁRIO CRIADO COM SUCESSO</h5>

<h5>400 - ERROS</h5>

Preencha os campos

```json
  "message": "Please fill in the fields!"
```
Entre com o e-mail (Obrigatorio)

```json
  "message": "Enter an email!"
```
Entre com uma senha (Obrigatorio)

```json
  "message": "Enter a password!"
```

### PUT - Editar um usuário

http://localhost:3333/api/v1/users/user_id	

exemplo de requisição:

```json
{
	"email": "oi@pratalli.com.br"
}
```

<h5>Possiveis retornos (STATUS CODE):</h5>
<h5>200 - SUCESSO</h5>

<h5>400 - ERRO</h5>
Usuário não encontrado

```json
  "message": "User not found!"
```

Preencha o campo que você deseja alterar!

```json
  "message": "Please fill in the field you want to change!"
```

### DELETE - Excluir um usuário ou todos

http://localhost:3333/api/v1/users

http://localhost:3333/api/v1/users/user_id

<h5>Possiveis retornos (STATUS CODE):</h5>
<h5>200 - SUCESSO</h5>

<h5>400 - ERRO</h5>
Usuário não encontrado

```json
  "message": "User not found!"
```

<br>
<br>
<br>

# 😉 Maneira facil de testar
---

<h5>Caso você queira efetuar os testes no insomnia, ao clonar o repositorio você pode importar o projeto no insomnia, deixei um arquivo json que exportei dos meus testes para facilitar.</h5>

<h5>Diretório:</h5>

```
passmanager-api-node/Insomnia_2021-07-06.json
```
<img style="border-radius: 10px;" src="https://lh3.googleusercontent.com/tun3GfY0fAu5o2US8b3iPfEcRSKg6Jn15rH73YOX-wXD0eH6B8ZxyS-QjT4KWP5Yx5tE9mgEaKDZIOqdSAFcSlqQHQqqApWoNEk3OTLFKirWZzqN1uFqaAXEbY_83hvVHseMtUj4chG8pRRhTZvzdOtuow1ecL9lbtsKuASZcl_DJvGQ6c3-qE9qGS5DdIg0XrVJohOCxQRb5IL_UDKRYr0VjbUIt6X5QerhtV9yW_eEj1rEVWTysGrcz5fKGBAViNlAejuktytZ5GBMPAJMr7u1SfVhdRz7qJIite1Pa2Dxy2cPfctvgpLFNDoW0avyplRL2mok4gMjAFOhsqUM53H7iMQ8p4XcmrQl69ztscLQP8K0BOl31ZmVo3XXxS6HUEERuLgAtTGp2JuP7kYVYf8_4KV3eqQhiJp7-DrdmTmrCvVNfrX0g75Ua9bxgygu25oDe70k8hnoF-yidF1KUmB18FDSMWniB6eyX-VrZTZMBcl2Y10y2c6Bpdo3r820KNCgiiSk22bIblSWPo1W6s4rDTbPYCq6QAZ6rTt2u_B1O_xcKL91zOcY66ZergjH7esFzKowqIPxBGjEOntHBOYLeICzCoAJieTJZ4z3syZ9c90xJwQBXvsUO_RnQTdatzBu9hOfYEhCi0F_NpwJjyM1tu9IFAKr_zppFdO69P-4DtxhoJAFylGV9ke9Yv4tjhQwNgUJ42nxVHLUfbhlEih7=w1362-h646-no?authuser=0"/>

<br>
<br>
<br>

# 🚀 Tecnologias
---

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)

<br>
<br>
<br>

# 📝 Autor

---

<a href="https://github.com/caiopratali">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/10279814?v=4" width="100px;" alt=""/></a>

<a href="https://github.com/caiopratali"><h4>Caio Pratali 🚀</h4></a>



Feito com ❤️ por Caio Pratali 👋🏽 Entre em contato!