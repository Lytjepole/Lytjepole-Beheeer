/**
 * Created by Peter on 10-1-2016.
 */
Ext.define('LPB.view.user.usertemplates.UserTemplatesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.usertemplates',

    stores: {
        userTemplates: {
            model: 'Template',
            storeId: 'userTemplates',
            pageSize: 0,
            autoLoad: true,
            filters: [{
                property: 'userId',
                value: '{currentUser.id}'
            }]
        },

        Images: {
            model: 'Image',
            storeId: 'Images',
            autoLoad: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 0,
            filters: [{
                property: 'ownerId',
                operator: '=',
                value: '{currentUser.id}'
            }]
        },

        MruImages: {
            model: 'Image',
            storeId: 'MruImages',
            autoLoad: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 18
        },

        allLocations: {
            model: 'Location',
            storeId: 'allLocations',
            autoLoad: true,
            pageSize: 0,
            remoteSort: true,
            sorters: [{
                property: 'name',
                direction: 'ASC'
            }]
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
        }

    }
});