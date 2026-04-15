/**
 * Integración INEGI DENUE para Atlas de Riesgo Pabellón
 * Token: ea639e28-a617-47be-bf49-f0d430a7b91f
 */

const INEGI_TOKEN = "ea639e28-a617-47be-bf49-f0d430a7b91f";

// Función para cargar puntos desde la API de INEGI
async function cargarCapaDENUE(termino, color, iconPrefix) {
    // Entidad 01 (Ags), Municipio 006 (Pabellón)
    const url = `https://www.inegi.org.mx/app/api/denue/v1/consulta/BuscarAreaAct/01/006/0/0/0/0/0/0/0/${termino}/1/100/0/${INEGI_TOKEN}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        data.forEach(p => {
            // Crear un marcador circular para el Atlas de Riesgo
            L.circleMarker([parseFloat(p.Latitud), parseFloat(p.Longitud)], {
                radius: 6,
                fillColor: color,
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            })
            .addTo(map) // Asume que tu objeto de mapa se llama 'map'
            .bindPopup(`
                <div style="font-family:sans-serif;">
                    <b style="color: ${color};">${p.Nombre}</b><br>
                    <small>${p.Clase}</small><br>
                    <hr size="1">
                    <b>Personal:</b> ${p.Estrato}<br>
                    <b>Dirección:</b> ${p.Calle}, ${p.Colonia}
                </div>
            `);
        });
        console.log(`Cargados ${data.length} puntos de ${termino}`);
    } catch (e) {
        console.error("Error INEGI:", e);
    }
}

// Iniciar carga al cargar el script
// Buscamos elementos clave para un Atlas de Riesgo:
cargarCapaDENUE("gasolinera", "#ff5722"); // Naranja: Riesgo de incendio
cargarCapaDENUE("hospital", "#f44336");   // Rojo: Centros de salud
cargarCapaDENUE("escuela", "#2196f3");    // Azul: Población vulnerable
cargarCapaDENUE("industria", "#9c27b0");  // Morado: Riesgo tecnológico
