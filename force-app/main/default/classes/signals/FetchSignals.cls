public with sharing class FetchSignals {
    /**
     * Fetch data from FactSet Signals API
     * To get an API Key, follow instruction here: https://developer.factset.com/authentication
     * Full instructions on the Signals API: https://developer.factset.com/api-catalog/signals-api 
     */
    @AuraEnabled(cacheable=false)
    public static string fetchData(string commaDelimitedTickers) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.factset.com/signals/v1/events/?ids=' + commaDelimitedTickers);
        request.setMethod('GET');
        request.setHeader('Accept', 'application/json');
        // Replace '<MY-API-KEY>' with the one generated for your account
        request.setHeader('Authorization', '<MY-API-KEY>');
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200) {
            return response.getBody();
        }
        return 'Failed';
    }

    @AuraEnabled(cacheable=false)
    public static string getAccountTickerSymbol(Id accountId) {
        String query = 'Select TickerSymbol FROM Account WHERE Id=\'' + accountId + '\'';
        Sobject obj = Database.query(query); 
        return String.valueOf(obj.get('TickerSymbol'));
    }
}

