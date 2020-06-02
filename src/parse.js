const queues = require('./queue')
const status = require('./status')
const papaparse = require('papaparse')

const Stopwatch = require('statman-stopwatch');

class Parse {
    parse() {

        const stopwatch = new Stopwatch(true)

        let intervalIdParse = setInterval(() => {
            status.reportStatus()

            if (queues.queueRead.length > 0 || !status.isTerminatedRead) {
                if (queues.queueRead.length > 0) {
                    let row = queues.queueRead.shift()

                    let json = papaparse.parse(row).data

                    queues.queueParse.push(json)
                }
            } else {
                status.isTerminatedParse = true
                status.timeElapsedParse = stopwatch.stop().toFixed(3) + " milliseconds"
                clearInterval(intervalIdParse)
            }

        }, 20)
    }
}

module.exports = Parse