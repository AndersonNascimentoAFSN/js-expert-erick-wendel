import Benchmark from "benchmark"

import CartRemPropOld from './cart-rm-prop-old.js'
import CartRemPropNew from './cart-rm-prop-new.js'

const suite = new Benchmark.Suite;

const data = {
  products: [
    {
      id: 'ae',
      n: undefined,
      abc: undefined,
      a: null,
      b: 123
    },
    {
      id: 'ae',
      n: undefined,
      abc: undefined,
      a: null,
      b: 123
    },
  ]
}

suite
  .add('Cart#rmEmptyPropsMapReduce', function () {
    new CartRemPropOld(data)
  })
  .add('Cart#rmEmptyPropsFor', function () {
    new CartRemPropNew(data)
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({
    'async': true
  })