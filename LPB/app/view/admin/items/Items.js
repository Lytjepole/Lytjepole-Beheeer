/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.items.Items', {
    extend: 'Ext.grid.Panel',

    requires: [
        'LPB.view.admin.items.ItemsModel',
        'LPB.view.admin.items.ItemsController',
        'LPB.view.admin.items.windows.AddItem',
        'LPB.view.admin.items.windows.EditItem',
        'LPB.view.admin.items.windows.groupEditor',
        'LPB.view.admin.items.panels.DatesGrid'  
    ],

    viewModel: {
        type: 'items'
    },

    controller: 'items',

    reference: 'itemsgrid',
    store: 'Items',

    features: [{
        ftype: 'grouping',
        collapsible: true,
        id: 'titleGrouping',
        hideGroupedHeader: true,
        startCollapsed: true,
        groupHeaderTpl: '<b>{name}</b> ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})<br /> <span style="font-weight: normal; font-style: italic">{[values.rows[0].data.subtitle]}</span>'
    }],

    hideHeaders: true,
    autoScroll: true,

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Toevoegen',
            iconCls: 'fa fa-plus',
            listeners: {
                click: 'onAddItemBtnClick'
            }
        }, {
            text: 'Wijzig',
            iconCls: 'fa fa-edit',
            bind: {
                disabled: '{!itemsgrid.selection}'
            },
            listeners: {
                click: 'onEditItemBtnClick'
            }
        }, {
            text: 'Verwijder',
            iconCls: 'fa fa-trash',
            bind: {
                disabled: '{!itemsgrid.selection}'
            },
            listeners: {
                click: 'onDeleteItemBtnClick'
            }
        }, {
            xtype: 'tbfill'
        }, {
            xtype: 'tool',
            type: 'expand',
            handler: 'onToolCollapseClick'
        }, {
            xtype: 'tool',
            type: 'collapse',
            handler: 'onToolExpandClick'
        }]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            xtype: 'dateslider',
            reference: 'datesfilter',
            width: 400,
            fieldLabel: 'Datum filter',
            dateFormat: 'j-n-Y',
            dateIncrement: Ext.Date.DAY,
            values: [Ext.Date.format(new Date(), "j-n-Y"), Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, 12), "j-n-Y")],
            minDate: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, -12), "j-n-Y"),
            maxDate: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, 12), "j-n-Y"),
            listeners: {
                changecomplete: 'onDateFilterChanged'
            }
        }, {
            xtype: 'tool',
            type: 'restore',
            tooltip: 'reset datum filter...',
            callback: 'onDateFilterReset'
        }, {
            xtype: 'combobox',
            width: 300,
            store: 'UsersStore',
            valueField: 'id',
            displayField: 'fullName',
            triggers: {
                clear: {
                    scope: this,
                    cls: 'x-form-clear-trigger',
                    tooltip: 'reset zoekopdracht',
                    handler: function (field) {
                        field.clearValue();
                    }
                }
            },
            listeners: {
                change: 'onUserFilterChanged'
            }
        }]
    }, {
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'Items',
        displayInfo: true,
        listeners: {
            afterrender: 'toolbarafterrender'
        }
    }],

    columns: [{
        xtype: 'rownumberer'
    }, {
        dataIndex: 'beginDate',
        width: 200,
        renderer: function (value, metaData, record) {
            var beginDate = record.get('beginDate'),
                endDate = record.get('endDate');

            if (Ext.Date.getDayOfYear(beginDate) === Ext.Date.getDayOfYear(endDate)) {
                return Ext.Date.format(beginDate, 'd F Y H:i') + '-' + Ext.Date.format(endDate, 'H:i');
            } else {
                return Ext.Date.format(beginDate, 'd F Y H:i') + '<br />t/m<br />' + Ext.Date.format(endDate, 'd F Y H:i');
            }
        }
    }, {
        dataIndex: 'imageId',
        width: 88,
        renderer: function (value, metaData, record) {
            var id = Ext.id(),
                image;
            image = Ext.create('LPB.model.Image', {
                id: value,
                width: 75,
                height: 75
            });
            image.load({
                scope: this,
                success: function (record, operation) {
                    var renderImage = function (record) {
                        if (Ext.getElementById(id)) {
                            placeholder = new Ext.Img({
                                renderTo: id,
                                width: 75,
                                height: 75,
                                src: 'resources/images/items/75x75/' + record.get('imagePath'),
                                alt: record.get('imageName'),
                                title: record.get('imageName')
                            });
                        }
                    };
                    Ext.Function.defer(renderImage, 250, this, [record]);
                },
                failure: function (record, operation) {
                    var renderImage = function (record) {
                        if (Ext.getElementById(id)) {
                            placeholder = new Ext.Img({
                                renderTo: id,
                                width: 75,
                                height: 75,
                                src: 'resources/images/logo/lytjepole.png'
                            });
                        }
                    };
                    Ext.Function.defer(renderImage, 250, this, [record]);
                }
            });
            return '<div style="height:75px;" id="' + id + '"></div>';
        }
    }, {
        text: 'kiekeboe',
        dataIndex: 'text',
        flex: 2,
        renderer: function (value, metaData, record) {
            return Ext.util.Format.ellipsis(value, 200, true);
        }
    }, {
        dataIndex: 'locationId',
        flex: 1,
        renderer: function (value, metaData, record) {
            var text;

            if (record.get('locationId')) {
                text = record.get('name') + ' (' + record.get('street') + (record.get('number') > 0 ? ' ' + record.get('number') : '') + ')';
            } else {
                text = record.get('shortLocation');
            }
            return text;
        }
    }, {
        xtype: 'actioncolumn',
        width: 150,
        items: [{
            dataIndex: 'highlight',
            getClass: function (value, metadata, record, row, col, store) {
                return record.get('highlight') ? 'x-fa fa-star' : 'x-fa fa-star-o';
            },
            getTip: function (value, metadata, record, row, col, store) {
                return record.get('highlight') ? 'item is highlight' : 'item is geen highlight';
            },
            isDisabled: function (view, rowIndex, colIndex, item, record) {
                return (new Date() > record.get('endDate'));
            },
            handler: 'onActionHighlightClick'
        }, {
            getClass: function (value, metadata, record, row, col, store) {
                return record.get('published') ? 'x-fa fa-eye' : 'x-fa fa-eye-slash';
            },
            getTip: function (value, metadata, record, row, col, store) {
                return record.get('published') ? 'item is gepubliceerd' : 'item is niet gepubliceerd';
            },
            isDisabled: function (view, rowIndex, colIndex, item, record) {
                return (new Date() > record.get('endDate'));
            },
            handler: 'onActionPublishedClick'
        }, {
            iconCls: 'x-fa fa-edit',
            tooltip: 'Item wijzigen...',
            isDisabled: function (view, rowIndex, colIndex, item, record) {
                return (new Date() > record.get('endDate'));
            },
            handler: 'onActionEditClick'
        }, {
            iconCls: 'x-fa fa-remove',
            tooltip: 'Item verwijderen...',
            isDisabled: function (view, rowIndex, colIndex, item, record) {
                return (new Date() > record.get('endDate'));
            },
            handler: 'onActionDeleteClick'
        }, {
            iconCls: 'x-fa fa-copy',
            tooltip: 'Kopieer als nieuw item...',
            handler: 'onActionCopyNewClick'
        }]
    }],

    listeners: {
        afterrender: 'afterUserGridRender',
        itemdblclick: 'onItemDblClick'
    }
});