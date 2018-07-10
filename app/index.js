#!/usr/bin/env node

'use strict';

const fs = require('fs');
const inquirer = require('inquirer');
const ejs = require('ejs');
const chalk = require('chalk');
// Const underscoreString = require('underscore.string');

const menu = require('./menu.js');

const getUserInfo = new Promise(resolve => {
  inquirer.prompt(menu.chooses).then(chooseResponse => {
    inquirer.prompt(menu.inputs).then(inputResponse => {
      const response = {...chooseResponse, ...inputResponse};
      resolve(response);
    });
  });
});

getUserInfo.then(options => {
  generateFile('.gitignore', options, '_gitignore');
  generateFile('.npmrc', options);
  generateFile('.travis.yml', options);
  generateFile('index.js', options);
  generateFile('test.js', options);
  generateFile('LICENSE', options);
  generateFile('README.md', options);
});

function generateFile(genFileName, options, tplFileName) {
  tplFileName = tplFileName ? tplFileName : genFileName;

  const from = `${__dirname}/templates/${tplFileName}`;
  const to = `${process.cwd()}/${genFileName}`;

  fs.readFile(from, 'utf8', (err, data) => {
    if (err) {
      console.log(chalk.red(`✘ Can't read file ${genFileName}`));
      throw err;
    }

    const renderedData = ejs.render(data, options);

    fs.writeFile(to, renderedData, err => {
      if (err) {
        console.log(chalk.red(`✘ Can't create ${genFileName}`));
        throw err;
      }
      console.log(chalk.green(`✔ Created ${tplFileName}`));
    });
  });
}
