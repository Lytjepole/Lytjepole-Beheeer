Ext.define('LPB.store.MoreItems', {
    extend: 'Ext.data.Store',

    model: 'LPB.model.MoreItem',

    autoLoad: false,
    pageSize: 0,
    remoteFilter: true,
    remoteSort: true
});