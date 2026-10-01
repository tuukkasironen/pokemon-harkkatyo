function haePokemon(pokemonNimi) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemonNimi.toLowerCase();

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Pokémonia ei löytynyt");
            return response.json();
        })
        .then(data => {
            document.getElementById("name").textContent = data.name;
            document.getElementById("height").textContent = data.height;
            document.getElementById("weight").textContent = data.weight;

            const image = document.getElementById("pokemonImage");
            image.src = data.sprites.front_default;
            image.alt = data.name;

            let tyypit = "";
            for (let i = 0; i < data.types.length; i++) {
                if (i > 0) tyypit += ", ";
                tyypit += data.types[i].type.name;
            }
            document.getElementById("types").textContent = tyypit;
            document.getElementById("error").textContent = "";
        })
        .catch(() => {
            document.getElementById("name").textContent = "-";
            document.getElementById("types").textContent = "-";
            document.getElementById("height").textContent = "-";
            document.getElementById("weight").textContent = "-";
            document.getElementById("pokemonImage").src = "";
            document.getElementById("error").textContent = "Pokémonia ei löytynyt.";
        });
}

const searchForm = document.getElementById("searchForm");

if (searchForm) {
    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const pokemonNimi = document.getElementById("pokemon").value.trim();
        if (pokemonNimi !== "") haePokemon(pokemonNimi);
    });

    haePokemon("pikachu");
}
