const queues = require('./queue')
const files = require('./files')
const status = require('./status')
const Stopwatch = require('statman-stopwatch');

exports.isTerminatedRead = false;
exports.isTerminatedParse = false;

exports.timeRunningApp = new Stopwatch(true)

exports.timeElapsedRead = 'running'
exports.timeElapsedParse = 'running'
exports.timeElapsedWrite = 'running'

exports.reportStatus = () => {
    console.clear()

    console.log({
        timeRunningApp: status.timeRunningApp.read().toFixed(3) + " milliseconds",
        totalLinesFilesIn: queues.totalLines,
        queues: {
            read: queues.queueRead.length,
            parse: queues.queueParse.length
        },
        status: {
            isTerminatedRead: status.isTerminatedRead,
            isTerminatedParse: status.isTerminatedParse
        },
        files,
        timers: {
            timeElapsedRead: status.timeElapsedRead,
            timeElapsedParse: status.timeElapsedParse,
            timeElapsedWrite: status.timeElapsedWrite
        }
    })
} 