# Desafio técnico Warmy

### API de tarefas construída para o teste técnico da Warmy

## Requisitos para executar o projeto

- [Docker](https://www.docker.com/) e [Docker compose](https://docs.docker.com/compose/gettingstarted/)
- [Node.js](https://nodejs.org/en)

## Como executar o projeto

1. Duplique o arquivo **.env.example**, o renomeie para **.env** e preencha as informações:

- PORT: Porta que o servidor irá escutar  
  ex: 3000
- DATABASE_URL: A string de conexão com o DB postgres.
  Ver referência no arquivo .env.example.
- POSTGRES_DB: Nome do banco
- POSTGRES_USER: Usuário do banco
- POSTGRES_PASSWORD: Senha do banco

Exemplo de configuração de .env:

```
PORT=3000
DATABASE_URL="postgresql://root:example@localhost:5430/task-api?schema=public"
POSTGRES_DB=task-api
POSTGRES_USER=root
POSTGRES_PASSWORD=example
```

2. Através da linha de comando, na raíz do projeto execute:

   `npm install`

3. Após, execute `npm run start:dev`

## Documentação da API

<strong>Atenção: Caso use uma porta diferente da 3000 certifique-se de ir no arquivo swagger.json na raíz do projeto e mudar a url dentro da propriedade "servers" para ter acesso a documentação da api </strong>

Com o projeto executando (passos acima), abra seu navegador e visite a url:

`http://localhost:[PORT]/api-docs`

## Pequenas considerações

1. Foquei em construir as funcionalidades pedidas e cobrir o controller e service com testes unitários
2. Adicionei validação básica nos endpoints POST e PUT
3. Se fosse num projeto real eu adicionaria testes de integração e e2e, além de testar e documentar a validação, mas não tive tempo pra fazer isso
4. Foi divertido e enriquecedor fazer esse desafio, aprendi muitas coisas fazendo ele =)
