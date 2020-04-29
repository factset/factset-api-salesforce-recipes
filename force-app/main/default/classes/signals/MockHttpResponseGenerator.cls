@isTest
global class MockHttpResponseGenerator implements HttpCalloutMock {
    // Implement this interface method
    global HTTPResponse respond(HTTPRequest req) {
        System.assertEquals('GET', req.getMethod());
        System.assertEquals('application/json', req.getHeader('Accept'));
        
        // Create a fake response
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');

        if(req.getEndpoint().equals('https://api.factset.com/signals/v1/events/?ids=AAPL-US,FDS-US')) {
            res.setBody('{"data":{"AAPL-US":{"isNear3YearHigh":{"events":[{"eventLatestDate":' +
            '"2020-01-30","properties":{"detailMessage":{"description":' +
            '"Detail message for approaching 3-year high price","type":"string",' +
            '"value":"The 30 Jan \'20 closing price for Apple (AAPL-US) was USD 323.87,' +
            ' coming within 5% of the 3-year high of USD 324.34 that occurred on 29 Jan' +
            ' \'20"}}}]}},"FDS-US":{"isNear3YearHigh":{"events":[{"eventLatestDate":"2020-01-30",' +
            '"properties":{"detailMessage":{"description":"Detail message for approaching 3-year ' +
            'high price","type":"string","value":"The 30 Jan \'20 closing price for FactSet (FDS-US)' +
            ' was USD 290.47, coming within 5% of the 3-year high of USD 302.05 that occurred on 19 Jun \'19"}}}]}}}}');
        }

        res.setStatusCode(200);
        
        return res;
    }
}