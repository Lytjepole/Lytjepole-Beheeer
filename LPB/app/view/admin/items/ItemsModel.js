/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.items.ItemsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.items',

    stores: {
        MruImages: {
            model: 'Image',
            storeId: 'MruImages',
            autoLoad: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 18
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});