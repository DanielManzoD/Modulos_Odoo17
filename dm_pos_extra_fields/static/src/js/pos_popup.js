/** @odoo-module **/

import AntiScamPopup from "@dm_pos_extra_fields/js/AntiScamPopup";
import { patch } from "@web/core/utils/patch";
import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { parseXML } from '@web/core/utils/xml';

patch(ProductScreen.prototype, {
    async setup() {
        super.setup();

        try {
            // Obtener el contexto de Owl desde this.__owl__
            const owl = this.__owl__;
            const scamTemplateXmlString = this.pos.config.receipt_template_value;
            
            // Verificar que owl y owl.app existen antes de usarlos
            if (!owl || !owl.app || !owl.app.templates) {
                throw new Error("Owl no está inicializado correctamente en este contexto.");
            }

            // Registro global de la plantilla CustomScamTemplate desde receipt_template_value
            if (!owl.app.templates["CustomScamTemplate"]) {
                console.log("Intentando parsear y registrar la plantilla...");

                try {
                    // Parsear el contenido del XML
                    const template = parseXML(scamTemplateXmlString);

                    console.log("Resultado del parseXML:", template);

                    if (!template) {
                        throw new Error("La plantilla generada es inválida o nula.");
                    }

                    // Agregar la plantilla al registro de Owl (rawTemplates)
                    owl.app.rawTemplates["CustomScamTemplate"] = template;
                    console.log("Plantilla agregada a rawTemplates: CustomScamTemplate");
                } catch (parseError) {
                    console.error("Error durante el registro de la plantilla en Owl:", parseError);
                    this.renderedScam = "<div>Error en el registro de la plantilla</div>";
                    return; // Detener el proceso si hay un error en el registro
                }

                try {
                    // Compilar la plantilla manualmente
                    const compiledTemplate = owl.app.getTemplate("CustomScamTemplate");
                    console.log("Plantilla compilada manualmente: CustomScamTemplate");

                    this.template = "CustomScamTemplate";
                    console.log("Plantilla asignada correctamente: CustomScamTemplate.");
                    console.log("Plantillas registradas en Owl después del registro:", owl.app.templates);
                    console.log("Raw templates en Owl:", owl.app.rawTemplates);
                } catch (compileError) {
                    console.error("Error durante la compilación de la plantilla en Owl:", compileError);
                    this.renderedScam = "<div>Error en la compilación de la plantilla</div>";
                }
            } else {
                console.log("CustomScamTemplate ya está registrada.");
            }
        } catch (generalError) {
            console.error("Error general al registrar o compilar la plantilla CustomScamTemplate:", generalError);
        }
    },
});

patch(ProductScreen.prototype, {
    async setup() {
        super.setup();

        // Verificar si el popup debe mostrarse
        if (!this.popupAccepted) { // Solo mostrar si el estado es false
            console.log("El popup se mostrará porque el estado es false.", this.pos.popupAccepted);

            if (!this.pos.popup_shown) { // Evitar mostrar el popup múltiples veces
                this.pos.popup_shown = true;

                // Agregar el popup al sistema de popups del POS
                this.pos.popup.add(AntiScamPopup, {
                    body: "",
                    textoScam: this.pos.config.texto_scam, // Pasar el campo desde pos.config
                    pro_id: null, // Puedes pasar datos adicionales si lo necesita
                    tituloScam: this.pos.config.titulo_scam, // Pasar el campo desde pos.config
                }).then((confirmed) => {
                    if (confirmed) {
                        console.log("El usuario confirmó el popup.");
                        this.pos.popupAccepted = true; // Cambiar el estado al aceptar
                        console.log("Estado actual de popupAccepted:", this.pos.popupAccepted);
                    } else {
                        console.log("El usuario canceló el popup.");
                        this.popupAccepted = false; // Estado si cancela
                        console.log("Estado actual de popupAccepted:", this.popupAccepted);
                    }
                    this.popup_shown = false; // Resetear el estado del popup
                });
            }
        } else {

        }
    },
});









