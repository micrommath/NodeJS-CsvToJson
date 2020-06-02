const fs = require('fs')

const queues = require('./queue')
const status = require('./status')
const files = require('./files')

const Stopwatch = require('statman-stopwatch');

class Write {
    write() {

        const stopwatch = new Stopwatch()
        stopwatch.start()

        let intervalIdWrite = setInterval(() => {
            status.reportStatus()

            if (queues.queueParse.length > 0 || !status.isTerminatedParse) {
                if (queues.queueParse.length > 0) {

                    let json = queues.queueParse.shift()

                    fs.appendFile(files.pathFileOut, JSON.stringify(json), { encoding: 'utf8' }, (error) => {
                        if (error) throw error
                    })
                }
            } else {                
                status.timeElapsedWrite = stopwatch.stop().toFixed(3) + " milliseconds"
                status.timeRunningApp.stop()
                status.reportStatus()
                clearInterval(intervalIdWrite)
            }
        }, 0)
    }
}

module.exports = Write