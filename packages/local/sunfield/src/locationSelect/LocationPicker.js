Ext.define('Ext.sunfield.locationSelect.LocationPicker', {
    extend: 'Ext.window.Window',

    alias: 'widget.locationpicker',
    reference: 'locationpickerwindow',

    title: 'Kies een locatie op de kaart',
    iconCls: 'fa fa-map-marker',

    modal: true,
    width: 700,
    height: 600,

    layout: 'fit',

    locationData: null,
    initLocation: null,

    initComponent: function () {
        var me = this,
            markers = [],
            infowindows = [];

        Ext.apply(me, {

            setLocation: function (pos, marker, map) {
                var geoCoder = new google.maps.Geocoder(),
                    infoWindow = new google.maps.InfoWindow(),
                    statusBar = Ext.getCmp('locationpickerstatusbar'),
                    result;

                statusBar.setStatus({
                    text: 'zoeken...',
                    iconCls: 'x-status-busy'
                });

                geoCoder.geocode({location: pos, language: 'nl'}, function (response, status) {
                    infoWindow.setContent(response[0].formatted_address);
                    infoWindow.open(map, marker);
                    infowindows.push(infoWindow);
                    if (status === 'OK') {
                        result = me.processResult(response);
                        me.locationData = result;
                        me.setStatus(result.street + ' ' + result.number + ', ' + result.city, 'x-status-valid');
                    }
                });
            },

            setStatus: function (text, cls) {
                var statusBar = Ext.getCmp('locationpickerstatusbar');
                statusBar.setStatus({
                    text: text,
                    iconCls: cls
                });
            },

            processResult: function (response) {
                var result = [],
                    pos,
                    locationType = response[0].geometry.location_type;
                if (locationType === 'ROOFTOP' || locationType === 'RANGE_INTERPOLATED') {
                    result.street = response[0].address_components[1].long_name;
                    result.number = response[0].address_components[0].long_name;
                    result.zip = response[0].address_components[6].long_name; // complete zip code
                    result.city = response[0].address_components[2].long_name;
                } else {
                    result.street = response[0].address_components[0].long_name;
                    result.number = '';
                    result.zip = response[0].address_components[5].long_name;
                    result.city = response[0].address_components[1].long_name;
                }

                pos = markers[0].getPosition();
                result.lat = pos.lat();
                result.lng = pos.lng();
                return result;
            },

            submitLocation: function (btn) {
                console.log('submitting', me.locationData);
                if (me.locationData !== null) {
                    me.fireEvent('submitLocation', me.locationData);
                } else {
                    Ext.Msg.alert('Geen selectie', 'Selecteer een locatie');
                }
            },

            resetMap: function () {
                var pos,
                    statusBar = Ext.getCmp('locationpickerstatusbar');
                console.log('reset map', me.initLocation);

                if (me.initLocation.lat) {
                    pos = new google.maps.LatLng(me.initLocation.lat, me.initLocation.lng);
                    //console.log('init loca set', markers[0].map, infowindows);
                    infowindows[0].close();
                    markers[0].setPosition(pos);
                    //address = me.processResult(pos);
                    me.setLocation(pos, markers[0], markers[0].map);
                    markers[0].map.setCenter(pos);
                    markers[0].map.setZoom(16);
                } else {
                    pos = me.defaultLocation;
                    if (infowindows[0]) {
                        infowindows[0].close();
                    }
                    markers[0].setPosition(pos);
                    me.setLocation(pos, markers[0], markers[0].map);
                    markers[0].map.setCenter(pos);
                    markers[0].map.setZoom(16);
                }
            },

            items: [{
                xtype: 'gmappanel',
                gmapType: 'map',
                mapOptions: {
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    streetViewControl: false,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                    },
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.SMALL
                    }
                },
                center: {
                    lat: 53.478692755298205,
                    lng: 6.162159643620724
                },
                listeners: {
                    mapready: function (map) {
                        var marker,
                            pos, // = new google.maps.LatLng(53.478692755298205, 6.162159643620724),
                            statusBar = Ext.getCmp('locationpickerstatusbar');

                        if (me.initLocation.lat > 0 && me.initLocation.lng > 0) {
                            pos = new google.maps.LatLng(me.initLocation.lat, me.initLocation.lng);
                        } else {
                            pos = new google.maps.LatLng(53.478692755298205, 6.162159643620724);
                        }

                        marker = new google.maps.Marker({
                            title: 'Verplaats mij...',
                            draggable: true,
                            icon: 'resources/images/icons/location-pointer.png',
                            position: pos,
                            map: this.gmap
                        });

                        this.gmap.setCenter(pos);
                        markers.push(marker);

                        statusBar.setStatus({
                            text: 'Kies een locatie...',
                            iconCls: 'x-status-valid'
                        });

                        // set status and select location
                        if (me.initLocation.lat > 0 && me.initLocation.lng > 0) {
                            me.setLocation(pos, marker, this.gmap);
                        }
                        google.maps.event.addListener(marker, 'dragend', function (pos) {
                            me.setLocation(pos.latLng, marker, this.getMap());
                        });
                        google.maps.event.addListener(marker, 'dragstart', function (pos) {
                            for (i = 0;i < infowindows.length; i++) {
                                infowindows[i].close();
                            }
                            infowindows = [];
                        });
                    }
                }
            }],

            tbar: Ext.create('Ext.ux.StatusBar', {
                id: 'locationpickerstatusbar',
                text: 'kaart laden...',
                defaultIconCls: 'x-status-busy',
                items: [{
                    xtype: 'tbfill'
                }, {
                    text: 'Reset',
                    handler: function () {
                        me.resetMap();
                    }
                }, {
                    text: 'Kaart'
                }]
            }),

            buttons: [{
                text: 'Reset',
                handler: function () {
                    me.resetMap();
                }
            }, {
                text: 'Annuleer',
                handler: function () {
                    me.destroy();
                }
            }, {
                text: 'Ok',
                handler: function () {
                    me.submitLocation();
                }
            }]
        });

        me.callParent(arguments);
    }
});