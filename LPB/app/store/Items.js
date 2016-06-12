Ext.define('LPB.store.Items', {
    extend: 'Ext.data.Store',

    model: 'LPB.model.CalendarItem',

    storeId: 'Items',
    groupField: 'title',
    pageSize: 0,
    autoLoad: false,
    remoteSort: true,
    remoteFilter: true
});