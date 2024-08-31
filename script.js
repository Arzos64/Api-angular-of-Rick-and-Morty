// variables que se van a utilizar para la paginación
let paginaActual = 1;
const resultadosPorPagina = 20;


// Función para obtener los personajes de la API

function obtenerPersonajes(pagina, hecho) {
    fetch(`https://rickandmortyapi.com/api/character?page=${pagina}`) // Hacer la petición a la API y concatena para pasar la página	
        .then(respuesta => respuesta.json())
        .then(datos => hecho(datos))
        .catch(error => console.error('Error al obtener los personajes:', error)); // en caso de error mostrar el error
}

function mostrarPersonajes(datos) {
    const principal = document.querySelector('main');
    principal.innerHTML = ''; // Limpiar los personajes existentes antes de mostrar los nuevos


    //creando la estructura de los personajes consumida por la api
    datos.results.forEach(personaje => {
        let articulo = document.createRange().createContextualFragment(`
            <div class="card">
                <img src="${personaje.image}" alt="${personaje.name}" class="card-img">
                <div class="card-content">
                    <h2 class="card-title">${personaje.name}</h2>
                    <p class="card-status">Estado: ${personaje.status}</p>
                    <p class="card-species">Especie: ${personaje.species}</p>
                </div>
            </div>
        `);
        principal.append(articulo); // Agregar el personaje al contenedor principal
    });
}


// Función para actualizar la página de personajes
function actualizarPagina(pagina) {
    obtenerPersonajes(pagina, mostrarPersonajes);
    paginaActual = pagina;
}

// Eventos para los botones de paginación (anterior y siguiente)
document.getElementById('prev-button').addEventListener('click', () => {
    if (paginaActual > 1) {
        actualizarPagina(paginaActual - 1);
    }
});

// Evento para el botón de siguiente página 
document.getElementById('next-button').addEventListener('click', () => {
    actualizarPagina(paginaActual + 1);
});

// Cargar la primera página inicialmente
actualizarPagina(paginaActual);









