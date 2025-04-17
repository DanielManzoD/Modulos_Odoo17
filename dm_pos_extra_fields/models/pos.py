from odoo import models, fields, api

class PosSession(models.Model):
    _inherit = 'pos.session'

    def load_pos_data(self):
        # Llamamos al método original para cargar los datos
        data = super(PosSession, self).load_pos_data()

        # Obtener el picking type_id dinámicamente desde pos.config
        pos_config = self.config_id  # Obtener la configuración del POS actual
        picking_type_id = pos_config.picking_type_id.id  # Obtener el picking type asociado a este POS

        # Si hay un picking type válido, obtener el warehouse_id y warehouse_name
        picking_type = self.env['stock.picking.type'].browse(picking_type_id)
        if picking_type and picking_type.warehouse_id:
            poswarehouse_value = picking_type.warehouse_id.id
            warehouse_name = picking_type.warehouse_id.name  # Obtener el nombre del almacén
        else:
            poswarehouse_value = None  # Si no hay warehouse asociado, poner None
            warehouse_name = None  # También poner None si no hay warehouse asociado

        # Agregar los valores calculados de 'pos_warehouse' y 'pos_warehouse_name' al diccionario de datos
        data['pos.config']['pos_warehouse'] = poswarehouse_value
        data['pos.config']['pos_warehouse_name'] = warehouse_name

        return data
