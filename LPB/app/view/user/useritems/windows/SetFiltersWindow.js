Ext.define('LPB.view.user.useritems.windows.SetFiltersWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.setFiltersWindow',


    modal: true,
    width: 500,

    initComponent: function () {

        this.items = [{
            xtype: 'form',
            layout: 'anchor',
            bodyPadding: 15,

            items: [{
                anchor: '100%',
                xtype: 'dateslider',
                id: 'dateslider',
                fieldLabel: 'Datum filter',
                dateFormat: 'j-n-Y',
                dateIncrement: Ext.Date.DAY,
                values: [Ext.Date.format(new Date(), "j-n-Y"), Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, 12), "j-n-Y")],
                minDate: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, -12), "j-n-Y"),
                maxDate: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, 12), "j-n-Y"),
                listeners: {
                    changecomplete: 'onDateFilterChanged',
                    afterrender: this.sliderRendered
                }
            }],

            dockedItems: [{
                xtype: 'statusbar',
                id: 'statusbar',
                dock: 'top',
                defaultText: 'Status',
                items: [{
                    xtype: 'tbfill'
                }, {
                    iconCls: 'fa fa-ban',
                    tooltip: 'Reset filters',
                    handler: this.resetFilters
                }]
            }],

            buttons: [{
                text: 'Ok',
                handler: function (btn) {
                    btn.up('window').close();
                }
            }]
        }];

        this.callParent();
    },

    sliderRendered: function (slider) {
        var filterValues = slider.up('window').filterValues,
            filterOperator = slider.up('window').filterOperator,
            maxValue = slider.maxValue,
            startValue,
            endValue,
            res;

        if (filterOperator === '>=' || filterOperator === '>') {
            if (!filterValues.getMonth) {
                startValue = Ext.Date.parse(filterValues, 'Y-m-d');
            } else {
                startValue = filterValues;
            }
            slider.setValue([Ext.Date.format(startValue, "U"), maxValue]);
        } else {
            res = filterValues.split("/");
            startValue = Ext.Date.parse(res[0], 'Y-m-d');
            endValue = Ext.Date.parse(res[1], 'Y-m-d');
            slider.setValue([Ext.Date.format(startValue, "U"), Ext.Date.format(endValue, "U")]);
        }
    },

    resetFilters: function (btn) {
        var slider = Ext.getCmp('dateslider');

        slider.setValue([Ext.Date.format(Ext.Date.clearTime(new Date()), "U"), Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, 12), "U")]);
        slider.fireEvent('changecomplete', slider);
    }
});