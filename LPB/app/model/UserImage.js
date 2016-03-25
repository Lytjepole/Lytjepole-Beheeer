/**
 * Created by Peter on 29-1-2016.
 */
Ext.define('LPB.model.UserImage', {
    extend: 'LPB.model.Base',

    proxy: {
        reader: {
            rootProperty: 'userimage'
        },
        writer: {
            rootProperty: 'userimage'
        }
    },

    fields: [{
        name: 'imageName',
        type: 'string'
    }, {
        name: 'imagePath',
        type: 'string'
    }, {
        name: 'artist',
        type: 'string'
    }, {
        name: 'ownerId',
        type: 'int'
    }, {
        name: 'recentlyUsed',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    }]
});