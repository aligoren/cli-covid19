const globalStats = {
    head: [
        'Total Cases', 'Total Recovered', 'Total Unresolved', 'Total Deaths',
        'New Cases', 'New Deaths', 'Active Cases', 'Serious Cases', 'Affected Countries' 
    ]
}

const allCountries = {
    head: [
        'Country', 'Total Cases', 'Total Recovered', 'Total Unresolved',
        'Total Deaths', 'New Cases', 'New Deaths', 'Active Cases', 'Serious Cases' 
    ],
    footer: [
        '...', 'Total Cases', 'Total Recovered', 'Total Unresolved',
        'Total Deaths', 'New Cases', 'New Deaths', 'Active Cases', 'Serious Cases' 
    ]
}

const countryStats = {
    head: [
        'Country', 'Total Cases', 'Total Recovered', 'Total Unresolved',
        'Total Deaths', 'New Cases', 'New Deaths', 'Active Cases', 'Serious Cases' 
    ]
}

const countryTimeline = {
    head: [
        'Date', 'New Daily Cases', 'New Daily Deaths',
        'Total Cases', 'Total Recovered', 'Total Deaths'
    ]
}

module.exports = {
    globalStats,
    allCountries,
    countryStats,
    countryTimeline
}