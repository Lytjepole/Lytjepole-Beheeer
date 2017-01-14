Ext.define('LPB.store.Templates', {
    extend: 'Ext.data.Store',

    model: 'LPB.model.Template',

    storeId: 'TemplatesStore',
    pageSize: 0,
    autoLoad: true,
    remoteSort: true,
    remoteFilter: true
});