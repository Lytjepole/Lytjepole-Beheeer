/**
 * Created by Peter on 5-12-2015.
 */
Ext.define('LPB.model.User', {
    extend: 'LPB.model.Base',

    proxy: {
        reader: {
            rootProperty: 'user'
        },
        writer: {
            rootProperty: 'user'
        }
    },

    fields: [
        {name: 'userName', type: 'string'},
        {name: 'fullName', type: 'string'},
        {name: 'accessLevel', type: 'int'},
        {name: 'street', type: 'string'},
        {name: 'number', type: 'string'},
        {name: 'zip', type: 'string'},
        {name: 'city', type: 'string'},
        {name: 'phone', type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'created', type: 'date'},
        {name: 'lastEdited', type: 'date'},
        {name: 'enabled', type: 'boolean'},
        {name: 'lat', type: 'string'},
        {name: 'lng', type: 'string'},
        {name: 'imageId', type: 'int'}
    ]
});