Ext.define('LPB.store.Users', {
    extend: 'Ext.data.Store',

    model: 'LPB.model.User',

    storeId: 'UsersStore',

    autoLoad: false,
    remoteSort: true,
    remoteFilter: true
});