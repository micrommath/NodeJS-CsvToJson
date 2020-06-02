const queues = require('./queue')
const status = require('./status')
const papaparse = require('papaparse')

class Parse {
    parse() {

        let intervalIdParse = setInterval(() => {
            status.reportStatus()

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
}

module.exports = Parse