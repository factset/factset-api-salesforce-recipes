public with sharing class CommonMethods {
    // We don't want to cache this request as the values returned should change
    // everytime we visit another account
    @AuraEnabled(cacheable=false)
    public static List<sobject> fetchRecentItems(Integer numberOfAccounts) {     
      
    List<sObject> recentlyViewedIds = new List<sObject>();
  
    for(sObject obj : [SELECT Id,Name,LastViewedDate,TickerSymbol,LastActivityDate FROM account WHERE LastViewedDate !=null ORDER BY LastViewedDate DESC limit :numberOfAccounts]) {
         recentlyViewedIds.add(obj);
    }
    return recentlyViewedIds;
    }
  }
  
  