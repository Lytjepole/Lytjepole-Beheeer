/**
 * Created by Peter on 25-1-2016.
 */
Ext.define('LPB.view.user.useritems.UserItemsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.useritems',

    stores: {

        userItems: {
            model: 'CalendarItem',
            autoLoad: true,
            pageSize: 0,
            remoteFilter: true,
            remoteSort: true,
            groupField: 'title',
            filters: [{
                property: 'userId',
                operator: '=',
                value: '{currentUser.id}'
            }, {
                property: 'endDate',
                operator: '>',
                value: Ext.Date.clearTime(new Date())
            }],
            sorters: [{
                property: 'title',
                direction: 'ASC'
            }, {
                property: 'endDate',
                direction: 'ASC'
            }]
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});