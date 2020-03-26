import fetchData from '@salesforce/apex/FetchSignals.fetchData';
import {getSignalsData} from 'c/shared';
const signalsData = require('./data/signalsData.json');

jest.mock('@salesforce/apex/FetchSignals.fetchData', () => {
    return {
        default: jest.fn()
    }
}, { virtual: true });

describe('c-shared', () => {
    describe('getSignalsData function', () => {
        const signalsResponse = [
            {
                name: 'AAPL-US', 
                signal: 'Near 3-Year High',
                date: '2020-01-30',
                detail: 'The 30 Jan \'20 closing price for Apple (AAPL-US) was USD 323.87, coming within 5% of the 3-year high of USD 324.34 that occurred on 29 Jan \'20',
                label: 'AAPL-US: Near 3-Year High'
            },
            {
                name: 'FDS-US',
                signal: 'Near 3-Year High',
                date: '2020-01-30',
                detail: 'The 30 Jan \'20 closing price for FactSet (FDS-US) was USD 290.47, coming within 5% of the 3-year high of USD 302.05 that occurred on 19 Jun \'19',
                label: 'FDS-US: Near 3-Year High'
            }
        ];
        afterEach(() => {
            // Prevent data saved on mocks from leaking between tests
            jest.clearAllMocks();
        });

        it('should parse the signals data in a suitable format', async () => {
            fetchData.mockResolvedValue(JSON.stringify(signalsData));
            let response = await getSignalsData(['AAPL-US','FDS-US']);

            expect(fetchData).toHaveBeenCalledWith({commaDelimitedTickers: 'AAPL-US,FDS-US'});
            expect(response).toEqual(signalsResponse);
        });
    });
});