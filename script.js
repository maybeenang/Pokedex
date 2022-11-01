let pokemon = [];
let defaultURL = "https://pokeapi.co/api/v2/pokemon";

const getAllPokemon = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  defaultURL = data.next;

  const getPokemon = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  const pokemonData = await Promise.all(
    data.results.map(async (pokemon) => {
      const pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord;
    })
  );

  pokemon = pokemonData;
};

const pokemonContainer = document.querySelector(".pokemonContainer");

const displayPokemon = () => {
  const pokemonHTMLString = pokemon.map((pokeman) => {
    return `
        <div class="pokemon">
        <div class="pokemonID">
          <p>${pokeman.id}</p>
        </div>
        <div class="pokemonImg">
          <img
            src="${pokeman.sprites.other.dream_world.front_default}"
            alt="${pokeman.name}"
          />
        </div>
        <div class="pokemonDesc">
          <p class="pokemonName">${pokeman.name}</p>
          <div class="pokemonTypeContainer">
            <p class="pokemonType">weight : ${pokeman.weight}</p>
          </div>
        </div>
      </div>
        `;
  });
  pokemonContainer.innerHTML = pokemonHTMLString.join("");
};

getAllPokemon().then(() => {
  displayPokemon();
});

const button = document.querySelector(".button");
button.addEventListener("click", () => {
  getAllPokemon(defaultURL).then(() => {
    displayPokemon();
  });
});
