/**
 * Created by Peter on 25-1-2016.
 */
Ext.define('LPB.view.user.useritems.UserItems', {
    extend: 'Ext.grid.Panel',

    requires: [
        'LPB.view.user.useritems.UserItemsModel',
        'LPB.view.user.useritems.UserItemsController',
        'LPB.view.user.useritems.windows.SetFiltersWindow',
        'LPB.view.user.useritems.windows.AddUserItemWindow',
        'LPB.view.user.useritems.windows.EditUserItemWindow'
    ],

    viewModel: {
        type: 'useritems'
    },

    controller: 'useritems',
    reference: 'useritems',

    bind: '{userItems}',

    features: [{
        ftype: 'grouping',
        collapsible: true,
        id: 'titleGrouping',
        hideGroupedHeader: true,
        startCollapsed: true,
        groupHeaderTpl: '<b>{name}</b> ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})<br /> <span style="font-weight: normal; font-style: italic">{[values.rows[0].data.subtitle]}</span>'
    }],

    hideHeaders: true,

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Toevoegen',
            iconCls: 'fa fa-plus',
            handler: 'onAddItemBtnClick'
        }, {
            text: 'Wijzig',
            iconCls: 'fa fa-edit',
            bind: {
                disabled: '{!useritems.selection}'
            }

        }, {
            text: 'Verwijder',
            iconCls: 'fa fa-trash',
            bind: {
                disabled: '{!useritems.selection}'
            }
        }, {
            xtype: 'tbfill'
        }, {
            xtype: 'tool',
            type: 'expand'
        }, {
            xtype: 'tool',
            type: 'collapse'
        }, {
            xtype: 'tbseparator'
        }, {
            iconCls: 'x-fa fa-filter',
            tooltip: 'filters instellen...',
            handler: 'showFilterWindow'
        }]
    }],

    columns: [{
        xtype: 'rownumberer',
        width: 30,
        height: 88
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
        height: 100,
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
                                alt: record.get('imageName')
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
        cellWrap: true,
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
            }
        }, {
            getClass: function (value, metadata, record, row, col, store) {
                //return record.get('published') ? 'x-fa fa-check' : 'x-fa fa-ban';
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
    }]
});