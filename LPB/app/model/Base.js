/**
 * Created by Peter on 5-12-2015.
 */
Ext.define('LPB.model.Base', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id',     type: 'int' }
    ],

    schema: {
        namespace: 'LPB.model',
        proxy: {
            type: 'ajax',
            api: {
                read: 'resources/data/{entityName:lowercase}/{entityName:lowercase}.php',
                update: 'resources/data/{entityName:lowercase}/{entityName:lowercase}.php?action=update',
                create: 'resources/data/{entityName:lowercase}/{entityName:lowercase}.php?action=create',
                destroy: 'resources/data/{entityName:lowercase}/{entityName:lowercase}.php?action=destroy'
            },
            reader: {
                type: 'json',
                //rootProperty: '{entityName:lowercase}',
                successProperty: 'success'
            },
            writer: {
                type: 'json',
                //rootProperty: '{entityName:lowercase}',
                allowSingle: false,
                writeAllFields: true
            }
        }
    }

    /*
    Uncomment to add validation rules
    validators: {
        age: 'presence',
        name: { type: 'length', min: 2 },
        gender: { type: 'inclusion', list: ['Male', 'Female'] },
        username: [
            { type: 'exclusion', list: ['Admin', 'Operator'] },
            { type: 'format', matcher: /([a-z]+)[0-9]{2,3}/i }
        ]
    }
    */

    /*
    Uncomment to add a rest proxy that syncs data with the back end.
    proxy: {
        type: 'rest',
        url : '/users'
    }
    */
});