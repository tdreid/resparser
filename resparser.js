#!/usr/bin/env node

'use strict';

const fs = require('fs');
const readline = require('readline');

const resparser = require('commander');
const running_version = require('./package.json').version;

resparser
    .version(running_version, '-v, --version')
    .option('-d, --delimiter <delimiter>', 'specify a delimiter', ',')
    .option('-n, --fields <fields>', 'specify how many fields each record should contain', 3)
    // ('-h, --help' option is built-in by commander)
    .arguments('[path]')
    .action(async path => {
        path = path ? path : await getUserInput('\nWhere is the file located?\n');
        
        if(!resparser.delimiter) resparser.delimiter = 
            await getUserInput("\nWhat is the field delimiter? (Enter '\\t' for tabs.)\n");

        if(!resparser.fields) resparser.fields = 
            await getUserInput("\nHow many fields should each record contain?\n");            

        parseFile(path, resparser.delimiter, resparser.fields);
    })
    .parse(process.args);

async function getUserInput(prompt) {
    const userInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve => userInterface.question(prompt, reply => {
        userInterface.close();
        resolve(reply);
    }))
}

function parseFile(path, delimiter, fieldCount) {
    console.log(`\nPATH: ${path} \nDELIMITER:'${delimiter}' \nFIELDS: ${fieldCount}`);

    const processingInterface = readline.createInterface({
        input: fs.createReadStream(path),
        console: false
    });    
 
    let isFirstLine = true;

    const correctLines = [];
    const incorrectLines = [];

    processingInterface.on('line', line => {
        if(isFirstLine){
            isFirstLine = false;
            return;
        }
        if(line.split(delimiter).length == fieldCount)
        {
            correctLines.push(line);
        } else {
            incorrectLines.push(line);
        }
    }).on('close', () => {
        if (correctLines.length > 0) writeToFile(correctLines, "correct");
        if (incorrectLines.length > 0) writeToFile(incorrectLines, "incorrect");
    }); 
}

function writeToFile(payload, filename) {
    let writeStream = fs.createWriteStream(`${filename}.txt`);
    writeStream.on('error', function(err) { 
        console.log(`An error occurred writing to a file: ${err}`);
    });
    payload.forEach(p => { writeStream.write(`${p}\n`); });
    writeStream.end();    
}