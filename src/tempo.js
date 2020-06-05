const fs = require('fs')
const files = require('./files')

class Times {

    writeTimes(read, parse, write) {
        let timeCsv = `${read};${parse};${write}\n`

        fs.appendFileSync(files.pathFileTimes, timeCsv, { encoding: 'utf8' }, (error) => {
            if (error) throw error
        })

    }

    calculateTimes() {
        let timesCsv = fs.readFileSync(files.pathFileTimes, { encoding: 'utf8' })

        let timesArr = timesCsv.split(/\n/g)

        let readArr = timesArr.map(data => parseFloat(data.split(';')[0]))
        let parseArr = timesArr.map(data => parseFloat(data.split(';')[1]))
        let writeArr = timesArr.map(data => parseFloat(data.split(';')[2]))

        let readMin = 500000,
            readAvg = 0,
            readMax = -1.0

        let parseMin = 500000,
            parseAvg = 0,
            parseMax = -1

        let writeMin = 500000,
            writeAvg = 0,
            writeMax = -1

        for (const data of readArr) {

            if (isNaN(data))
                continue

            if (data < readMin)
                readMin = data

            if (data > readMax)
                readMax = data

            readAvg += parseFloat(data)
        }
        readAvg /= (readArr.length - 1)

        for (const data of parseArr) {

            if (isNaN(data))
                continue

            if (data < parseMin)
                parseMin = data

            if (data > parseMax)
                parseMax = data

            parseAvg += parseFloat(data)
        }
        parseAvg /= (parseArr.length - 1)

        for (const data of writeArr) {

            if (isNaN(data))
                continue

            if (data < writeMin)
                writeMin = data

            if (data > writeMax)
                writeMax = data

            writeAvg += parseFloat(data)
        }
        writeAvg /= (writeArr.length - 1)

        let times = [
            `${readMin};${readAvg.toFixed(3)};${readMax}`,
            `${parseMin};${parseAvg.toFixed(3)};${parseMax}`,
            `${writeMin};${writeAvg.toFixed(3)};${writeMax}`
        ]

        this.showTime(times)

        return times
    }

    showTime(times) {

        console.log({
            read: {
                min: times[0].split(';')[0],
                avg: times[0].split(';')[1],
                max: times[0].split(';')[2]
            },
            parse: {
                min: times[1].split(';')[0],
                avg: times[1].split(';')[1],
                max: times[1].split(';')[2]
            },
            write: {
                min: times[2].split(';')[0],
                avg: times[2].split(';')[1],
                max: times[2].split(';')[2]
            }
        })
    }
}

module.exports = Times