/** @odoo-module */
import { AbstractAwaitablePopup } from "@point_of_sale/app/popup/abstract_awaitable_popup";

class RestrictStockPopup extends AbstractAwaitablePopup {
    async _OrderProduct() {
        if (this.props.pro_id) {
            this.props.resolve(true); 
        }
        super.cancel(); // Cerrar correctamente el popup
    }
    
    cancel() {
        this.props.resolve(false);
        super.cancel();
    }
}

RestrictStockPopup.template = 'RestrictStockPopup';
export default RestrictStockPopup;
