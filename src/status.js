const queues = require('./queue')
const files = require('./files')
const status = require('./status')

exports.isTerminatedRead = false;
exports.isTerminatedParse = false;

exports.reportStatus = () => {
    console.clear()

    console.log({
        totalLines: queues.totalLines,
        queues: {
            leitura: queues.queueRead.length,
            conversao: queues.queueParse.length
        },
        status: {
            isTerminatedRead: status.isTerminatedRead,
            isTerminatedParse: status.isTerminatedParse
        },
        files
    })
}