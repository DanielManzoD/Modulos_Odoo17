/** @odoo-module **/

import RestrictStockPopup from "@dm_pos_extra_fields/js/RestrictStockPopup";

function validateStockAndInform(orderline, quantity) {
    const currentQuantity = orderline.quantity;
    const product = orderline.product;
    const posConfig = orderline.pos.config;

    // Si la cantidad no cambia o es 0, no hacemos nada
    if (quantity === currentQuantity || quantity === 0) {
        return;
    }

    // Obtener la cantidad adicional
    const additionalQuantity = quantity - currentQuantity;

    // Obtener información del producto desde el backend
    orderline.pos.getProductInfo(product, additionalQuantity).then((productDetails) => {
        if (!productDetails.productInfo || !productDetails.productInfo.warehouses) {
            console.warn("No se encontraron almacenes en la información del producto.");
            return;
        }

        const warehouseName = posConfig.pos_warehouse_name; // Almacén configurado
        const warehouse = productDetails.productInfo.warehouses.find(
            (w) => w.name === warehouseName
        );

        if (warehouse) {
            let availableQuantity = warehouse.available_quantity;

            // Ajustar la cantidad disponible con las cantidades en la orden actual
            const currentOrderQuantity = orderline.order
                .get_orderlines()
                .filter((line) => line.product.id === product.id)
                .reduce((sum, line) => sum + line.quantity, 0);

            availableQuantity -= (currentOrderQuantity - orderline.quantity);

            // Mostrar popup si se excede el stock
            if (quantity > availableQuantity) {
                orderline.pos.popup.add(RestrictStockPopup, {
                    body: `${product.display_name} excede el stock disponible en el almacén ${warehouseName}. Disponible: ${availableQuantity}`,
                });
            }
        } else {
            console.warn(`El almacén configurado (${warehouseName}) no se encontró en la información del producto.`);
        }
    }).catch((error) => {
        console.error("Error al obtener detalles del producto:", error);
    });
}