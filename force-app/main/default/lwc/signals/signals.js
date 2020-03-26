import { track, LightningElement } from 'lwc';
import { getSignalsData } from 'c/shared';
import fetchRecentItems from '@salesforce/apex/CommonMethods.fetchRecentItems';

export default class Signals extends LightningElement {
    @track data = [];
    @track progressPercentage = 0;
    @track fetchComplete = false;
    lastActivityDate = {};

    /**
     * Function called when component loaded on page
     */
    connectedCallback() {
      let factsetTickerList = [];
      this.fetchComplete = false;
      this.progressPercentage = 0;
      // Get the most recent 5 accounts and fetch the signals for them
      fetchRecentItems({numberOfAccounts: '5'}).then(mostRecentAccounts => {
        this.progressPercentage = 25;
        mostRecentAccounts.forEach(element => {
          if(element.TickerSymbol) {
            factsetTickerList.push(element.TickerSymbol);
            this.lastActivityDate[element.TickerSymbol] = element.LastActivityDate || 'N/A';
          }
        });
        this.progressPercentage = 50;
        // If we don't have a relevant ticker, we don't fetch the signals
        if(factsetTickerList && factsetTickerList.length !== 0) {
          getSignalsData(factsetTickerList).then(signalsData => {
            this.progressPercentage = 75;
            this.populateTable(signalsData);
          });
        } else {
          this.fetchComplete = true;
        }
      });
    }

    /**
     * Populate the table with signals data
     * @param {*} tableData 
     */
    populateTable(tableData) {
      this.progressPercentage = 100;
      this.fetchComplete = true;
      tableData.forEach(element => {
        element.lastActivityDate = this.lastActivityDate[element.name];
      });
      this.data = tableData;
    }
}
