# -*- coding: utf-8 -*-
from odoo import models, fields, api

class PosReceiptTemplate(models.Model):
    _name = "pos.receipt.template"
    _description = "POS Receipt Template"

    name = fields.Char("Template Name", required=True)  # Nombre de la plantilla
    value = fields.Text("Template Content", readonly=False)  # Contenido de la plantilla (HTML/CSS)

    # Método para cargar el dominio de datos en el cliente POS
    @api.model
    def _load_pos_data_domain(self, data):
        """
        Filtra las plantillas según la configuración activa del POS.
        """
        if not data.get('pos.config') or not data['pos.config'].get('data'):
            return []  # Retorna vacío si no hay datos válidos

        config_id = self.env['pos.config'].browse(data['pos.config']['data'][0]['id'])
        return [('id', '=', config_id.receipt_template_id.id)]  # Filtra por la plantilla configurada

    # Método para especificar los campos sincronizados en el cliente POS
    @api.model
    def _load_pos_data_fields(self, config_id):
        """
        Define los campos que serán enviados al cliente POS.
        """
        return ['id', 'name', 'value']
