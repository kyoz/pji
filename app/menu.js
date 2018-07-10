#!/usr/bin/env node

'use strict';

module.exports = {
  chooses: [
    {
      type: 'list',
      name: 'type',
      message: 'Choose project type ?',
      choices: [
        'Node',
        'Node CLI'
      ]
    },
    {
      type: 'list',
      name: 'license',
      message: 'Choose license ?',
      choices: [
        'MIT',
        'Apache 2.0',
        'GNU GPLv3',
        'No License'
      ]
    }
  ],
  inputs: [
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: 'test'
    },
    {
      type: 'input',
      name: 'projectDescription',
      message: 'Description:',
      default: 'Project description'
    },
    {
      type: 'input',
      name: 'projectVersion',
      message: 'Version:',
      default: '0.1.0'
    },
    {
      type: 'input',
      name: 'projectTags',
      message: 'Tags:',
      default: 'plugin, node, module, node_module'
    },
    {
      type: 'input',
      name: 'githubUser',
      message: 'Github user :'
    },
    {
      type: 'input',
      name: 'authorName',
      message: 'Author name:',
      default: 'author'
    },
    {
      type: 'input',
      name: 'authorEmail',
      message: 'Author email:',
      default: 'author@gmail.com'
    }
  ]
};
