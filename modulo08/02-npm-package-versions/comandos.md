# Comandos npm para criação de pacotes

## Publicar um pacote
npm login
npm publish --access=public

## mudar versão 
# (resolver bug)
npm version patch
# (implementar nova feat)
npm version minor
# (Mudança de código que quebra a funcionalidade - break change)
npm version major
<!-- 
  Quando há uma mudança dessa magnitude por motivos de segurança ao atualizar o pacote, o npm não instala a nova versão, para instalar a versão atual deve-se usar npm i @andersonnascimentoafsn/fluentsql@latest, por exemplo.

  Pode usar npm i @andersonnascimentoafsn/fluentsql@1.x para pegar a última versão 1.
 -->

## Verificar pacotes que precisão ser atualizados
npm outdated

## Atualização de pacotes
npm update
