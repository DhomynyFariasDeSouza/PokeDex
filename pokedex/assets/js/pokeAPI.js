const pokemonAPI = {}
function convertPokeApiDetalhesToPokemon (pokeDetail){
    const Pokemon =new PokemonModel();

    Pokemon.nome = pokeDetail.name;
    Pokemon.numero = pokeDetail.id;

    const types = pokeDetail.types.map((typesSlots)=> typesSlots.type.name);
    const [type] = types
    Pokemon.types = types
    Pokemon.type = type

    Pokemon.fotos = pokeDetail.sprites.other.dream_world.front_default;

    return Pokemon
}
pokemonAPI.pokemonDetalhes = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetalhesToPokemon)
}
pokemonAPI.getPokemons = (offset, limit)=> {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
    .then((response) =>  response.json())
    .then ((jsonBody) => jsonBody.results )
    .then((pokemons) => pokemons.map(pokemonAPI.pokemonDetalhes))
    .then((detalhes) => Promise.all(detalhes))
    .then((pokemonDetalhes)=> pokemonDetalhes)
}