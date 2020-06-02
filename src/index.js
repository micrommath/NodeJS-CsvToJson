const Read = require('./read')
const Parse = require('./parse')
const Write = require('./write')

function main() {
    try {
        let reader = new Read()
        let parser = new Parse()
        let writter = new Write()

        reader.read()
        parser.parse()
        writter.write()

        //write()
    } catch (error) {
        console.error(error)
    }
}

main()