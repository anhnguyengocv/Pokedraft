let pokemonRepository = (function() {
    let pokemonList = [
      {
        name: 'Pichu',
        height: 0.2,
        types: ['electric']
      },
      {
        name: 'Gastly',
        height: 1.3,
        types: ['ghost', 'poison']
      },
      {
        name: 'Ralts',
        height: 0.4,
        types: ['psychic', 'fairy']
      }
    ];
  
    console.log(pokemonList);
  
    return {
      getAll: function() {
        return pokemonList;
      },
      add: function(pokemon) {
        pokemonList.push(pokemon);
      }
    };
})();
  
  
    function displayPokemonList() {
        let pokemonList = pokemonRepository.getAll();
        let pokemonListElement = document.getElementById('pokemon-list');
  
        pokemonList.forEach(function(pokemon) {
            document.write("<p>" + pokemon.name + " (" + "height: " + pokemon.height + ")"); "</p>"
            if (pokemon.height > 1.0) {
                document.write(" - Wow, that's big!");
            }
        })();
    }
  
  displayPokemonList();