import fetchData from '@salesforce/apex/FetchSignals.fetchData';

/**
 * Given a list of tickers, fetch the signals associated with them
 * @param {Array} tickers 
 */
const getSignalsData = async (tickers) => {       
    // Fetch Data using the Apex Class and parse to JSON
    const signalsResponse = await fetchData(({commaDelimitedTickers: tickers.join(',').toString()}));
    const signalsJson = JSON.parse(signalsResponse);
    // Get the data in the right format for templates
    let signalsData = [];
    for(let [account, signals] of Object.entries(signalsJson.data)) {
        if(tickers.includes(account)) {
            for(let [key, signal] of Object.entries(signals)) {
                let events = signal.events;
                signalsData.push({
                    name: account,
                    signal: signal.meta.name,
                    date: events[0].eventLatestDatetime,
                    detail: events[0].properties.summary.value,
                    label: `${account}: ${signal.meta.name}`
                });
            }
        }
    }

    return signalsData;
}

export {getSignalsData};
