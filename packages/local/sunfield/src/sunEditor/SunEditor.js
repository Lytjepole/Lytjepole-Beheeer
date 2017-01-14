Ext.define('Ext.sunfield.sunEditor.SunEditor', {
    extend: 'Ext.form.HtmlEditor',

    alias: 'widget.suneditor',

    /**
     * @cfg {bool} disable options by default.
     */
    enableColors: false,
    enableFontSize: false,
    enableFont: false,
    enableAlignments: false,
    fontFamilies: ['Arial'],
    defaultFont: 'Arial',

    getErrors: function (value) {
        var me = this,
            errors = [];
        //console.log(me.value);
        if (value < 1) {
            errors.push('Tekst mag niet leeg zijn...');
        }
        return errors;
    }
});