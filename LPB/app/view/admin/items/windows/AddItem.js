Ext.define('LPB.view.admin.items.windows.AddItem', {
    extend: 'Ext.window.Window',

    alias: 'widget.additemwindow',
    xtype: 'additemwindow',
    reference: 'additemwindow',

    width: 850,
    height: 650,
    modal: true,
    title: 'Item toevoegen',
    iconCls: 'fa fa-calendar',

    layout: 'fit',

    listeners: {
        beforeclose: 'onAdditemWindowBeforeClose'
    },

    initComponent: function () {

        Ext.apply(Ext.form.field.VTypes, {
            singleDayEventText: 'Eindtijd moet na begintijd liggen',
            singleDayEvent: function () { // event on single day: 1) endtime > begintime 2) begindate >= today
                var form = Ext.getCmp('additemform').getForm(),
                    beginDateField = form.findField('beginDate'),
                    beginTimeField = form.findField('beginTime'),
                    endDateField = form.findField('endDate'),
                    endTimeField = form.findField('endTime'),
                    result;

                beginDateField.clearInvalid();
                result = (endTimeField.getValue() > beginTimeField.getValue());

                if (result) {
                    beginDateField.clearInvalid();
                    beginTimeField.clearInvalid();
                    endDateField.clearInvalid();
                    endTimeField.clearInvalid();
                } else {
                    beginDateField.clearInvalid();
                    endDateField.clearInvalid();
                    beginTimeField.markInvalid('Eindtijd moet na begintijd liggen');
                    endTimeField.markInvalid('Eindtijd moet na begintijd liggen');
                }
                Ext.getCmp('adddatebtn').setDisabled(!result);

                return result;
            },

            multiDayEventText: 'Einddatum moet na begindatum liggen',
            multiDayEvent: function () { // event on multiple days: 1) enddate > begindate
                var form = Ext.getCmp('additemform').getForm(),
                    beginDateField = form.findField('beginDate'),
                    beginTimeField = form.findField('beginTime'),
                    endDateField = form.findField('endDate'),
                    endTimeField = form.findField('endTime'),
                    result;

                //console.log(form);
                result = (endDateField.getValue() > beginDateField.getValue());

                if (result) {
                    beginDateField.clearInvalid();
                    beginTimeField.clearInvalid();
                    endDateField.clearInvalid();
                    endTimeField.clearInvalid();
                } else {
                    beginTimeField.clearInvalid();
                    endTimeField.clearInvalid();
                    beginDateField.markInvalid('Einddatum moet na begindatum liggen');
                    endDateField.markInvalid('Einddatum moet na begindatum liggen');
                }

                Ext.getCmp('adddatebtn').setDisabled(!result);

                return result;
            }

        });


        this.items = [{
            xtype: 'form',
            reference: 'additemform',
            id: 'additemform',
            layout: 'fit',

            items: [{
                xtype: 'tabpanel',
                plain: true,
                items: [{
                    title: 'Tekst',
                    bodyPadding: 20,
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%',
                        labelWidth: 225
                    },
                    defaultType: 'textfield',
                    items: [{
                        fieldLabel: 'Titel',
                        name: 'title',
                        allowBlank: false,
                        emptyValue: 'titel',
                        value: 'title'
                    }, {
                        fieldLabel: 'Ondertitel',
                        name: 'subtitle'
                    }, {
                        xtype: 'suneditor',
                        fieldLabel: 'Tekst',
                        allowBlank: false,
                        name: 'text',
                        height: 350
                    }]
                }, {
                    title: 'Afbeelding',
                    bodyPadding: 20,
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%',
                        labelWidth: 225
                    },
                    items: [{
                        name: 'imageId',
                        xtype: 'imagefield',
                        fieldLabel: 'Afbeelding',
                        store: 'ItemImages',
                        imagesDir: 'resources/images/items/'
                    }]
                }, {
                    title: 'Wanneer',
                    layout: {
                        type: 'hbox'
                    },
                    bodyPadding: 10,
                    items: [{
                        xtype: 'panel',
                        flex: 1,
                        height: 400,
                        title: 'Datum',
                        dockedItems: [{
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [{
                                text: 'Datum toevoegen...',
                                reference: 'adddatebtn',
                                id: 'adddatebtn',
                                scope: this,
                                handler: function (btn) {
                                    var me = this;
                                    this.addDate(me, btn);
                                }
                            }]
                        }],
                        items: [{
                            xtype: 'checkboxfield',
                            fieldLabel: 'Meerdaags',
                            name: 'multipleDays',
                            reference: 'multipledays',
                            listeners: {
                                change: this.toggleMultipleDays
                            }
                        }, {
                            xtype: 'datefield',
                            name: 'beginDate',
                            fieldLabel: 'Begindatum',
                            format: 'D d F Y',
                            minValue: new Date(),
                            value: new Date(),
                            anchor: '100%',
                            vtype: 'singleDayEvent',
                            listeners: {
                                change: this.dateChanged
                            }
                        }, {
                            xtype: 'timefield',
                            fieldLabel: 'Begintijd',
                            name: 'beginTime',
                            value: '9:00',
                            vtype: 'singleDayEvent',
                            listeners: {
                                change: this.dateChanged
                            }
                        }, {
                            xtype: 'timefield',
                            name: 'endTime',
                            fieldLabel: 'Eindtijd',
                            value: '10:00',
                            vtype: 'singleDayEvent',
                            listeners: {
                                change: this.dateChanged
                            }
                        }, {
                            xtype: 'datefield',
                            fieldLabel: 'Einddatum',
                            format: 'D d F Y',
                            disabled: true,
                            name: 'endDate',
                            //id: 'endatefield',
                            // bind: {
                            //     disabled: '{!multipledays.checked}'
                            // },
                            listeners: {
                                change: this.dateChanged,
                                afterrender: this.endDateFieldRendered
                            }
                        }]
                    }, {
                        flex: 1,
                        xtype: 'datesfield',
                        id: 'datesfield',
                        name: 'dates',
                        height: 400,
                        msgTarget: 'under'
                    }]
                }, {
                    title: 'Waar',
                    bodyPadding: 15,
                    items: [{
                        xtype: 'fieldset',
                        border: 'none',

                        items: [{
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [{
                                xtype: 'radiofield',
                                boxLabel: 'Kies een locatie',
                                boxWidth: 200,
                                flex: 1,
                                checked: true,
                                inputValue: 1,
                                reference: 'choiceone',
                                name: 'location',
                                listeners: {
                                    change: function (field) {
                                        //console.log(field);
                                        var form = field.up('form').getForm(),
                                            combo = form.findField('locationId'),
                                            text = form.findField('shortLocation');
                                        combo.setDisabled(!field.checked);
                                        text.setDisabled(field.checked);
                                    }
                                }
                            }, {
                                xtype: 'combobox',
                                allowBlank: false,
                                flex: 2,
                                name: 'locationId',
                                store: 'ItemLocations',
                                displayField: 'name',
                                valueField: 'id',
                                queryMode: 'remote',
                                forceSelection: true,
                                emptyText: 'kies een locatie'
                            }]
                        }, {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [{
                                xtype: 'radiofield',
                                boxLabel: 'of geef omschrijving',
                                flex: 1,
                                inputValue: 2,
                                reference: 'choicetwo',
                                name: 'location'
                            }, {
                                xtype: 'textfield',
                                name: 'shortLocation',
                                allowBlank: false,
                                flex: 2,
                                disabled: true
                            }]
                        }]
                    }]
                }, {
                    title: 'Contact',
                    bodyPadding: 15,
                    items: [{
                        xtype: 'fieldset',
                        border: 'none',
                        //title: 'Telefoon',
                        items: [{
                            xtype: 'textfield',
                            labelWidth: 200,
                            fieldLabel: 'Telefoon',
                            name: 'phone',
                            anchor: '100%'
                        }]
                    }, {
                        xtype: 'fieldset',
                        border: 'none',
                        title: 'Internet',
                        defaultType: 'textfield',
                        defaults: {
                            anchor: '100%',
                            labelWidth: 200
                        },
                        items: [{
                            fieldLabel: 'Website',
                            name: 'url',
                            vtype: 'url'
                        }, {
                            fieldLabel: 'Email',
                            name: 'email',
                            vtype: 'email'
                        }]
                    }, {
                        xtype: 'fieldset',
                        defaultType: 'textfield',
                        border: 'none',
                        title: 'Bronvermelding',
                        defaults: {
                            anchor: '100%',
                            labelWidth: 200
                        },
                        items: [{
                            fieldLabel: 'Bron',
                            name: 'source'
                        }, {
                            fieldLabel: 'Bron website',
                            name: 'sourceURL',
                            vtype: 'url'
                        }]
                    }]
                }, {
                    title: 'Categorie',
                    layout: 'fit',
                    bodyPadding: 15,
                    items: [{
                        xtype: 'itemselector',
                        store: 'Categories',
                        name: 'categorySelector',
                        displayField: 'title',
                        valueField: 'id',
                        fromTitle: 'Categoriëen',
                        toTitle: 'Geselecteerd',
                        buttons: ['add', 'remove'],
                        buttonsText: {add: 'Toevoegen aan selectie', remove: 'Verwijder uit selectie'},
                        maxSelections: 3,
                        minSelections: 1,
                        msgTarget: 'under',
                        minSelectionsText: 'Selecteer minimaal {0} categorie!',
                        maxSelectionsText: 'Selecteer maximaal {0} categorieën'
                    }]
                }, {
                    title: 'Groep',
                    layout: 'fit',
                    bodyPadding: 15,
                    items: [{
                        xtype: 'itemselector',
                        store: 'Groups',
                        name: 'groupSelector',
                        displayField: 'name',
                        valueField: 'id',
                        fromTitle: 'Groepen',
                        toTitle: 'Geselecteerd',
                        buttons: ['add', 'remove'],
                        buttonsText: {add: 'Toevoegen aan selectie', remove: 'Verwijder uit selectie'},
                        maxSelections: 1,
                        minSelections: 0,
                        msgTarget: 'under',
                        minSelectionsText: 'Selecteer minimaal {0} groep!',
                        maxSelectionsText: 'Selecteer maximaal {0} groep',
                        listeners: {
                            afterrender: this.onGroupSelectorRendered
                        }
                    }]
                }, {
                    title: 'Opties',
                    bodyPadding: 15,
                    items: [{
                        xtype: 'fieldset',
                        border: 'none',
                        title: 'Opties',
                        defaults: {
                            labelWidth: 200,
                            anchor: '100%'
                        },
                        defaultType: 'checkboxfield',
                        items: [{
                            fieldLabel: 'Publiceer',
                            checked: true,
                            name: 'published',
                            inputValue: 1,
                            uncheckedValue: 0
                        }, {
                            fieldLabel: 'Permanent',
                            name: 'permanent',
                            inputValue: 1,
                            uncheckedValue: 0
                        }, {
                            fieldLabel: 'Voor bewoners',
                            name: 'general',
                            inputValue: 1,
                            uncheckedValue: 0
                        }]
                    }, {
                        xtype: 'fieldset',
                        title: 'Embargo',
                        border: 'none',
                        defaults: {
                            labelWidth: 200,
                            anchor: '100%'
                        },
                        items: [{
                            xtype: 'checkboxfield',
                            name: 'embargo',
                            fieldLabel: 'Onder embargo',
                            reference: 'embargo',
                            listeners: {
                                change: function (field) {
                                    Ext.getCmp('embargoenddate').setDisabled(!field.checked);
                                    Ext.getCmp('embargoendtime').setDisabled(!field.checked);
                                }
                            }
                        }, {
                            xtype: 'datefield',
                            anchor: '50%',
                            name: 'embargoEndDate',
                            id: 'embargoenddate',
                            format: 'D d F Y',
                            submitFormat: 'Y-m-d',
                            value: new Date(),
                            minValue: new Date(),
                            allowBlank: false,
                            fieldLabel: 'Datum',
                            disabled: true
                        }, {
                            xtype: 'timefield',
                            anchor: '50%',
                            fieldLabel: 'Tijd',
                            name: 'embargoEndTime',
                            id: 'embargoendtime',
                            value: '10:00',
                            allowBlank: false,
                            disabled: true
                        }]
                    }]
                }]
            }],

            buttons: [{
                text: 'Templates',
                xtype: 'splitbutton'
            }, {
                xtype: 'tbfill'
            }, {
                text: 'Reset',
                handler: function (btn) {
                    btn.up('form').reset();
                }
            }, {
                text: 'Annuleer',
                handler: function (btn) {
                    btn.up('window').close();
                }
            }, {
                text: 'Opslaan...',
                formBind: true,
                listeners: {
                    click: 'onSubmitAddItemForm'
                }
            }]
        }];

        this.callParent();
    },

    dateChanged: function () {
        var me = this,
            grid = Ext.getCmp('datesfield'),
            form = grid.up('form').getForm(),
            toggleMultiple = form.findField('multipleDays'),
            beginDateField = form.findField('beginDate'),
            beginTimeField = form.findField('beginTime'),
            endDateField = form.findField('endDate'),
            beginDate = beginDateField.getValue(),
            endDate = endDateField.getValue(),
            beginDatePlusDay = Ext.Date.add(beginDate, Ext.Date.DAY, 1);

        if (toggleMultiple.getValue()) {
            // multi days
            endDateField.setMinValue(beginDatePlusDay);
            if (beginDate > endDate) {
                endDateField.setValue(beginDatePlusDay);
            }
        }

    },

    toggleAddDateBtn: function (value) {
        var btn = Ext.getCmp('adddatebtn');
        btn.setDisabled(value);
    },

    toggleMultipleDays: function (btn, value) {
        var form = btn.up('form').getForm(),
            beginDateField = form.findField('beginDate'),
            beginTimeField = form.findField('beginTime'),
            endDateField = form.findField('endDate');

        endDateField.setDisabled(!btn.checked);

        if (value) {
            Ext.apply(beginDateField, {vtype: 'multiDayEvent'});
            beginDateField.clearInvalid();
            Ext.apply(form.findField('beginTime'), {vtype: 'multiDayEvent'});
            Ext.apply(form.findField('endDate'), {vtype: 'multiDayEvent'});
            Ext.apply(form.findField('endTime'), {vtype: 'multiDayEvent'});
        } else {
            Ext.apply(beginDateField, {vtype: 'singleDayEvent'});
            beginDateField.clearInvalid();
            Ext.apply(form.findField('beginTime'), {vtype: 'singleDayEvent'});
            Ext.apply(form.findField('endDate'), {vtype: 'singleDayEvent'});
            Ext.apply(form.findField('endTime'), {vtype: 'singleDayEvent'});
        }
    },

    addDate: function (win, btn) {
        var me = this,
            grid = Ext.getCmp('datesfield'),
            store = grid.store,
            form = win.down('form').getForm(),
            beginDate,
            endDate;
        switch (form.findField('multipleDays').getValue()) { // multiple days selected or not
            case true:
                // beginDate
                beginDate = new Date(form.findField('beginDate').getValue());
                beginDate.setHours(form.findField('beginTime').getValue().getHours());
                beginDate.setMinutes(form.findField('beginTime').getValue().getMinutes());
                // endDate
                endDate = new Date(form.findField('endDate').getValue());
                endDate.setHours(form.findField('endTime').getValue().getHours());
                endDate.setMinutes(form.findField('endTime').getValue().getMinutes());
                break;
            case false:
                // beginDate
                beginDate = new Date(form.findField('beginDate').getValue());
                beginDate.setHours(form.findField('beginTime').getValue().getHours());
                beginDate.setMinutes(form.findField('beginTime').getValue().getMinutes());
                // endDate
                endDate = new Date(form.findField('beginDate').getValue());
                endDate.setHours(form.findField('endTime').getValue().getHours());
                endDate.setMinutes(form.findField('endTime').getValue().getMinutes());
                break;
        }

        store.add({
            beginDate: beginDate,
            endDate: endDate
        });
    },

    onGroupSelectorRendered: function (selector) {
        var tool;
        tool = Ext.create('Ext.panel.Tool', {
            scope: this,
            tooltip: 'groepen bewerken...',
            type: 'gear',
            callback: function () {
                var groupEditor;
                groupEditor = Ext.create('groupeditor', {
                    store: this.store,
                    modal: true
                });
                groupEditor.show();
            }
        });
        selector.fromField.items.items[0].addTool(tool);
    },

    endDateFieldRendered: function () {
        var form = Ext.getCmp('additemform').getForm(),
            beginDate = form.findField('beginDate').getValue(),
            beginDatePlusDay = Ext.Date.add(beginDate, Ext.Date.DAY, 1),
            endDateField = form.findField('endDate');

        endDateField.setMinValue(beginDatePlusDay);
        endDateField.setValue(beginDatePlusDay);
    }
});