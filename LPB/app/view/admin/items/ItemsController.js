/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.items.ItemsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.items',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    onAdditemWindowBeforeClose: function (win) {
        var refs = this.getReferences();
        if (refs.additemform.isDirty()) {
            Ext.Msg.confirm(
                'Venster sluiten?',
                'weet je zeker?',
                function (btn) {
                    if (btn === 'yes') {
                        win.destroy();
                    }
                }
            );
        } else {
            win.destroy();
        }
        return false;

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
        refs.datesfilter.setValue([Ext.Date.format(Ext.Date.clearTime(new Date()), "U"), Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, 12), "U")]);
        this.onDateFilterChanged(refs.datesfilter);
    },

    afterUserGridRender: function (grid) {
        var store = grid.getStore();
        store.group('title', 'ASC');
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
        record.set("highlight", !record.get('highlight'));
        record.save();
    },

    onActionPublishedClick: function (view, rowIndex, colIndex, item, e, record) {
        record.set('published', !record.get('published'));
        record.save();
    },

    onActionEditClick: function (view, rowIndex, colIndex, item, e, record) {
        this.editItem(record);
    },

    onDeleteItemBtnClick: function () {
        var me = this,
            refs = me.getReferences();
        record = me.getView().getSelectionModel().getSelection()[0];
        Ext.Msg.show({
            title: 'Item verwijderen...',
            message: 'Item "' + record.get('title') + '" verwijderen?',
            buttons: Ext.Msg.YESNOCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    // do delete item
                    record.erase();
                }
            }
        });
    },

    onActionDeleteClick: function (view, rowIndex, colIndex, item, e, record) {
        Ext.Msg.show({
            title: 'Item verwijderen...',
            message: 'Item "' + record.get('title') + '" verwijderen?',
            buttons: Ext.Msg.YESNOCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    // do delete item
                    record.erase();
                }
            }
        });
    },

    onTemplatesBtnClick: function (btn) {
        var refs = this.getView().getReferences(),
            items,
            menu,
            submenu;

        console.log('templates btn clicked!!');

        Ext.Ajax.request({
            url: 'resources/data/template/template.php?action=getUserTemplates',
            success: function (response, opts) {
                items = Ext.JSON.decode(response.responseText);
                menu = Ext.create('Ext.menu.Menu', {
                    plain: true
                });

                Ext.Object.each(items.items, function (item, value, items) {
                    menu.add({text: item, reference: item});
                    submenu = new Ext.menu.Menu({
                        plain: true,
                        listeners: {
                            click: 'onTemplateMenuClick'
                        }
                    });

                    for (i = 0;i < value.length; i++) {
                        item = new Ext.menu.Item({
                            text: value[i].title,
                            value: value[i].id
                        });
                        submenu.add(item);
                    }
                    menu.items.items[menu.items.items.length -1].setMenu(submenu);
                });
                refs.templateBtn.setMenu(menu);

            }
        });
    },

    onTemplateMenuClick: function (menu , item , e , eOpts) {
        var refs = this.getReferences(),
            template;

        template = new LPB.model.Template({id: item.getValue()});
        template.load({
            success: function (record) {
                beginDate = new Date();
                beginTime = record.get('beginTime');
                beginDate.setHours(beginTime.substring(0,2), beginTime.substring(3,5));
                endDate = new Date();
                endTime = record.get('endTime');
                endDate.setHours(endTime.substring(0,2), endTime.substring(3,5));
                record.set('beginDate', beginDate);
                record.set('endDate', endDate);
                refs.additemwindow.record = record;
                refs.additemwindow.addItemFormAfterRender(refs.additemform, 'tpl');
            }
        });
    },

    onActionCopyNewClick: function (view, rowIndex, colIndex, item, e, record) {
        var addItemWindow;

        addItemWindow = Ext.create({
            xtype: 'additemwindow',
            record: record
        });
        addItemWindow.show();
        this.getView().add(addItemWindow);
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
        this.onTemplatesBtnClick();
    },

    onSubmitAddItemForm: function () {
        var
            me = this,
            refs = this.getReferences(),
            store = Ext.getStore('Items'),
            form = refs.additemform,
            values = form.getValues(),
            data = form.getForm().findField('dates').getSubmitValue(),
            count = data.getCount(),
            item,
            items,
            i;

        values.userId = me.getViewModel().data.currentUser.id;

        if (form.isValid() && form.isDirty()) {
            // process form values
            for (i = 0; i < count; i++) {
                values.id = '';
                values.beginDate = data.getAt(i).get('beginDate');
                values.endDate = data.getAt(i).get('endDate');

                item = Ext.create('LPB.model.CalendarItem',
                    values
                    );
                items = item.copy(null);
                store.add(items);
            }

            store.sync({
                success: function () {
                    me.getView().remove('additemwindow');
                    refs.additemwindow.destroy();
                    store.reload();
                },
                failure: function () {
                    console.log(arguments);
                }
            });
        }
    },

    onEditItemBtnClick: function () {
        this.editItem(this.getView().getSelectionModel().getSelection()[0]);
    },

    onItemDblClick: function (grid, item) {
        this.editItem(item);
    },

    editItem: function (record) {
        var editItemWindow;

        editItemWindow = Ext.create('edititemwindow', {
            title: 'Item "' + record.get('title') + '" wijzigen'
        });
        editItemWindow.record = record;
        editItemWindow.show();
        this.getView().add(editItemWindow);
    },

    onSubmitEditItemForm: function () {
        var me = this,
            refs = this.getReferences(),
            store = Ext.getStore('Items'),
            form = refs.additemform,
            record = form.getRecord(),
            values = form.getValues(),
            data = form.getForm().findField('dates').getSubmitValue();

        if (form.isValid() && form.isDirty()) {
            console.info('saving data');
            values.beginDate = data.getAt(0).get('beginDate');
            values.endDate = data.getAt(0).get('endDate');
            record.set(values);
            record.save({
                callback: function () {
                    store.reload();
                    me.getView().remove(refs.edititemwindow);
                }
            });
        }
    },

    onEditItemWindowBeforeClose: function (win) {
        //console.log(arguments);
    }
});