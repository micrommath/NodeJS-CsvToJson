const Csv = require('./Csv')
const path = require('path')
const papaparse = require('papaparse')
const fs = require('fs')

const pathFileIn = path.resolve('../', 'resources', 'brasil.csv')
const pathFileOut = path.resolve('../', 'resources', 'brasil.json')

var queueRead = []
var isTerminatedRead = false;

var queueParse = []
var isTerminatedParse = false;

var totalLines = -1;

var intervalIdParse = ''
var intervalIdWrite = ''

function read() {
    msgStatus()
    const csv = new Csv()

    csv.readFile(pathFileIn).then((fileRead) => {
        queueRead = queueRead.concat(fileRead.data)
        totalLines = fileRead.length

        isTerminatedRead = true;
    })
}

function parse() {

    intervalIdParse = setInterval(() => {
        msgStatus()
        
        if (queueRead.length > 0 || !isTerminatedRead) {
            let row = queueRead.shift()

            let json = papaparse.parse(row).data

            queueParse.push(json)
        } else {
            isTerminatedParse = true
            clearInterval(intervalIdParse)
        }

    }, 15)
}

function write() {

    intervalIdWrite = setInterval(() => {
        msgStatus()
        
        if (queueParse.length > 0 || !isTerminatedParse) {
            let json = queueParse.shift()

            // console.log(json)

            fs.appendFile(pathFileOut, JSON.stringify(json), { encoding: 'utf8' }, (error) => {
                if (error) throw error
            })

        } else
            clearInterval(intervalIdWrite)

    }, 15)
}

const msgStatus = () => {

    console.clear()

    let obj = {
        totalLinhas: totalLines,
        filas: {
            leitura: queueRead.length,
            conversao: queueParse.length
        },
        status: {
            leituraTerminada: isTerminatedRead,
            conversaoTerminada: isTerminatedParse
        },
    }

    console.log(obj)
}

function main() {
    try {
        read()
        parse()
        write()
    } catch (error) {
        console.error(error)
    }
}

main()