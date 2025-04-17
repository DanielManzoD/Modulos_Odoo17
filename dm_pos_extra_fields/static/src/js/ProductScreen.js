/** @odoo-module **/
import { patch } from "@web/core/utils/patch";
import RestrictStockPopup from "@dm_pos_extra_fields/js/RestrictStockPopup";
import { PosStore } from "@point_of_sale/app/store/pos_store";

patch(PosStore.prototype, {
    async addProductToCurrentOrder(...args) {
        const product = args[0]; // Producto seleccionado
        const quantity = 1; // Cantidad predeterminada
        let productDetails;

        // 1. Llamar a getProductInfo para obtener detalles del producto
        try {
            productDetails = await this.getProductInfo(product, quantity);
            console.log("Detalles del producto:", productDetails);

            // Validar que la estructura de datos sea correcta
            if (!productDetails.productInfo || !productDetails.productInfo.warehouses) {
                console.error("No se encontraron almacenes en la información del producto.");
                return; // Cancelar la operación si no hay datos válidos
            }
        } catch (error) {
            console.error("Error al obtener detalles del producto:", error);
            return; // Cancelar si falla la llamada
        }

        // 2. Leer pos_warehouse_name y comparar con available_quantity
        const warehouseName = this.config.pos_warehouse_name; // El nombre del almacén configurado
        const warehouse = productDetails.productInfo.warehouses.find(
            (w) => w.name === warehouseName
        );

        if (warehouse) {
            // Obtener la cantidad disponible en el almacén
            let availableQuantity = warehouse.available_quantity;

            // Obtener la cantidad actual del producto en el pedido
            const currentOrder = this.get_order(); // Obtener la orden actual
            const existingLine = currentOrder.get_orderlines().find(
                (line) => line.product.id === product.id
            );
            const currentQuantityInOrder = existingLine ? existingLine.quantity : 0;

            // Restar la cantidad ya añadida al pedido de la cantidad disponible
            availableQuantity -= currentQuantityInOrder;

            // Si no hay stock disponible teniendo en cuenta las cantidades añadidas
            if (availableQuantity <= 0) {
                const confirmed = await this.popup.add(RestrictStockPopup, {
                    body: `${product.display_name} tiene ${warehouse.available_quantity} unidades disponibles en el almacén ${warehouseName}. Actualmente hay ${currentQuantityInOrder} en el pedido.`,
                    pro_id: product.id,
                });

                if (!confirmed) {
                    return; // Cancelar si el usuario no confirma
                }
            }
        } else {
            console.warn(
                `El almacén configurado (${warehouseName}) no se encontró en la información del producto.`
            );
        }

        // 3. Agregar el producto al pedido
        return await super.addProductToCurrentOrder(...args);
    },
});
