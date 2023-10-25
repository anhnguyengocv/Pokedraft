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
  
  pokemonList.forEach(function(user) {
    document.write("<p>" + user.name + " (" + "height: " + user.height + ")");"</p>"
        if (user.height > 1.0) {
        document.write(" - Wow, that's big!");
        }
  });












// for (let i=0; i < pokemonList.length; i++) {
//     text = "<p>" + pokemonList[i].name + " " + "(" + "height: " + pokemonList[i].height + ")";
//     document.write(text);
//     if (pokemonList[i].height > 1.0) {
//         document.write( " - " + "Wow, that's big!")
//     }
// }
//alert("Hello world");
//let favoriteFood = 'sushi';
//document.write(favoriteFood);
//favoriteFood = ' pasta';
//document.write(favoriteFood);