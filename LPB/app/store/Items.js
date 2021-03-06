Ext.define('LPB.store.Items', {
    extend: 'Ext.data.Store',

    model: 'LPB.model.CalendarItem',

    storeId: 'Items',
    //groupField: 'title',
    pageSize: 0,
    autoLoad: false,
    autoSync: false,
    remoteSort: true,
    remoteFilter: true,

    sorters: [{
        property: 'title',
        value: 'ASC'
    }, {
        property: 'endDate',
        value: 'ASC'
    }]
});