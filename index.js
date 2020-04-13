const yargs = require('yargs')

const {
    globalStats,
    getCountryStats
} = require('./src/cli')

const countries = require('./src/countries')


yargs.command({
    command: '$0',
    describe: 'cli-covid19 will get global stats by default',
    handler: function (argv) {
        globalStats()
    }
})

yargs.command({
    command: 'codes',
    describe: 'Show all country codes',
    handler: function (argv) {
        console.log(countries)
    }
})

yargs.command({
    command: "list",
    describe: "List all countries or by country code",
    builder: {
        all: {
            describe: 'list all countries',
            type: "string",
        },
        c: {
            describe: 'get country stats',
        },
        t: {
            describe: 'get country timeline',
        }
    },
    handler: function (argv) {
        if (argv.all !== undefined) {
            getCountryStats('all')
        } else if(argv.c) {
            getCountryStats(argv.c)
        } else if(argv.t) {
            if (argv.t === true) {
                console.error('Missed country code!')
                return
            }
            getCountryStats(argv.t, 'timeline')
        }
    }
});


yargs.parse();
