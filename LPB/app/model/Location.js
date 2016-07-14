Ext.define('LPB.model.Location', {
    extend: 'LPB.model.Base',

    proxy: {
        reader: {
            rootProperty: 'location'
        },
        writer: {
            rootProperty: 'location'
        }
    },

    fields: [{
        name: 'name',
        type: 'string'
    }, {
        name: 'userId',
        type: 'int',
        reference: 'User'
    }, {
        name: 'street',
        type: 'string'
    }, {
        name: 'number',
        type: 'string'
    }, {
        name: 'zip',
        type: 'string'
    }, {
        name: 'city',
        type: 'string'
    }, {
        name: 'phone',
        type: 'string'
    }, {
        name: 'www',
        type: 'string'
    }, {
        name: 'email',
        type: 'string'
    }, {
        name: 'lat',
        type: 'string'
    }, {
        name: 'lng',
        type: 'string'
    }, {
        name: 'fullAddress',
        type: 'string'
    }, {
        name: 'markerType',
        type: 'int'
    }, {
        name: 'imageId',
        type: 'int',
        reference: 'Image'
    }]
});