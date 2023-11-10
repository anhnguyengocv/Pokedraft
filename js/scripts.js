let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=50';
  
    console.log(pokemonList);

    //Function to add a pokemon to the list
    function add(pokemon){
      if(typeof pokemon === 'object' && 'name' in pokemon) {
    pokemonList.push(pokemon);
    } else {
      console.log('Invalid pokemon.');
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

    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }

    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }

    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        console.log(pokemon);
      });
    }

    //add an event listener to the button
    function addClickListenerToButton(button, pokemon) {
      button.addEventListener('click', function() {
        showDetails(pokemon);
      });
    }

    //Return the functinos and data you want to be accessible
    return {
      add: add,
      getAll: getAll,
      findByName: findByName,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails
    };
})();
  
//Example display
// let foundPokemon = pokemonRepository.findByName('Pikachu');
// if (foundPokemon.length > 0) {
//   console.log('Found Pokemon: ', foundPokemon);
// } else {
//   console.log('Pokemon not found.');
// }

// console.log(pokemonRepository.getAll());
// pokemonRepository.add(
//   {
//     name: 'Pikachu',
//     height: 0.3,
//     types: ["electric"]
//   }
// );

// console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


