#!/usr/bin/env node

'use strict';

const fs = require('fs');
const inquirer = require('inquirer');
const ejs = require('ejs');
const chalk = require('chalk');
const slugify = require('underscore.string/slugify');

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
  options.projectName = slugify(options.projectName);
  options.projectTags = options.projectTags ? options.projectTags.split(',') : [];

  console.log(chalk.green.bold('\n>> Starting init your project...\n'));

  const tasks = [];
  // General files
  tasks.push(generateFile('.editorconfig', '_editorconfig'));
  tasks.push(generateFile('.gitignore', '_gitignore'));
  tasks.push(generateFile('.npmrc', '_npmrc'));
  tasks.push(generateFile('.travis.yml', '_travis.yml'));
  tasks.push(generateFile('package.json', '_package.json', options));
  tasks.push(generateFile('LICENSE', 'LICENSE', options));
  tasks.push(generateFile('README.md', 'README.md', options));
  tasks.push(generateFile('test.js', 'test.js'));

  // Specific choose files
  switch (options.projectType) {
    case 'Node':
      tasks.push(generateFile('index.js', 'index.js'));
      break;
    case 'Node CLI':
      tasks.push(generateFile('cli.js', 'cli.js'));
      break;
    default:
  }

  // Start gen files
  Promise.all(tasks).then(() => {
    console.log(chalk.green.bold('\n>> Done! Start coding now bro 7:)\n'));
  });
});

function generateFile(genFileName, tplFileName, options) {
  return new Promise((resolve, reject) => {
    const from = `${__dirname}/templates/${tplFileName}`;
    const to = `${process.cwd()}/${genFileName}`;

    fs.readFile(from, 'utf8', (err, data) => {
      if (err) {
        console.log(`${chalk.red('✘')}  Can't read file ${genFileName}`);
        reject(err);
      }

      const renderedData = ejs.render(data, options);

      fs.writeFile(to, renderedData, err => {
        if (err) {
          console.log(`${chalk.red('✘')}  Can't create ${genFileName}`);
          reject(err);
        }
        console.log(`${chalk.green('✔')}  Created ${genFileName}`);
        resolve();
      });
    });
  });
}
