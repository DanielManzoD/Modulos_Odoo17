# -*- coding: utf-8 -*-

from odoo import fields, models


class PosConfig(models.Model):
    """Inherited pos configuration setting for adding some
            fields for restricting out-of stock"""
    _inherit = 'pos.config'

    is_display_stock = fields.Boolean(string="Mostrar Piezas en POS",
                                      help="Enable if you want to show "
                                           "quantity of products")
    is_restrict_product = fields.Boolean(
        string="Bloquear productos sin existencia",
        help="Enable if you want restrict of stock product from pos")
    stock_type = fields.Selection([('qty_on_hand', 'en Fisico'),
                                   ('virtual_qty', 'en Espera'),
                                   ('both', 'Ambos')], required=True,
                                  default='qty_on_hand', string="Tipo de Stock",
                                  help="elige que tipo de stock"
                                       " quieres restringir y mostrar el POS")

    texto_scam = fields.Text(
        string="Texto SCAM",
        help="Texto que será usado como encabezado o pie de página."
    )
    
    titulo_scam = fields.Char(
        string="Título SCAM",
        help="Texto breve que será usado como título."
    )

    receipt_template_id = fields.Many2one(
        "pos.receipt.template",
        string="Receipt Template",
    )

    receipt_template_value = fields.Text(
        string="Receipt Template Content",
        help="Contenido de la plantilla seleccionada.",
        readonly=False,
    )
