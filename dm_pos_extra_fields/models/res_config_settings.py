# -*- coding: utf-8 -*-

from odoo import fields, models


class ResConfigSettings(models.TransientModel):
    """Inherited res configuration setting for adding fields for
                restricting out-of-stock products"""
    _inherit = 'res.config.settings'

    is_display_stock = fields.Boolean(related="pos_config_id.is_display_stock",
                                      string="Muestra el stock disponible",
                                      readonly=False,
                                      help="Habilita para ver la cantidad disponible "
                                           "en el POS directamente.")
    is_restrict_product = fields.Boolean(
        related="pos_config_id.is_restrict_product",
        string="Restringir productos sin stock", readonly=False,
        help="Habilita para prohibir la seleccion de productos sin stock")
    stock_type = fields.Selection(related="pos_config_id.stock_type",
                                  string="Tipo de Stock", readonly=False,
                                  help="En que tipo de stock"
                                       "quieres que se prohiba en pos.")


    # Nuevos campos personalizados
    texto_scam = fields.Text(
        string="Texto SCAM",
        help="Introduce un texto que será utilizado como encabezado o pie."
    )
    titulo_scam = fields.Char(
        string="Título SCAM",
        help="Texto corto para usar como un título breve."
    )
  
    
        


    receipt_template_value = fields.Text(
        string="Receipt Template Content",
        help="Contenido de la plantilla seleccionada.",
        readonly=False,
    )

    receipt_template_id = fields.Many2one(
        "pos.receipt.template",
        string="Receipt Template",
        default=lambda self: self.env.ref("your_module_name.standard_receipt_template", raise_if_not_found=False),
    )

   

    def get_values(self):
        """Obtiene los valores de configuración desde el POS."""
        res = super(ResConfigSettings, self).get_values()
        pos_config = self.env['pos.config'].search([], limit=1)  # Obtén una configuración de referencia
        if pos_config:
            res.update({
                'texto_scam': pos_config.texto_scam,
                'titulo_scam': pos_config.titulo_scam,
                'receipt_template_id': pos_config.receipt_template_id.id,
                'receipt_template_value': pos_config.receipt_template_value,  # Recupera el contenido guardado
            })
        return res

    def set_values(self):
        """Guarda los valores en todas las configuraciones de POS."""
        super(ResConfigSettings, self).set_values()
        pos_configs = self.env['pos.config'].search([])  # Obtén todas las configuraciones de POS
        pos_configs.write({
            'texto_scam': self.texto_scam,
            'titulo_scam': self.titulo_scam,
            'receipt_template_id': self.receipt_template_id.id,
            'receipt_template_value': self.receipt_template_id.value,  # Actualiza el contenido
        })



