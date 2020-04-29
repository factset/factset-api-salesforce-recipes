({
    init: function (cmp, event, helper) {
        cmp.set('v.columns', [
            {label: 'Account Name', fieldName: 'accountName', type: 'text', fixedWidth: 150},
            {label: 'Account Signal', fieldName: 'accountSignal', type: 'text', wrapText: true, clipText: true},
            {label: 'Last Contact Date', fieldName: 'lastContactDate', type: 'date', typeAttributes:{
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "2-digit"
            }, fixedWidth: 200}
        ]);

        helper.getTickerSymbol(cmp);
    }
});
