/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.locations.LocationsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.locations',

    stores: {
        locationImages: {
            autoLoad: true,
            storeId: 'LocationImages',
            model: 'LPB.model.LocationImage',
            remoteFilter: true,
            pageSize: 0
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});