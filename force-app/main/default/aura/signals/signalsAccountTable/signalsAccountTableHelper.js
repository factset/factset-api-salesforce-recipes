({
    parseData: function (cmp, value) {
        const signalsJson = JSON.parse(value);
        
        // Get the data in the right format for templates
        const signalsData = [];
        for(let [account, signals] of Object.entries(signalsJson.data)) {
            for(let [key, signal] of Object.entries(signals)) {
                const events = signal.events;
                signalsData.push({
                    accountName: account,
                    accountSignal:  events[0].properties.summary.value,
                    lastContactDate: events[0].eventLatestDatetime
                });
            }
        }

        cmp.set('v.data', signalsData);
    },
    getTickerSymbol: function(cmp) {
        const action = cmp.get("c.getAccountTickerSymbol");
        action.setParams({ accountId: cmp.get("v.recordId")});

        action.setCallback(this, function(response) {
            const state = response.getState();
            const value = response.getReturnValue();
            if (state === "SUCCESS") {
                this.getData(cmp, value);
            } else if (state === "ERROR") {
                const errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.error("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.error("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    getData: function(cmp, ticker) {
        const action = cmp.get("c.fetchData");
        action.setParams({ commaDelimitedTickers: ticker });

        action.setCallback(this, function(response) {
            const state = response.getState();
            const value = response.getReturnValue();
            if (state === "SUCCESS") {
                this.parseData(cmp, value);
            } else if (state === "ERROR") {
                const errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.error("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.error("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    }
});
