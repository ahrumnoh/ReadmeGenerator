'use strict';
const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');
inquirer.registerPrompt('recursive', require('./utils/my-inquirer-recursive.js'));
const generateMarkdown = require('./utils/generateMarkdown.js');

// ๐ฉWelcome message
const welcome = [
    {
        type: 'confirm',
        prefix: '\b',
        name: 'welcome',
        message: chalk.cyanBright(`Thank you for executing this ReadMe File Generator! To begin hit 'y' or enter.`),

    },
];

// ๐ฉ Markdown tips
const letsGo = chalk.greenBright(`\n
Generator of README
     MD syntax tips
-------------------------
Bold    **bold text**
Italics *italicized text*       
Links   [title](https://www.example.com)
\n`);

//๐ Success message

const success = chalk.greenBright(`
Successfully it has been Generated! Check yours at Output:README.md
`);

//๐ User questions
const questions = [
    {
        type: 'input',
        name: 'title',
        message: `What is the title of your project?`,
    },
    {
        type: 'input',
        name: 'github',
        message: `What's your GitHub User ID?`,

    },
    {
        type: 'input',
        name: 'email',
        message: `What's your email?`,
        validate: function (value) {
            let pass = value.match(
                /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            );
            if (pass) {
                return true;
            }
            return 'Please enter a valid email address!';
        },
    },
    {
        type: 'input',
        name: 'description',
        message: `Please write a description of your project`,

    },
    {
        type: 'confirm',
        name: 'install',
        message: `Please add any installation notes.`,

    },
    {
        type: 'input',
        name: 'installNotes',
        message: `Please add your installation notes`,
        when: function (answers) {
            return answers.install;
        }
    },
    {
        type: 'confirm',
        name: 'usage',
        message: `Do you want to provide the user's usage, additional information?`,
    },
    {
        type: 'input',
        name: 'usageInfo',
        message: `Please add your usage info`,
        when: function (answers) {
            return answers.usage;
        }
    },
    {
        type: 'confirm',
        name: 'contrib',
        message: `Would you like to add any notes on contributing to the repo?`,
    },
    {
        type: 'input',
        name: 'contribNotes',
        message: `Please add what you want to let a user to know about contributing to the repo`,
        when: function (answers) {
            return answers.contrib;
        }
    },
    {
        type: 'confirm',
        name: 'test',
        message: `Would you like to add instructions for running tests?`,
    },
    {
        type: 'input',
        name: 'testNotes',
        message: `Please add your instructions for running tests`,
        when: function (answers) {
            return answers.test;
        }
    },
    {
        type: 'rawlist',
        name: 'license',
        message: 'Which open source license would you like to use? ',
        choices: ['Apache 2.0', 'BSD 2-Clause', 'BSD 3-Clause', 'GNU AGPLv3.0', 'GNU GPLv2.0', 'GNU GPLv3.0', 'MIT', 'Mozilla Public 2.0'],
    },
    {
        type: 'confirm',
        name: 'credits',
        message: `Would you like to add any credits to the repository?`,
    },
    {
        type: 'input',
        name: 'creditData',
        message: `Please add your additional credits`,
        when: function (answers) {
            return answers.credits;
        }
    },
    {
        type: 'recursive',
        prefix: '\b',
        name: 'moreCredits',
        message: `Would you like to add more credits to the repo?`,
        when: function (answers) {
            return answers.creditData;
        },
        prompts: [
            {
                type: 'input',
                name: 'moreCreditData',
                message: 'Please add your credits',
            },
        ]
    },
];


//๐ป Function to write README file
const writeToFile = (fileName, data) => {
    fs.writeFile(fileName, data, (err) =>
        err ? console.error(err) : console.log(success)
    );
}

//๐ป Function to initialize the generator 

const init = async () => {
    try {
        await inquirer.prompt(welcome);
        console.log(letsGo);
        const data = await inquirer.prompt(questions);
        writeToFile('./output/README.md', generateMarkdown(data));
    } catch (err) {
        console.log(err);
    }
}

//๐ป Function call to initialize program

init();


