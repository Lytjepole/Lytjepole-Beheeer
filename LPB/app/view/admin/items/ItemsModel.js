/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.items.ItemsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.items',

    stores: {
        ItemImages: {
            model: 'LPB.model.Image',
            storeId: 'ItemImages',
            pageSize: 0,
            autoLoad: true,
            remoteFilter: true
        },
        ItemLocations: {
            model: 'LPB.model.Location',
            storeId: 'ItemLocations',
            pageSize: 0,
            autoLoad: false
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});