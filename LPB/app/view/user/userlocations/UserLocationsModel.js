/**
 * Created by Peter on 25-1-2016.
 */
Ext.define('LPB.view.user.userlocations.UserLocationsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.userlocations',

    stores: {
        ownLocations: {
            model: 'Location',
            storeId: 'ownLocations',
            autoLoad: true,
            pageSize: 0,
            filters: [{
                property: 'userId',
                operator: '=',
                value: '{currentUser.id}'
            }],
            sorters: [{
                property: 'name',
                direction: 'ASC'
            }]
        },

        userLocationImages: {
            model: 'LocationImage',
            storeId: 'userLocationImages',
            autoLoad: true,
            pageSize: 0,
            remoteFilter: true,
            filters: [{
                property: 'ownerId',
                operator: '=',
                value: '{currentUser.id}'
            }]
        }
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'UserLocations',
            autoLoad: true
        }
        */
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});