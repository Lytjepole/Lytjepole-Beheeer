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
            listeners: {
                afterrender: this.formRendered
            },

            items: [{
                anchor: '100%',
                xtype: 'dateslider',
                name: 'dateslider',
                fieldLabel: 'Datum',
                dateFormat: 'j-n-Y',
                dateIncrement: Ext.Date.DAY,
                values: [Ext.Date.format(new Date(), "j-n-Y"), Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, 12), "j-n-Y")],
                minDate: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, -12), "j-n-Y"),
                maxDate: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, 12), "j-n-Y"),
                listeners: {
                    changecomplete: 'onDateFilterChanged'
                }
            }],

            buttons: [{
                text: 'Ok'
            }]
        }];

        this.callParent();
    },

    formRendered: function (form) {
        var filterValues = form.up('window').filterValues,
            filterOperator = form.up('window').filterOperator,
            slider = form.getForm().findField('dateslider'),
            maxValue = slider.getMaxValue;

        if (filterOperator == '>') {
            console.log(slider);
            slider.getValues();
            //slider.values= [filterValues , maxValue];
        } else {

        }
    }
});