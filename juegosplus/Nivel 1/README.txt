ESTRUCTURA DEL PROYECTO
=========================

index.html
- Página principal.
- Contiene la estructura HTML del juego.

css/
- estilos.css: hojas de estilo que estaban dentro del <style> del HTML.

js/
- juego.js: lógica interactiva que estaba dentro del <script> del HTML.

img/
- fondo.jpg: imagen que estaba incrustada directamente en el CSS como Base64.

IMPORTANTE
- El HTML original tenía CSS y JavaScript embebidos.
- También cargaba las fuentes Fraunces e Inter desde Google Fonts mediante Internet.
- No se detectaron archivos JavaScript externos mediante src=.
- La imagen de fondo estaba incrustada en Base64, por lo que se separó como archivo para dejar una estructura de proyecto más ordenada.
- Abre index.html en un navegador para ejecutar el proyecto.
