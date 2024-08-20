import Benchmark from "benchmark"

import CartPriceOld from './cart-price-old.js'
import CartPriceNew from './cart-price-new.js'

import database from '../../database.js'

const suite = new Benchmark.Suite;

suite
  .add('Cart#calcPriceMapReduce', function () {
    new CartPriceOld(database)
  })
  .add('Cart#calcPriceFor', function () {
    new CartPriceNew(database)
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