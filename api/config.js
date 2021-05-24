module.exports = {
    server: {
        port: 3000
    },
    crawler: {
        website: 'https://myreservations.omnibees.com',
        fixedParams: {
            q: 5462,
            lang: 'pt-BR'
        },
        resultField: '#room_results'
    }
}