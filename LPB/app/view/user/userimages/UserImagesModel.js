/**
 * Created by Peter on 25-1-2016.
 */
Ext.define('LPB.view.user.userimages.UserImagesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.userimages',

    stores: {
        /*
         A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
         store configuration. For example:
         */

        userImages: {
            model: 'Image',
            storeId: 'userImages',
            pageSize: 0,
            autoLoad: true,
            filters: [{
                property: 'ownerId',
                value: '{currentUser.id}'
            }]
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});