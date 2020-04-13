const fetch = require('node-fetch');
const Table = require('cli-table');
const moment = require('moment');

const api = require('./config');
const head = require('./table-heads');
const countries = require('./countries')

const globalStats = async () => {
    
    const { results } = await fetch(api.base.globalStats).then(resp => resp.json())

    const table = new Table(head.globalStats)

    if (results.length > 0) {

        const returnedValues = results[0]
        
        const tableValues = Object.values(returnedValues).slice(0, 9).map(value => {
            return new Intl.NumberFormat().format(value)
        })

        table.push(tableValues)
    }

    console.log(table.toString())

}

const getAllCountries = async () => {
    const { countryitems } = await fetch(api.base.allCountries).then(resp => resp.json())

    const table = new Table(head.allCountries)

    const formatter = new Intl.NumberFormat()

    if (countryitems.length > 0) {

        const returnedValues = countryitems[0]

        let allCases = 0;
        let allRecovered = 0;
        let allUnresolved = 0;
        let allDeaths = 0;
        let allNewCasesToday = 0;
        let allNewDeathsToday = 0;
        let allActiveCases = 0;
        let allSeriousCases = 0;

        const tableValues = Object.keys(returnedValues).map(keys => {

            const { 
                title, total_cases, total_recovered,
                total_unresolved, total_deaths, total_new_cases_today,
                total_new_deaths_today, total_active_cases, total_serious_cases
            } = returnedValues[keys]

            if (total_cases !== undefined) {
                allCases += total_cases;
                allRecovered += total_recovered;
                allUnresolved += total_unresolved;
                allDeaths += total_deaths;
                allNewCasesToday += total_new_cases_today;
                allNewDeathsToday += total_new_deaths_today;
                allActiveCases += total_active_cases;
                allSeriousCases += total_serious_cases;
            }

            return [
                title,
                formatter.format(total_cases),
                formatter.format(total_recovered),
                formatter.format(total_unresolved),
                formatter.format(total_deaths),
                formatter.format(total_new_cases_today),
                formatter.format(total_new_deaths_today),
                formatter.format(total_active_cases),
                formatter.format(total_serious_cases),
            ]
        })

        tableValues.push(
            head.allCountries.footer,
            [
                'Total', 
                formatter.format(allCases), formatter.format(allRecovered), formatter.format(allUnresolved),
                formatter.format(allDeaths), formatter.format(allNewCasesToday), formatter.format(allNewDeathsToday),
                formatter.format(allActiveCases), formatter.format(allSeriousCases)
            ]
        )

        tableValues.forEach(function(tableValue) {
            if (!tableValue.includes(undefined)) {
                table.push(tableValue)
            }
            
        })
    }

    console.log(table.toString())
}

const getByCountryName = async (countryCode) => {
    
    const { countrydata } = await fetch(api.base.countryStats + countryCode).then(resp => resp.json())

    const table = new Table(head.countryStats)

    if (countrydata.length > 0) {

        const returnedValues = countrydata[0]
        
        const tableValues = Object.values(returnedValues).slice(0, 9).map(value => {
            return isNaN(value) ? value.title : new Intl.NumberFormat().format(value)
        })

        table.push(tableValues)
    }

    console.log(table.toString())

}

const getCountryTimeline = async (countryCode) => {
    
    const { timelineitems } = await fetch(api.base.countryTimeline + countryCode).then(resp => resp.json())

    const table = new Table(head.countryTimeline)

    const formatter = new Intl.NumberFormat()

    if (timelineitems.length > 0) {

        const returnedValues = timelineitems[0]
        
        const tableValues = Object.keys(returnedValues).map(key => {

            const { 
                new_daily_cases, new_daily_deaths, total_cases,
                total_recoveries, total_deaths
            } = returnedValues[key]

            return [
                moment(new Date(key)).format('DD.MM.YYYY'),
                formatter.format(new_daily_cases),
                formatter.format(new_daily_deaths),
                formatter.format(total_cases),
                formatter.format(total_recoveries),
                formatter.format(total_deaths),
            ]
        })

        tableValues.forEach(function(tableValue) {
            if (!tableValue.includes('NaN')) {
                table.push(tableValue)
            }
            
        })
    }

    console.log(table.toString())

}

const getCountryStats = (code, type = '') => {
    
    let countryCode = code !== true ? code.trim() : 'all'

    if (type === '') {
        if (countryCode === 'all') {
            getAllCountries()
        } else {
            getByCountryName(countryCode)
        }
    } else {

        const isCodeAvailable = countries.flat().find(code => code == countryCode)

        if (!isCodeAvailable) {
            console.warn('Wrong country code!')
            return
        }
        getCountryTimeline(countryCode)
    }
}

module.exports = {
    globalStats,
    getCountryStats
}