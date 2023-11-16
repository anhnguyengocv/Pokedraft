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

  (function() {

    function showDetails(pokemon) {
      //display modal
      let modal = document.getElementById('pokemon-modal');
      modal.style.display = 'block';

      //populate modal with pokemon details
      let modalPokemonName = document.getElementById('modal-pokemon-name');
      let modalPokemonHeight = document.getElementById('modal-pokemon-height');
      let modalPokemonImage = document.getElementById('modal-pokemon-image');

      modalPokemonName.textContent = 'Name: ' + pokemon.name;
      modalPokemonHeight.textContent = 'Height: ' + pokemon.height;

      //use function to get imgUrl for pokemon
      getPokemonImageUrl(pokemon.id)
        .then(imgUrl => {
          modalPokemonImage.src = imgUrl; //set img src
        })
        .catch(error => {
          console.error('Error fetching Pokemon image: ', error);
          modalPokemonImage.src = 'default_image_url.png'; //provide a dfault img if the error occurs
        });


      //add event listener to close modal
      let closeModalButton = document.querySelector('.close-modal');
      closeModalButton.addEventListener('click', function() {
        modal.style.display = 'none';
      });

      //close modal when clicking outside
      window.addEventListener('click', function(event) {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });

      //close modal when using keyboard
      window.addEventListener('keydown', function(event) {
        if(event.key === 'Escape') {
          modal.style.display = 'none';
        }
      });
    }

    //function to get the img for a pokemon
    function getPokemonImageUrl(pokemonId) {
      let apiUrl = 'https://pokeapi.co/api/v2/pokemon/${pokemonId}/';

      //fetch request to the api
      return fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not working');
          }
          return response.json();
        })
        .then(data => {
          return data.sprites.front_default; //use data to construct the img url
        })
        .catch(error => {
          console.error('Error fetching Pokemon image: ', error);
          return 'default_image_url.png'; //return a default img if error 
        });
    }
  })();


    //Return the functions and data you want to be accessible
    return {
      add: add,
      getAll: getAll,
      findByName: findByName,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails
    };
})();

// console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


