import { createElement } from 'lwc';
import SignalsAccount from 'c/signalsAccount';
import { registerLdsTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import { getRecord } from 'lightning/uiRecordApi';
import { getSignalsData } from 'c/shared';
const mockGetRecordConcorded = require('./data/getRecordConcorded.json');
const mockGetRecordNotConcorded = require('./data/getRecordNotConcorded.json');

// Register a test wire adapter to control @wire(getRecord)
const getRecordWireAdapter = registerLdsTestWireAdapter(getRecord);

jest.mock('c/shared', () => {
    return {
        getSignalsData: jest.fn()
    }
}, { virtual: true });

describe('c-signals-account', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should be defined', () => {
        expect(SignalsAccount).toBeDefined();
    });

    it('should get signals on account data trigger', () => {
        getConcordanceTickers.mockResolvedValue([]);
        getSignalsData.mockResolvedValue([]);
        const element = createElement('c-signals-account', {
            is: SignalsAccount
        });
        document.body.appendChild(element);
        getRecordWireAdapter.emit(mockGetRecordConcorded);

        return Promise.resolve().then(() => {
            expect(getSignalsData).toHaveBeenCalledWith(['FDS-US']);
        });
    });

    it('should not get signals on account data trigger when FactSet ticker is not present', () => {
        getConcordanceTickers.mockResolvedValue([]);
        getSignalsData.mockResolvedValue([]);
        const element = createElement('c-signals-account', {
            is: SignalsAccount
        });
        document.body.appendChild(element);
        getRecordWireAdapter.emit(mockGetRecordNotConcorded);

        return Promise.resolve().then(() => {
            expect(getSignalsData).not.toHaveBeenCalledWith();
        });
    });
});