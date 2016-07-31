Ext.define('LPB.view.admin.items.panels.DatesGrid', {
    extend: 'Ext.form.FieldContainer',

    mixins: {
        field: 'Ext.form.field.Field'
    },

    alias: 'widget.datesgrid',

    // constructor: function (config) {
    //     this.callParent([config]);
    // },

    maxDates: 5,
    msgTarget: 'kiekeboe',
    allowBlank: false,

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
            autoLoad: true,
            listeners: {
                scope: this,
                datachanged: this.dataChanged
            }
        });

        me.items = [{
            xtype: 'grid',
            id: 'datesgrid',
            height: 400,
            title: 'Data',
            store: me.store,
            autoScroll: true,
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
                format: 'D d M Y H:i'
            }, {
                xtype: 'actioncolumn',
                width: 30,
                menuDisabled: true,
                items: [{
                    iconCls: 'x-fa fa-trash-o',
                    tooltip: 'verwijder datum',
                    handler: function (grid, rowIndex) {
                        grid.getStore().removeAt(rowIndex);
                    }
                }]
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                items: [{
                    iconCls: 'fa fa-trash-o',
                    tooltip: 'Verwijder alle data',
                    handler: function () {
                        me.store.removeAll();
                    }
                }]
            }]
        }];

        this.callParent();
        this.initField();
    },

    dataChanged: function (store) {
        //console.log(this);
        this.setValue(store.getCount());
    },

    setValue: function (value) {
        var me = this;
        me.value = value;
        me.mixins.field.setValue.call(me, value);
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

        this.activeErrors = Ext.Array.from(errors);
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

        if (value < 1) {
            errors.push('Selecteer minimaal 1 datum');
        }
        if (value > me.maxDates && (me.maxDates !== null)) {
            errors.push('Selecteer maximaal ' + me.maxDates + ' datum(s)');
        }
        return errors;
    }
});