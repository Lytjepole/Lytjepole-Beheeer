Ext.define('Ext.sunfield.imageField.DatesField', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.datesfield',

    mixins: {
        field: 'Ext.form.field.Field'
    },

    layout: 'fit',

    minDates: 1,
    maxDates: null,
    value: 0,

    initComponent: function () {
        var me = this;

        me.store = Ext.create('Ext.data.Store', {
            storeId: 'dateStore',
            fields: [{
                name: 'id',
                type: 'int'
            }, {
                name: 'beginDate',
                type: 'date'
            }, {
                name: 'endDate',
                type: 'date'
            }],
            autoLoad: true
        });

        me.items = me.setupItems();

        this.callParent();
        this.initField();
    },

    setupItems: function () {
        var me = this;

        me.gridPanel = new Ext.grid.Panel(Ext.apply({
            store: me.store,
            title: 'Data',
            id: 'datesgrid01',
            listeners: {
                scope: me,
                afterrender: me.afterGridRender
            },
            columns: [{
                xtype: 'datecolumn',
                text: 'Begindatum',
                dataIndex: 'beginDate',
                flex: 1,
                menuDisabled: true,
                sortable: false,
                hideable: false,
                format: 'D d M Y H:i'
            }, {
                xtype: 'datecolumn',
                text: 'Einddatum',
                dataIndex: 'endDate',
                flex: 1,
                menuDisabled: true,
                sortable: false,
                hideable: false,
                format: 'D d M Y H:i'
            }, {
                xtype: 'actioncolumn',
                width: 30,
                menuDisabled: true,
                sortable: false,
                hideable: false,
                items: [{
                    iconCls: 'x-fa fa-trash-o',
                    tooltip: 'verwijder datum',
                    handler: function (grid, rowIndex) {
                        grid.getStore().removeAt(rowIndex);
                    }
                }]
            }]

        }, me.listConfig));

        return me.gridPanel;
    },

    reset: function () {
        console.log('reset datesfield');
        this.store.removeAll();
    },

    dataChanged: function (store) {
        this.setValue(store.getCount());
    },

    afterGridRender: function (grid) {
        var store = grid.getStore();

        store.on('datachanged', this.dataChanged, this);
    },

    setValue: function (value) {
        var me = this;
        me.value = value;
        me.mixins.field.setValue.call(me, value);
    },

    getSubmitValue: function () {
        var me = this,
            data = me.store.getData();
        //console.log(data);
        return data;
    },

    isValid: function () {
        var me = this,
            disabled = me.disabled,
            validate = me.forceValidation || !disabled;

        return validate ? me.validateValue(me.value) : disabled;
    },

    validateValue: function (value) {
        var me = this,
            errors = me.getErrors(value),
            isValid = Ext.isEmpty(errors);

        if (!me.preventMark) {
            if (isValid) {
                me.clearInvalid();
            } else {
                me.markInvalid(errors);
            }
        }

        return isValid;
    },

    markInvalid: function (errors) {
        // Save the message and fire the 'invalid' event
        var me = this,
            oldMsg = me.getActiveError();
        me.setActiveErrors(Ext.Array.from(errors));
        if (oldMsg !== me.getActiveError()) {
            me.updateLayout();
        }
    },

    clearInvalid: function () {
        // Clear the message and fire the 'valid' event
        var me = this,
            hadError = me.hasActiveError();
        me.unsetActiveError();
        if (hadError) {
            me.updateLayout();
        }
    },

    getErrors: function (value) {
        var me = this,
            errors = [];

        if (value < me.minDates) {
            errors.push('Selecteer minimaal 1 datum');
        }
        if (value > me.maxDates && (me.maxDates !== null)) {
            errors.push('Selecteer maximaal ' + me.maxDates + ' datum(s)');
        }
        return errors;
    }
});