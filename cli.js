#!/usr/bin/env node

'use strict';

const fs = require('fs');
const inquirer = require('inquirer');
const menu = require('./app/menu.js');

const getUserInfo = new Promise(resolve => {
  inquirer.prompt(menu.chooses).then(chooseResponse => {
    inquirer.prompt(menu.inputs).then(inputResponse => {
      const response = {...chooseResponse, ...inputResponse};
      resolve(response);
    });
  });
});

getUserInfo.then(res => {
  console.log(res);
  fs.writeFile('hihi', `${res}`, err => {
    if (err) {
      throw err;
    }
    console.log('Saved!');
  });
});
