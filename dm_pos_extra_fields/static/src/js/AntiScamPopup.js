/** @odoo-module */
import { AbstractAwaitablePopup } from "@point_of_sale/app/popup/abstract_awaitable_popup";

class AntiScamPopup extends AbstractAwaitablePopup {
    setup() {
        super.setup();
        // Obtener el texto scam desde props
        this.textoScam = this.props.textoScam  || "Texto predeterminado del AntiSCAM";
        this.tituloScam =this.props.tituloScam || "Titulo predeterminado del AntiSCAM";
    }

    async acceptAction() {
        if (this.props.pro_id) {
            console.log("Acción personalizada: Producto confirmado con ID", this.props.pro_id);
            
            // Lógica personalizada
            alert("Se confirmó la acción con el producto ID: " + this.props.pro_id);
            
            this.props.resolve(true); // Resolver el popup como aceptado
        }
        super.cancel(); // Cerrar correctamente el popup
    }
    
    
    cancel() {
        this.props.resolve(false);
        super.cancel();
    }
}

// Asociar el template con el componente
AntiScamPopup.template = 'AntiScamPopup';
export default AntiScamPopup;
