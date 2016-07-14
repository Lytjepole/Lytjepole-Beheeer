Ext.define('LPB.store.Locations', {
    extend: 'Ext.data.Store',

    model: 'LPB.model.Location',

    storeId: 'Locations',
    pageSize: 20,
    autoLoad: false,
    remoteSort: true,
    remoteFilter: true
});