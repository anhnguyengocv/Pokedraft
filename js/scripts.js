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

    //Functino to add a pokemon to the list
    function add(pokemon){
      if(typeof pokemon === 'object' && 'name' in pokemon) {
    pokemonList.push(pokemon);
    } else {
      console.error('Invalid pokemon.');
    }
    }

    //Function to gett all pokemon
    function getAll() {
      return pokemonList;
    }

    //Function to find pokemon by name using filter
    function findByName(name) {
      return pokemonList.filter(function(pokemon) {
        return pokemon.name === name;
      });
    }

    //Return the functinos and data you want to be accessible
    return {
      add: add,
      getAll: getAll,
      findByName: findByName
    };
  
    // return {
    //   getAll: function() {
    //     return pokemonList;
    //   },
    //   add: function(pokemon) {
    //     pokemonList.push(pokemon);
    //   }
    // };
})();
  
//Example display
let foundPokemon = pokemonRepository.findByName('Pikachu');
if (foundPokemon.length > 0) {
  console.log('Found Pokemon: ', foundPokemon);
} else {
  console.log('Pokemon not found.');
}
  
function displayPokemonList() {
  let pokemonList = pokemonRepository.getAll();

  pokemonList.forEach(function(pokemon) {
    document.write("<p>" + pokemon.name + " (" + "height: " + pokemon.height + ")"); "</p>"
    if (pokemon.height > 1.0) {
        document.write(" - Wow, that's big!");
    }
  })();
}
  
displayPokemonList();