let contador = 0;
document.querySelector('.boton').addEventListener('click', () => { 
    contador++;

    obtenerPersonajes(personajes => { 
        const principal = document.querySelector('section');
        principal.innerHTML = '';

        personajes.forEach(personaje => {
            const card = document.createRange().createContextualFragment(`
           <ul>
           <li>Nombre: ${personaje.name}</li>
           </ul>
            `);
            principal.append(card);
        });
    });
});





// Función para obtener los personajes de la API
function obtenerPersonajes(hecho) {
    fetch(`https://rickandmortyapi.com/api/character?page=${contador}`) // Hacer la petición a la API
        .then(response => response.json()) // Convierte la respuesta a JSON
        .then(datos => {
            let personajes = datos.results;
            hecho(personajes);// Llama a la función de callback con los datos
        })
        .catch(error => {
            console.error('Hubo un problema con la petición fetch:', error);
        });
}

// Llamar a la función 'obtenerPersonajes' pasando una función de callback
document.querySelector('button').addEventListener('click', () => {
    let input = document.querySelector('input').value;
    obtenerPersonajes(personajes => {
        let personaje = personajes.find(personaje => personaje.name === input);
        const principal = document.querySelector('header');
        principal.innerHTML = '';
       

       personaje = document.createRange().createContextualFragment(`
            <div class="card">
                <img src="${personaje.image}" alt="${personaje.name}" class="card-img">
                <div class="card-content">
                    <h2 class="card-title">${personaje.name}</h2>
                    <br>
                    <p class="card-status">Estado: ${personaje.status}</p>
                    <br>
                    <p class="card-species">Especie: ${personaje.species}</p>
                    <br>
                    <p class="card-gender">Created: ${personaje.created}</p>
                    <br>
                    <p class="card-gender">Gender: ${personaje.gender}</p>
                </div>
            </div>
        `);
        principal.append(personaje);
    });

});


















