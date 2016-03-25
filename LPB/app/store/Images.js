/**
 * Created by Peter on 29-1-2016.
 */
Ext.define('LPB.store.Images', {
    extend: 'Ext.data.Store',

    //storeId: 'Images',
    model: 'LPB.model.Image',

    autoLoad: false,
    remoteSort: true,

    pageSize: 36
});