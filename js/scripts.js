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
      return pokemonList.filter(function(findPoke) {
        return findPoke.name === name;
      });
    }

    function addListItem(pokemon){
      let pokeList = document.querySelector(".pokemon-list"); //create new pokemonList variable
      let listPokemon = document.createElement("li"); //create element li
      let button = document.createElement("button"); //create element button
      button.innerText = pokemon.name; //button.innerText = "placeholder" add a # text inside the button
      button.classList.add("button-class"); //create button-class added to the button; from css
      listPokemon.appendChild(button); //append the button into the li
      pokeList.appendChild(listPokemon); //append the li into the ul
      addClickListenerToButton(button, pokemon); //call the function to add event listener
    }

    //add an event listener to the button
    function addClickListenerToButton(button, pokemon) {
      button.addEventListener('click', function() {
        showDetails(pokemon);
      });
    }

    //display the details when a button is clicked
    function showDetails(pokemon) {
      console.log('Pokemon Details:', pokemon);
    }

    //Return the functinos and data you want to be accessible
    return {
      add: add,
      getAll: getAll,
      findByName: findByName,
      addListItem: addListItem
    };
})();
  
//Example display
let foundPokemon = pokemonRepository.findByName('Pikachu');
if (foundPokemon.length > 0) {
  console.log('Found Pokemon: ', foundPokemon);
} else {
  console.log('Pokemon not found.');
}

console.log(pokemonRepository.getAll());
pokemonRepository.add(
  {
    name: 'Pikachu',
    height: 0.3,
    types: ["electric"]
  }
);

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
