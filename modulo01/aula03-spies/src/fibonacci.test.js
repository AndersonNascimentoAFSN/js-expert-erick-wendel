const Fibonacci = require('./fibonacci')
const sinon = require('sinon')
const assert = require('assert')

  // Fibonacci: O próximo valor correspondente à somo dos valores anteriores
  // Dado 3
  // 0,1,1
  // dado 5
  // 0,1,1,2,3

  ; (async () => {
    {
      const fibonacci = new Fibonacci()
      const spy = sinon.spy(fibonacci, 'execute')

      const expectedCallCount = 4

      for await (const i of fibonacci.execute(3)) { }

      assert.deepStrictEqual(spy.callCount, expectedCallCount)
    }
    {
      const fibonacci = new Fibonacci()
      const spy = sinon.spy(fibonacci, 'execute')
      const [...results] = fibonacci.execute(5)

      //  Execução [0] input = 5 current = 0, next = 1
      //  Execução [1] input = 4 current = 1, next = 1
      //  Execução [2] input = 3 current = 1, next = 2
      //  Execução [3] input = 2 current = 2, next = 3
      //  Execução [4] input = 1 current = 3, next = 4
      //  Execução [5] input = 0 -> PARA

      const { args } = spy.getCall(2)
      const expectResult = [0, 1, 1, 2, 3]
      const expectedParams = Object.values({
        input: 3,
        current: 1,
        next: 2
      })

      assert.deepStrictEqual(args, expectedParams)
      assert.deepStrictEqual(results, expectResult)
    }
  })()