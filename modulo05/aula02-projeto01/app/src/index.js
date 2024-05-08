'use strict';

const {readFile} = require('fs/promises');
const {join} = require('path');
const pdf = require('pdf-parse');

;(async () => {
  const dataBuffer = await readFile(join(__dirname, './../../../docs/contrato.pdf'));
  const data = await pdf(dataBuffer)
  // data.text.split('\n').forEach(line => {
  //   console.log(line);
  // })
  console.log('data', data.text);
})()