/**
 * Created by Peter on 25-1-2016.
 */
Ext.define('LPB.view.user.useritems.UserItemsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.useritems',

    stores: {

        userItems: {
            model: 'CalendarItem',
            autoLoad: true,
            storeId: 'userItems',
            pageSize: 0,
            remoteFilter: true,
            remoteSort: true,
            groupField: 'title',
            filters: [{
                property: 'userId',
                operator: '=',
                value: '{currentUser.id}'
            }, {
                property: 'endDate',
                operator: '>',
                value: Ext.Date.clearTime(new Date())
            }],
            sorters: [{
                property: 'title',
                direction: 'ASC'
            }, {
                property: 'endDate',
                direction: 'ASC'
            }]
        },

        Images: {
            model: 'Image',
            storeId: 'Images',
            autoLoad: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 0
        },

        MruImages: {
            model: 'Image',
            storeId: 'MruImages',
            autoLoad: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 18
        },

        ownGroups: {
            model: 'Group',
            storeId: 'ownGroups',
            autoLoad: true,
            pageSize: 0,
            remoteFilter: true,
            remoteSort: true,
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

        itemLocations: {
            model: 'Location',
            storeId: 'itemLocations',
            autoLoad: true,
            pageSize: 0,
            remoteSort: true,
            remoteFilter: true,
            sorters: [{
                property: 'name',
                direction: 'ASC'
            }]
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});