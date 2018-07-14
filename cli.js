#!/usr/bin/env node

'use strict';

const chalk = require('chalk');
const slugify = require('underscore.string/slugify');

const pji = require('./data/pji');

pji.getUserInput.then(options => {
  options.projectName = slugify(options.projectName);
  options.projectTags = options.projectTags ? options.projectTags.split(',') : [];

  console.log(chalk.green.bold('\n>> Starting init your project...\n'));

  const tasks = [];
  // General files
  tasks.push(pji.generateFile('.editorconfig', '_editorconfig'));
  tasks.push(pji.generateFile('.gitignore', '_gitignore'));
  tasks.push(pji.generateFile('.npmrc', '_npmrc'));
  tasks.push(pji.generateFile('.travis.yml', '_travis.yml'));
  tasks.push(pji.generateFile('package.json', '_package.json', options));
  tasks.push(pji.generateFile('LICENSE', 'LICENSE', options));
  tasks.push(pji.generateFile('README.md', 'README.md', options));
  tasks.push(pji.generateFile('test.js', 'test.js'));

  // Specific choose files
  switch (options.projectType) {
    case 'Node':
      tasks.push(pji.generateFile('index.js', 'index.js'));
      break;
    case 'Node with CLI':
      tasks.push(pji.generateFile('cli.js', 'cli.js'));
      break;
    default:
  }

  // Start gen files
  Promise.all(tasks).then(() => {
    console.log(chalk.green.bold('\n>> Done! Start coding now bro 7:)'));
  });
});
