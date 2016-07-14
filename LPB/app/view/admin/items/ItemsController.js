/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.items.ItemsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.items',

    /**
     * Called when the view is created
     */
    init: function() {

    },

    onUserFilterChanged: function (combo) {
        var store = this.getView().getStore();
        console.log(store.getFilters());
        if (combo.getValue()) {
            store.filter({
                property: 'userId',
                operator: '=',
                value: combo.getValue()
            });
        } else {
            store.removeFilter('userId');
            // store.filter({
            //     property: 'userId',
            //     operator: '>=',
            //     value: 0
            // });
        }

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
    },

    onDateFilterReset: function (tool) {
        var refs = this.getView().getReferences();
        console.log(refs, tool);
        // [Ext.Date.format(new Date(), "j-n-Y"), Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, 12), "j-n-Y")]
        refs.datesfilter.setValue([Ext.Date.format(Ext.Date.clearTime(new Date()), "U"), Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, 12), "U")]);
        this.onDateFilterChanged(refs.datesfilter);
    },

    afterUserGridRender: function (grid) {
        var store = grid.getStore();
        store.filter({
            property: 'endDate',
            operator: '>=',
            value: Ext.Date.clearTime(new Date())
        });
    },

    toolbarafterrender: function (toolbar) {
        //console.log(toolbar.getStore());
    },

    onToolExpandClick: function (tool, e, owner, eOpts) {
        this.getView().view.features[0].expandAll();
    },

    onToolCollapseClick: function (tool, e, owner, eOpts) {
        this.getView().view.features[0].collapseAll();
    },

    onActionHighlightClick: function (view, rowIndex, colIndex, item, e, record) {
        //console.log(record);
        record.set('highlight', !record.get('highlight'));
        record.save();
    },

    onActionPublishedClick: function (view, rowIndex, colIndex, item, e, record) {
        record.set('published', !record.get('published'));
        record.save();
    },

    onActionEditClick: function (view, rowIndex, colIndex, item, e, record) {
        this.editItem(record);
    },

    onActionDeleteClick: function (view, rowIndex, colIndex, item, e, record) {

    },

    onActionCopyNewClick: function (view, rowIndex, colIndex, item, e, record) {

    },

    onAddItemBtnClick: function () {
        this.createNewItem();
    },

    createNewItem: function () {
        var addItemWindow;
        addItemWindow = Ext.create({
            xtype: 'additemwindow'
        });
        addItemWindow.show();
        this.getView().add(addItemWindow);
    },

    onEditItemBtnClick: function () {
        this.editItem(this.getView().getSelectionModel().getSelection()[0]);
    },

    onItemDblClick: function (grid, item) {
        this.editItem(item);
    },

    editItem: function (record) {
        console.log(record);
        editItemWindow = Ext.create('edititemwindow', {
            title: record.get('title')
        });

        editItemWindow.show();
    }
});