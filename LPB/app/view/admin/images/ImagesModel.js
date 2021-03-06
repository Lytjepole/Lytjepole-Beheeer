/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.images.ImagesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.images',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'Images',
            autoLoad: true
        }
        */
        allUsers: {
            model: 'User',
            storeId: 'allUsers',
            pageSize: 0,
            autoLoad: true,
            sorters: [{
                property: 'fullName',
                direction: 'ASC'
            }]
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});