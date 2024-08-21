import Benchmark from "benchmark"

import CartIdNew from './cart-id-new.js'
import CartIdOld from './cart-id-old.js'

const suite = new Benchmark.Suite;

suite
  .add('Cart#CartIdUUID', function () {
    new CartIdOld()
  })
  .add('Cart#CartIdCrypto', function () {
    new CartIdNew()
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run()