Ext.define('LPB.store.Groups', {
    extend: 'Ext.data.Store',

    model: 'LPB.model.Group',

    storeId: 'Groups',

    autoLoad: true,
    remoteSort: true,
    pageSize: 0,

    sorters: {
        property: 'name',
        value: 'ASC'
    }
});