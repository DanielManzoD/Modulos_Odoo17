{
    'name': 'Informacion Adicional en POS',
    'version': '1.3',
    'category': 'Point of Sale',
    'description': """Modulo para poder configurar la vista de elementos extra en el punto de venta.
    Este es un módulo personalizado AGPL-3. """,
    'author': 'Daniel Manzo',
    
    'depends': ['point_of_sale'],
    'data': [
        'views/res_config_settings_views.xml',
        'views/pos_assets_extension.xml',
        'security/ir.model.access.csv',
    ],
    'assets': {
        'point_of_sale._assets_pos': [
            '/dm_pos_extra_fields/static/src/js/RestrictStockPopup.js',
            '/dm_pos_extra_fields/static/src/js/AntiScamPopup.js',
            '/dm_pos_extra_fields/static/src/js/ProductScreen.js',
            '/dm_pos_extra_fields/static/src/js/pos_stock.js',
            '/dm_pos_extra_fields/static/src/js/pos_popup.js',
            '/dm_pos_extra_fields/static/src/css/display_stock.css',
            '/dm_pos_extra_fields/static/src/xml/ProductItem.xml',
            '/dm_pos_extra_fields/static/src/xml/RestrictStockPopup.xml',
            '/dm_pos_extra_fields/static/src/xml/AntiScamPopup.xml',
            '/dm_pos_extra_fields/static/src/xml/custom_receipt.xml',
            
            
        ],
    },
    'license': 'AGPL-3',
    'installable': True,
    'auto_install': False,
    'application': False,
}