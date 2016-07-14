Ext.define('LPB.store.Categories', {
    extend: 'Ext.data.Store',

    model: 'LPB.model.Category',

    storeId: 'Categories',

    autoLoad: true,
    remoteSort: true,
    pageSize: 0,

    sorters: {
        property: 'order',
        value: 'ASC'
    }
});