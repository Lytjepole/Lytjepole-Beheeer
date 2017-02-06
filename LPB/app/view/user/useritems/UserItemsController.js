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

    onAddItemBtnClick: function (btn) {
        var win;

        win = Ext.create({
            xtype: 'adduseritemwindow',
            userId: this.getViewModel().data.currentUser.id
        });
        win.show();
        this.getView().add(win);
        this.createTplMenu();
    },

    createTplMenu: function () {
        var me = this;
        var refs = me.getReferences();
        var userId = this.getViewModel().data.currentUser.id;
        var menu;
        var items;

        console.log(refs);
        Ext.Ajax.request({
            url: 'resources/data/template/template.php?action=getUserTemplates&userId=' + userId,
            success: function (response, eOpts) {
                items = Ext.JSON.decode(response.responseText);
                menu = Ext.create('Ext.menu.Menu', {
                    plain: true,
                    listeners: {
                        click: 'onTemplateMenuClick'
                    }
                })
                Ext.Object.each(items.items, function (item, value, items) {
                    for (i = 0;i < value.length; i++) {
                        menu.add({text: value[i].title, value: value[i].id});
                    }
                });
                refs.tplBtn.setMenu(menu);
            }
        });
    },

    onTemplateMenuClick: function (menu , item , e , eOpts) {
        var me = this,
            refs = me.getReferences(),
            template,
            beginDate = Ext.Date.clearTime(new Date()),
            beginTime,
            endTime,
            endDate = new Date();

        console.log(item.value);
        template = new LPB.model.Template({id: item.value});
        template.load({
            success: function (record) {
                beginTime = record.get('beginTime');
                beginDate.setHours(beginTime.substring(0,2), beginTime.substring(3,5));
                endTime = record.get('endTime');
                endDate.setHours(endTime.substring(0,2), endTime.substring(3,5));

                record.set('beginDate', beginDate);
                record.set('endDate', endDate);

                refs.additemform.loadRecord(record);
            }
        });
    },

    onBeforeAddItemWindowClose: function (win) {
        var me = this,
            refs = this.getReferences();

        if (refs.additemform.isDirty()) {
            Ext.Msg.confirm({
                title: 'Venster sluiten?',
                msg: 'Weet je het zeker?',
                buttons: Ext.Msg.YESNO,
                fn: function (btn) {
                    if (btn === 'yes') {
                        me.getView().remove(win);
                        win.destroy();
                    }
                }
            });
        } else {
            // just close
            this.getView().remove(win);
            win.destroy();
        }
        return false;
    },

    onSubmitAddItemForm: function (btn) {
        console.log(this.getReferences());
        var me = this,
            refs = me.getReferences(),
            win = refs.additemwindow,
            store = Ext.getStore('userItems'),
            form = refs.additemform,
            values = form.getValues(),
            data = form.getForm().findField('dates').getSubmitValue(),
            count = data.getCount(),
            item,
            items,
            i;

        values.userId = me.getViewModel().data.currentUser.id;

        if (form.isValid() && form.isDirty()) {
            for (i = 0; i < count; i++) {
                values.id = '';
                values.beginDate = data.getAt(i).get('beginDate');
                values.endDate = data.getAt(i).get('endDate');

                item = Ext.create('LPB.model.CalendarItem', values);
                items = item.copy(null);
                store.add(items);
            }
        }

        store.sync({
            success: function () {
                me.getView().remove(win);
            },
            failure: function () {
                console.log(arguments);
            }
        });
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
            title: 'Filters instellen',
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