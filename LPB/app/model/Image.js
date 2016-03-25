/**
 * Created by Peter on 29-1-2016.
 */
Ext.define('LPB.model.Image', {
    extend: 'LPB.model.Base',

    proxy: {
        reader: {
            rootProperty: 'image'
        },
        writer: {
            rootProperty: 'image'
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
        type: 'date'
    }]
});