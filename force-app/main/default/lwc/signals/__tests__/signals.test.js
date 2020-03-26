import { createElement } from 'lwc';
import Signals from 'c/signals';
import fetchRecentItems from '@salesforce/apex/CommonMethods.fetchRecentItems';
import { getSignalsData } from 'c/shared';

jest.mock('@salesforce/apex/CommonMethods.fetchRecentItems', () => {
    return {
        default: jest.fn()
    }
}, { virtual: true });

jest.mock('c/shared', () => {
    return {
        getSignalsData: jest.fn()
    }
}, { virtual: true });

describe('c-signals', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should be defined', () => {
        expect(Signals).toBeDefined();
    });

    it('should fetch recent items on connect callback', () => {
        fetchRecentItems.mockResolvedValue([
            {
                'TickerSymbol': 'FDS-US',
                'Name': 'FactSet'
            }
        ]);
        getSignalsData.mockResolvedValue([]);
        const element = createElement('c-signals', {
            is: Signals
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            expect(fetchRecentItems).toHaveBeenCalledWith({numberOfAccounts: '5'});
            return Promise.resolve().then(() => {
                expect(getSignalsData).toHaveBeenCalledWith(['FDS-US']);
            });
        });
    });

    it('should not call getSignalsData when no ID present', () => {
        fetchRecentItems.mockResolvedValue([
            {
                'TickerSymbol': '',
                'Name': 'FactSet'
            }
        ]);
        getSignalsData.mockResolvedValue([]);
        const element = createElement('c-signals', {
            is: Signals
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            expect(fetchRecentItems).toHaveBeenCalledWith({numberOfAccounts: '5'});
            return Promise.resolve().then(() => {
                expect(getSignalsData).not.toHaveBeenCalled();
            });
        });
    });
});