document.addEventListener("DOMContentLoaded", () => {

//Fetch Cards//

    function fetchCards(name){
        fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?&cardset=Starter%20Deck%3A%20${name}`)
        .then(response => response.json())
        .then(cardData => cardData.forEach(function(card){
            renderCard(card)
        }))
    }

    function fetchFavorites(fav){
        fetch(`http://localhost:3000/${fav}`)
        .then(response => response.json())
        .then(cardData => cardData.forEach(function(card){
            renderCard(card)
        }))
    }

//Fetch Cards//

})