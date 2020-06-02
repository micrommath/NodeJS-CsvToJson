const files = require('./files')
const queues = require('./queue')
const status = require('./status')

const Csv = require('./csv')

class Read {
    read() {
        status.reportStatus()
        const csv = new Csv()
    
        csv.readFile(files.pathFileIn)
            .then((fileRead) => {
                queues.queueRead = queues.queueRead.concat(fileRead.data)
                queues.totalLines = fileRead.length
    
                status.isTerminatedRead = true
            })
            .catch((err) => {
                throw err
            })
    }
}
module.exports = Read