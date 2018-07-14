'use strict';

const fs = require('fs');
const ejs = require('ejs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const npmCurrentUser = require('npm-current-user');
const userInfo = require('user-info');
const ora = require('ora');

const getTemplatePath = tplFileName => `${__dirname}/templates/${tplFileName}`;
const getDestinationPath = genFileName => `${process.cwd()}/${genFileName}`;
const menu = require('./menu.js');

module.exports.generateFile = (genFileName, tplFileName, options) => {
  return new Promise((resolve, reject) => {
    fs.readFile(getTemplatePath(tplFileName), 'utf8', (err, data) => {
      if (err) {
        console.log(`${chalk.red('✘')}  Can't read file ${genFileName}`);
        reject(err);
      }

      const renderedData = ejs.render(data, options);

      fs.writeFile(getDestinationPath(genFileName), renderedData, err => {
        if (err) {
          console.log(`${chalk.red('✘')}  Can't create ${genFileName}`);
          reject(err);
        }

        if (genFileName !== 'index.js' && genFileName !== 'cli.js') {
          console.log(`${chalk.green('✔')}  Created ${genFileName}`);
          resolve();
        } else {
          fs.chmod(getDestinationPath(genFileName), '0700', err => {
            if (err) {
              console.log(`${chalk.red('✘')}  Can't add execute permission for ${genFileName}`);
              reject(err);
            }

            console.log(`${chalk.green('✔')}  Created ${genFileName}`);
            resolve();
          });
        }
      });
    });
  });
};

module.exports.getUserInput = new Promise(resolve => {
  const spinner = ora('Getting npm user info. Please wait...').start();
  const inputs = [...menu.inputs];
  spinner.color = 'blue';

  npmCurrentUser().then(npmUserInfo => {
    spinner.stop();
    console.log('');

    // Get npm user info as default intput
    if (npmUserInfo) {
      const githubUser = menu.inputs.filter(d => d.name === 'githubUser')[0];
      const authorName = menu.inputs.filter(d => d.name === 'authorName')[0];
      const authorEmail = menu.inputs.filter(d => d.name === 'authorEmail')[0];

      githubUser.default = npmUserInfo.github ? npmUserInfo.github : 'github_user';
      authorName.default = userInfo().username;
      authorEmail.default = npmUserInfo.email ? npmUserInfo.email : 'author@gmail.com';
    }

    inquirer.prompt(menu.chooses).then(chooseResponse => {
      inquirer.prompt(inputs).then(inputResponse => {
        const response = {...chooseResponse, ...inputResponse};
        resolve(response);
      });
    });
  });
});
