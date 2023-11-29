let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=100`;

  console.log(pokemonList);

  function add(pokemon){
    if(typeof pokemon === 'object' && 'name' in pokemon) {
  pokemonList.push(pokemon);
  } else {
    console.log('Invalid pokemon.');
  }
  }

  function getAll() {
    return pokemonList;
  }

  function findByName(name) {
    return pokemonList.filter(function(findPoke) {
      return findPoke.name === name;
    });
  }

  function addClickListenerToButton(button, pokemon) {
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function addListItem(pokemon){
    let pokeList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listPokemon.appendChild(button);
    pokeList.appendChild(listPokemon);
    addClickListenerToButton(button, pokemon);
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
      item.id = details.id;
      return item;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function getPokemonImageUrl(apiUrl) {
      return fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not working');
          }
          return response.json();
        })
        .then(data => {
          return data.sprites.front_default;
        })
        .catch(error => {
          console.error('Error fetching Pokemon image: ', error);
          return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'; //return a default img if error 
        });
  }

  function showDetails(pokemon) {
    let modal = document.getElementById('pokemon-modal');
    modal.style.display = 'block';

    let modalPokemonName = document.getElementById('modal-pokemon-name');
    let modalPokemonHeight = document.getElementById('modal-pokemon-height');
    let modalPokemonImage = document.getElementById('modal-pokemon-image');

    loadDetails(pokemon).then(function (pokemon) {
      modalPokemonName.textContent = 'Name: ' + pokemon.name;
      modalPokemonHeight.textContent = 'Height: ' + pokemon.height;
    });

    getPokemonImageUrl(pokemon.detailsUrl)
      .then((imgUrl) => {
        modalPokemonImage.setAttribute("src", imgUrl);
      })
      .catch(error => {
        console.error('Error fetching Pokemon image: ', error);
        modalPokemonImage.src = 'default_image_url.png';
      });

    modal.style.display = "block";

    let closeModalButton = document.querySelector('.close-modal');
    closeModalButton.addEventListener('click', function() {
      modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });

    window.addEventListener('keydown', function(event) {
      if(event.key === 'Escape') {
        modal.style.display = 'none';
      }
    });
  }

  return {
    add: add,
    getAll: getAll,
    findByName: findByName,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    addClickListenerToButton: addClickListenerToButton
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});