const Csv = require('./Csv')
const path = require('path')
const papaparse = require('papaparse')
const fs = require('fs')
const queues = require('./queue')
const files = require('./files')
const status = require('./status')

var intervalIdParse = ''
var intervalIdWrite = ''

function read() {
    msgStatus()
    const csv = new Csv()

    csv.readFile(files.pathFileIn)
        .then((fileRead) => {
            queues.queueRead = queues.queueRead.concat(fileRead.data)
            queues.totalLines = fileRead.length

            status.isTerminatedRead = true;
        })
        .catch((err) => {
            throw err
        })
}

function parse() {

    intervalIdParse = setInterval(() => {
        msgStatus()

        if (queues.queueRead.length > 0 || !status.isTerminatedRead) {
            let row = queues.queueRead.shift()

            let json = papaparse.parse(row).data

            queues.queueParse.push(json)
        } else {
            status.isTerminatedParse = true
            clearInterval(intervalIdParse)
        }

    }, 20)
}

function write() {

    intervalIdWrite = setInterval(() => {
        msgStatus()

        if (queues.queueParse.length > 0 || !status.isTerminatedParse) {
            let json = queues.queueParse.shift()

            // console.log(json)

            fs.appendFile(files.pathFileOut, JSON.stringify(json), { encoding: 'utf8' }, (error) => {
                if (error) throw error
            })

        } else
            clearInterval(intervalIdWrite)

    }, 0)
}

const msgStatus = () => {
    console.clear()

    console.log({
        totalLines: queues.totalLines,
        queues: {
            leitura: queues.queueRead.length,
            conversao: queues.queueParse.length
        },
        status,
        files       
    })
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