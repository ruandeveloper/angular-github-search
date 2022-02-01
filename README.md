# Angular GitHub Search

## 🎨 Prototipagem

-   Prototipagem feita atráves do Figma
-   Layout inspirado no GitHub

[Figma](https://www.figma.com/file/Kx6wgIcIUYxVe8IuGXpIah/Github-Search?node-id=0%3A1)

## ✨ Tecnologias

-   Angular
-   TypeScript
-   RXJs
-   GraphQL
-   Sass/Scss

## 🚀 Como executar?

-   Baixe as dependencias `npm i`

### Variáveis de ambiente

-   Crie um arquivo `.env` na raiz do projeto
-   Adicione a variável `GITHUB_TOKEN=abc`, substituindo `abc` pelo seu personal token do github (necessário, os scopes: user:read, user:email)
-   Se estiver no windows, configure o npm para executar arquivos sh: `npm config set script-shell "C:\\Program Files\\Git\\bin\\bash.exe"`
-   Ao executar `npm run env-set` ou `npm start`, será criado o arquivo `env-config.js` na pasta assets, setando essa variável na variável window

-   Execute a aplicação com `npm start`
