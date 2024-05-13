export default class Marketing {
  // Importante lembrar que o [update] é responsável por gerenciar seus erros/exceptions. Não deve-se ter await no notify porque a responsabilidade do nofity é só emitir eventos. A sua utilidade é notificar os observadores.
  update({ id, userName }) {
    console.log(`[${id}]: [marketing] will send an welcome email to [${userName}]`);
  }
}