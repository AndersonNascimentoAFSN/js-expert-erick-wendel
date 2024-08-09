# Task Checklist

- [] creates `src` main folder if it not exists
- [] creates `repository` layer
- [] creates `service` layer with `repository as dependency`
- [] creates `factory` layer with `service` and `repository` return its instances
- [] can create multiples domains with a single command
- [] saves files as `camelCase` and classes as `PascalCase`
- [] reaches **100% test coverage**
- [] integration tests should validate files on disk as a valid JS class


<!-- Criar um executável no S.O -->
# No package.json adicionar:
<!-- 
  "bin": {
      "codegen": "./src/index.js"
  }
-->
npm link
npm unlink -g @andersonnascimentoafsn/aula01
