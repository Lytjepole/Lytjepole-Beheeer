/**
 * Created by Peter on 25-1-2016.
 */
Ext.define('LPB.view.user.useritems.UserItemsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.useritems',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    onActionHighlightClick: function (view, rowIndex, colIndex, item, e, record) {
        record.set("highlight", !record.get('highlight'));
        record.save();
    },

    onActionPublishedClick: function (view, rowIndex, colIndex, item, e, record) {
        record.set('published', !record.get('published'));
        record.save();
    },

    onActionEditClick: function () {

    },

    onActionDeleteClick: function () {

    },

    onActionCopyNewClick: function () {

    },

    showEditItemWindow: function (record) {
        console.log(record);
    },

    showCopyAsNewWindow: function (record) {
        console.log(record);
    },

    showAddItemWindow: function () {

    },

    showFilterWindow: function (btn) {
        var win,
            store = this.getView().getStore(),
            values = store.getFilters().get('endDate').getValue(),
            operator = store.getFilters().get('endDate').getOperator();

        win = Ext.create({
            xtype: 'setFiltersWindow',
            title: 'Filters',
            filterValues: values,
            filterOperator: operator
        });
        win.show();
        this.getView().add(win);
    },

    onDateFilterChanged: function (slider) {
        var store = this.getView().getStore(),
            values = slider.getValues(),
            beginDate = Ext.Date.parse(values[0], 'U'),
            endDate = Ext.Date.parse(values[1], 'U');

        if (values[1] === slider.maxValue) { // slider all the way right: no enddate for filter
            store.filter([{
                property: 'endDate',
                operator: '>=',
                value: Ext.Date.format(Ext.Date.clearTime(beginDate), 'Y-m-d')
            }]);
        } else {
            store.filter([{
                property: 'endDate',
                operator: 'between',
                value: Ext.Date.format(beginDate, 'Y-m-d') + '/' + Ext.Date.format(endDate, 'Y-m-d')
            }]);
        }
    }
});