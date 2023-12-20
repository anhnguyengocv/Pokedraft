document.addEventListener('DOMContentLoaded', function() {
  let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=100`;

    console.log(pokemonList);

    function getAll() {
      return pokemonList;
    }

    function add(pokemon){
      if(typeof pokemon === 'object' && 'name' in pokemon) {
        pokemonList.push(pokemon);
      } else {
        console.log('Invalid pokemon.');
      }
    }

    function addListItem(pokemon){
      let pokeList = document.querySelector(".pokemon-list");
      let listPokemon = document.createElement("li");
      let button = document.createElement("button");

      listPokemon.classList.add("list-group-item");

      button.classList.add('btn', 'btn-primary');
      
      button.innerText = pokemon.name;
      button.classList.add("button-class");
      listPokemon.appendChild(button);
      pokeList.appendChild(listPokemon);
      button.addEventListener("click", () => showDetails(pokemon))
    }

    function showDetails(pokemon) {
      loadDetails(pokemon).then(function() {
        showModal(pokemon);
      });
    }

    function findByName(name) {
      return pokemonList.filter(function(findPoke) {
        return findPoke.name === name;
      });
    }

    function loadList() {
      return fetch(apiUrl)
      .then(function (response) {
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
      return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.types = details.types.map(type => type.type.name);
        item.abilities = details.abilities.map(ability => ability.ability.name);
        return item;
      })
      .catch(function (e) {
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

    function showModal(item) {
      let modal = document.getElementById('pokemon-modal');
        if (!modal) {
          console.error("Modal element not fofund.");
          return;
        }

      let modalPokemonName = document.getElementById('modal-pokemon-name');
      let modalPokemonHeight = document.getElementById('modal-pokemon-height');
      let modalPokemonImage = document.getElementById('modal-pokemon-image');
        if (!modalPokemonImage) {
          console.error("Modal Pokemon Image element not found.");
          return;
        }
      let modalBody = $(".modal-body");
      let modalTitle = $(".modal-title");
      let modalHeader = $(".modal-header");

      modalTitle.empty();
      modalBody.empty();

      let nameElement = $("<h1>" + item.name + "</h1>");
      let imageElementFront = $('<img class="modal-img" style="width:50%">');
      imageElementFront.attr("src", item.imageUrlFront);
      let imageElementBack = $('<img class="modal-img" style="width:50%">');
      imageElementBack.attr("src", item.imageUrlBack);
      let heightElement = $("<p>" + "Height: " + item.height + "</p>");
      let weightElement = $("<p>" + "Weight: " + item.weight + "</p>");
      let typesElement = $("<p>" + "Types: " + item.types + "</p>");
      let abilitiesElement = $("<p>" + "Abilities: " + item.abilities + "</p>");

      modalTitle.append(nameElement);
      modalBody.append(imageElementFront);
      modalBody.append(imageElementBack);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
      modalBody.append(typesElement);
      modalBody.append(abilitiesElement);

      modal.style.display = "block";

      getPokemonImageUrl(item.detailsUrl)
      .then((imgUrl) => {
          modalPokemonImage.setAttribute("src", imgUrl);
        })
        .catch(error => {
          console.error('Error fetching Pokemon image: ', error);
          if (modalPokemonImage) {
            modalPokemonImage.src = 'default_image_url.png';
          }
        });

      let closeModalButton = document.querySelector('.close-modal');
        console.log("Close Modal Button:", closeModalButton);

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
      addClickListenerToButton: showDetails
    }
  })();

  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
});