const files = require('./files')
const queues = require('./queue')
const status = require('./status')
const Stopwatch = require('statman-stopwatch');


const Csv = require('./csv')

class Read {

    read() {
        status.reportStatus()
        const csv = new Csv()
        const stopwatch = new Stopwatch(true)

        csv.readFile(files.pathFileIn)
            .then((fileRead) => {
                queues.queueRead = queues.queueRead.concat(fileRead.data)
                queues.totalLines = fileRead.length

                status.isTerminatedRead = true
                status.timeElapsedRead =  stopwatch.stop().toFixed(3)
            })
            .catch((err) => {
                throw err
            })
    }
}
module.exports = Read