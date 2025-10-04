# Angular GitHub Search

Project where I was challenged to create an application that consumes the GitHub user and repository search API using Angular.

## 🎨 Prototyping

* Prototyping done using Figma
* Layout inspired by GitHub

[Figma](https://www.figma.com/file/Kx6wgIcIUYxVe8IuGXpIah/Github-Search?node-id=0%3A1)

## ✨ Technologies

* Angular
* TypeScript
* RXJs
* GraphQL
* Sass/Scss

## 🚀 How to run?

* Install dependencies with `npm i`

### Environment variables

* Create a `.env` file in the project root

* Add the variable `GITHUB_TOKEN=abc`, replacing `abc` with your personal GitHub token (required scopes: `user:read`, `user:email`)

* If you’re on Windows, configure npm to run shell scripts:
  `npm config set script-shell "C:\\Program Files\\Git\\bin\\bash.exe"`

* When you run `npm run env-set` or `npm start`, a file called `env-config.js` will be created inside the `assets` folder, setting this variable in the window object

* Run the application with `npm start`
