import knex from 'knex'

export default class PostgresStrategy {
  #instance

  constructor(connectionString) {
    this.connectionString = connectionString
    this.table = "warriors"
  }

  async connect() {
    this.#instance = knex({
      client: 'pg',
      connection: this.connectionString,
      pool: {                      // Configurações do pool de conexões
        min: 2,                    // Número mínimo de conexões no pool
        max: 10,                   // Número máximo de conexões no pool
        idleTimeoutMillis: 5000,   // Tempo em milissegundos que uma conexão deve ficar inativa antes de ser fechada
        createTimeoutMillis: 10000, // Tempo máximo, em milissegundos, para esperar pela criação de uma nova conexão
        acquireTimeoutMillis: 10000, // Tempo máximo, em milissegundos, para adquirir uma conexão existente do pool
        propagateCreateError: true // Se true, os erros na criação da conexão serão propagados imediatamente
      }
    })

    return this.#instance.raw('select 1+1 as result')
  }

  async create(item) {
    return this.#instance.insert(item).into(this.table)
  }

  async read(item) {
    return this.#instance.select(item).from(this.table)
  }
}