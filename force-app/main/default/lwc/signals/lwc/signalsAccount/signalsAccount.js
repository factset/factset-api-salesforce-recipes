import { LightningElement, track, wire, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { getSignalsData } from 'c/shared';
import FORM_FACTOR from '@salesforce/client/formFactor';

const columns = [
    { label: 'Account Name', fieldName: 'name' },
    { label: 'Account Signal', fieldName: 'signal'},
    { label: 'Last Contact Date', fieldName: 'date'}
];

const ACCOUNT_FIELDS_TO_LOOKUP = [
    'Account.TickerSymbol',
    'Account.Name',
    'Account.LastActivityDate'
];

export default class SignalsAccount extends LightningElement {
    @api recordId = null;
    @track data = [];
    @track columns = columns;
    @track progressPercentage = 0;
    @track fetchComplete = false;
    @track isDesktop = FORM_FACTOR === 'Large';
    @track lastActivityDate = 'N/A';

    @wire(getRecord, {recordId: '$recordId', fields: ACCOUNT_FIELDS_TO_LOOKUP })
    /**
     * Link getRecord to the account function below
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.data_wire_service_about
     */
    account({error, data}) {
      this.fetchComplete = false;
      this.progressPercentage = 0;
        if(data) {
          const accountTicker = data.fields.TickerSymbol.value; 
          this.lastActivityDate = data.fields.LastActivityDate.value || 'N/A';

          //If we are on a page relevent to a specific account
          if(accountTicker) {
            this.progressPercentage = 50;
            getSignalsData([accountTicker]).then(signalsData => {
              this.populateTable(signalsData);
            });
          } else {
            this.fetchComplete = true;
          }  
        }
    }

    /**
     * Populate the table with signals data
     * @param {*} tableData 
     */
    populateTable(tableData) {       
        this.data = tableData;
        this.fetchComplete = true;
        this.progressPercentage = 100;
    }
}
