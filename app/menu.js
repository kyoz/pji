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
      name: 'name',
      message: 'Project name:',
      default: 'test'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description:'
    },
    {
      type: 'input',
      name: 'version',
      message: 'Version:',
      default: '0.1.0'
    },
    {
      type: 'input',
      name: 'tags',
      message: 'Tags:'
    },
    {
      type: 'input',
      name: 'author_name',
      message: 'Author name:'
    },
    {
      type: 'input',
      name: 'author_email',
      message: 'Author email:'
    },
    {
      type: 'input',
      name: 'git_repo',
      message: 'Git repository:'
    }
  ]
};
