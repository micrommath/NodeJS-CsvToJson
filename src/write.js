const fs = require('fs')

const queues = require('./queue')
const status = require('./status')
const files = require('./files')

class Write {

    write() {

        let intervalIdWrite = setInterval(() => {
            status.reportStatus()

            if (queues.queueParse.length > 0 || !status.isTerminatedParse) {
                let json = queues.queueParse.shift()

                fs.appendFile(files.pathFileOut, JSON.stringify(json), { encoding: 'utf8' }, (error) => {
                    if (error) throw error
                })

            } else
                clearInterval(intervalIdWrite)

        }, 0)
    }
}

module.exports = Write