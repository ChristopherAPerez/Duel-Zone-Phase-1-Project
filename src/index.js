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

//Render Card//

function renderCard(card){

    cardImages(card)

}

function cardImages(card){

    let cardImage = document.createElement('div')

    cardImage.className = `Deck_Image`
    cardImage.innerHTML = `
    <img id="${card.name} "src="${card.card_images[0].image_url}" width = "50" height = "50">
    `

    document.querySelector('#Card_List').appendChild(cardImage)

    let cardData = document.querySelector(`#Card_Data`)

    cardImage.addEventListener('click', function(){

        document.getElementById("Yu_Gi_Oh_Background").src=`${card.card_images[0].image_url}`


        cardData.innerHTML = ``

        if(card.atk >= 0){
            renderMonsterCard(card)
        }

        if(card.type === "Spell Card" || card.type === "Trap Card"){
            renderSpellTrapCard(card)
        }

    })

}

function renderMonsterCard(card){
    let cardInfo = document.createElement('div')

    cardInfo.className = `Monster_Info`
    cardInfo.innerHTML = `
    <p>Name: ${card.name}<br>Type: ${card.type}<br>Level: ${card.level}<br>Race: ${card.race}<br>Attribute: ${card.attribute}<br><br>Description: ${card.desc}<br><br>ATK/${card.atk}  DEF/${card.def}
    `

    document.querySelector('#Card_Data').appendChild(cardInfo)
}

function renderSpellTrapCard(card){
    let cardInfo = document.createElement('div')
    cardInfo.className = `Spell_Trap_Info`
    cardInfo.innerHTML = `
    <p>Name: ${card.name}<br>Type: ${card.type}<br>Category: ${card.race}<br><br>Description: ${card.desc}
    `

    document.querySelector('#Card_Data').appendChild(cardInfo)
}

//Render Card//



})