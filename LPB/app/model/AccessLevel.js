/**
 * Created by Peter on 22-3-2016.
 */
Ext.define('LPB.model.AccessLevel', {
    extend: 'LPB.model.Base',

    // proxy: {
    //     reader: {
    //         rootProperty: 'userimage'
    //     },
    //     writer: {
    //         rootProperty: 'userimage'
    //     }
    // },

    fields: [{
        name: 'accessLevel',
        type: 'int'
    }, {
        name: 'description',
        type: 'string'

    }]
});