from odoo import models, fields, api

class PosSession(models.Model):
    _inherit = 'pos.session'

    def _get_pos_ui_product_product(self, params):
        """ Extiende la carga de productos en el POS para incluir stock por almacén """
        result = super()._get_pos_ui_product_product(params)

        # Obtener todos los almacenes
        warehouses = self.env['stock.warehouse'].search([])
        
        # Crear un diccionario con el stock por almacén para cada producto
        product_ids = [product['id'] for product in result]
        products = self.env['product.product'].browse(product_ids)

        warehouse_stock_data = {}
        for product in products:
            warehouse_stock_data[product.id] = []
            for warehouse in warehouses:
                qty_available = product.with_context(warehouse=warehouse.id).qty_available
                forecasted_qty = product.with_context(warehouse=warehouse.id).virtual_available

                warehouse_stock_data[product.id].append({
                    'warehouse_name': warehouse.name,
                    'warehouse_id': warehouse.id,
                    'available_quantity': qty_available,
                    'forecasted_quantity': forecasted_qty,
                    'uom': product.uom_id.name,
                    'qty': qty_available,
                    
                })

        # Agregar la información de stock al resultado de los productos
        for product in result:
            product['warehouse_stock'] = warehouse_stock_data.get(product['id'], [])

        return result





class PosSession(models.Model):
    """Inherited pos session for loading quantity fields from product"""
    _inherit = 'pos.session'

    def _loader_params_product_product(self):
        """Load forcast and on hand quantity field to pos session.
           :return dict: returns dictionary of field parameters for the
                        product model
        """
        result = super()._loader_params_product_product()
        result['search_params']['fields'].append('qty_available')
        result['search_params']['fields'].append('virtual_available')
        result['search_params']['fields'].append('barcode')

        return result


    
