const fs = require('fs')

class Csv {

    readFile(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) reject(err)                                

                const dataArr = data.split(/\n/g)

                resolve({
                    data: dataArr,
                    length: dataArr.length
                })

            })

        })
    }

}

module.exports = Csv