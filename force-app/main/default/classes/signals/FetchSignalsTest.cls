@isTest
private class FetchSignalsTest {

    @isTest
    static void fetchData() {
        String [] accounts = new String[]{'AAPL-US', 'FDS-US'};

        Test.startTest();
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator());
        String response = FetchSignals.fetchData(String.join(accounts, ','));
        Test.stopTest();

        String expectedValue = '{"data":{"AAPL-US":{"isNear3YearHigh":{"events":[{"eventLatestDate":' +
        '"2020-01-30","properties":{"detailMessage":{"description":' +
        '"Detail message for approaching 3-year high price","type":"string",' +
        '"value":"The 30 Jan \'20 closing price for Apple (AAPL-US) was USD 323.87,' +
        ' coming within 5% of the 3-year high of USD 324.34 that occurred on 29 Jan' +
        ' \'20"}}}]}},"FDS-US":{"isNear3YearHigh":{"events":[{"eventLatestDate":"2020-01-30",' +
        '"properties":{"detailMessage":{"description":"Detail message for approaching 3-year ' +
        'high price","type":"string","value":"The 30 Jan \'20 closing price for FactSet (FDS-US)' +
        ' was USD 290.47, coming within 5% of the 3-year high of USD 302.05 that occurred on 19 Jun \'19"}}}]}}}}';
        System.assertEquals(response, expectedValue);
    }
}
