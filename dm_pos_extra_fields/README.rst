.. image:: https://img.shields.io/badge/licenses-AGPL--3-blue.svg
    :target: https://www.gnu.org/licenses/agpl-3.0-standalone.html
    :alt: License: AGPL-3

Informacion Adicional en POS1
=============================
Este módulo permite configurar la vista de elementos extra en el punto de venta, mostrando información adicional y controlando los productos fuera de stock.

Configuración
=============
No se requiere configuración adicional.

Créditos
--------
Este módulo se basa en el módulo original `Display Stock in POS | Restrict Out-of-Stock Products in POS` de Cybrosys Techno Solutions.

Contribuidores:
- Daniel Manzo
- Raneesha M K
- Anjhana A K



Licencia
--------
Licencia Pública General Affero v3.0 (AGPL v3)
(https://www.gnu.org/licenses/agpl-3.0-standalone.html)

Archivos Incluidos
==================
Este módulo incluye los siguientes archivos:

- JavaScript:
  - /dm_pos_extra_fields/static/src/js/RestrictStockPopup.js
  - /dm_pos_extra_fields/static/src/js/ProductScreen.js
  - /dm_pos_extra_fields/static/src/js/OrderScreen.js

- CSS:
  - /dm_pos_extra_fields/static/src/css/display_stock.css

- XML:
  - /dm_pos_extra_fields/static/src/xml/ProductItem.xml
  - /dm_pos_extra_fields/static/src/xml/RestrictStockPopup.xml

Instalación
===========
Para instalar este módulo, simplemente añade los archivos a tu instancia de Odoo y asegúrate de que la dependencia `point_of_sale` esté presente.
