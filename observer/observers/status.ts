export class Status {
  // private status: string

  // Importante lembrar que o [update] é responsável por gerenciar seus erros/exceptions. Não deve-se ter await no notify porque a responsabilidade do nofity é só emitir eventos. A sua utilidade é notificar os observadores.
  update(data: { label: string; value: string }) {
    console.log('text', data)
    // this.status = text
  }
}
