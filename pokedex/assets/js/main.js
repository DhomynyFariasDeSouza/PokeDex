
const btncarregar = document.getElementById('carregarmais')
 const maximo = 151
let offset = 0;
const limite = 10;


 pokemonsList = document.getElementById('pokemonList')


function maisPokemons (offset,limit){
pokemonAPI.getPokemons(offset,limit).then((pokemons = []) => {
const newHtml = pokemons.map((pokemon) =>
        `<li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.numero}</span>
        <span class="name">${pokemon.nome}</span>

        <div class="detail">
            <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src='${pokemon.fotos}'
            alt="${pokemon.nome}">
        </div>
        `)
    .join('');

    pokemonsList.innerHTML += newHtml
})}


maisPokemons(offset,limite)


btncarregar.addEventListener('click',() => {
    offset += 5;
    let qtd = offset+limite

    if(qtd >= maximo){
         const novolimite = maximo - offset
        maisPokemons(offset,novolimite);    

        btncarregar.parentElement.removeChild(btncarregar)
     
    }else {
        maisPokemons(offset,limite);
    }

    
})
