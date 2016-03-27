/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.users.UsersModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.users',

    stores: {
        userImages: {
            autoLoad: true,
            storeId: 'UserImages',
            model: 'LPB.model.UserImage',
            remoteFilter: true,
            pageSize: 0
        },

        accessLevels: {
            storeId: 'AccessLevels',
            model: 'LPB.model.AccessLevel',
            data: [
                {id: 1, accessLevel: 1, description: 'Administrator'},
                {id: 2, accessLevel: 2, description: 'Superuser'},
                {id: 3, accessLevel: 3, description: 'User'}
            ]
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});