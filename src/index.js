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

//Fetch Random Card//

function fetchRandomCard(){
    fetch(`https://db.ygoprodeck.com/api/v7/randomcard.php`)
    .then(response => response.json())
    .then(function(card){

        renderRandomCard(card)

        if(card.atk >= 0){
            renderRandomMonsterCard(card)
        }

        if(card.type === "Spell Card" || card.type === "Trap Card"){
            renderRandomSpellTrapCard(card)
        }

        let addNewCard = document.getElementById('Add_New_Card')
        let retrieveData = document.getElementById('button_2')

        retrieveData.addEventListener('click', (e) => {

            if(card.atk >= 0){

                addNewCard.name.value = card.name
                addNewCard.type.value = card.type
                addNewCard.race.value = card.race

                addNewCard.attribute.value = card.attribute
                addNewCard.atk.value = card.atk
                addNewCard.def.value = card.def
            
                addNewCard.level.value = card.level
                addNewCard.id.value = card.id
                addNewCard.image.value = card.card_images[0].image_url

                addNewCard.description.value = card.desc

            }

            if(card.type === "Spell Card" || card.type === "Trap Card"){

                addNewCard.name.value = card.name
                addNewCard.type.value = card.type
                addNewCard.race.value = card.race

                addNewCard.attribute.value = ``
                addNewCard.atk.value = ``
                addNewCard.def.value = ``
            
                addNewCard.level.value = ``
                addNewCard.id.value = card.id
                addNewCard.image.value = card.card_images[0].image_url

                addNewCard.description.value = card.desc

            }

        })
    })
}

function renderRandomCard(card){
    document.getElementById("Discover_Yu_Gi_Oh_Background").src=`${card.card_images[0].image_url}`
}

function renderRandomMonsterCard(card){
    let cardInfo = document.createElement('div')

    cardInfo.className = `Random_Monster_Info`
    cardInfo.innerHTML = `
    <p>Name: ${card.name}<br>Type: ${card.type}<br>Level: ${card.level}<br>Race: ${card.race}<br>Attribute: ${card.attribute}<br><br>Description: ${card.desc}<br><br>ATK/${card.atk}  DEF/${card.def}
    `

    document.querySelector('#Discover_Card_Data').appendChild(cardInfo)
}

function renderRandomSpellTrapCard(card){
    let cardInfo = document.createElement('div')
    cardInfo.className = `Random_Spell_Trap_Info`
    cardInfo.innerHTML = `
    <p>Name: ${card.name}<br>Type: ${card.type}<br>Category: ${card.race}<br><br>Description: ${card.desc}
    `

    document.querySelector('#Discover_Card_Data').appendChild(cardInfo)
}

//Fetch Random Card//

//Add To Favorites//

let addtoFavorites = document.getElementById('Add_New_Card')

addtoFavorites.addEventListener('submit', addNewCardToFavorites)

function addNewCardToFavorites(e){
    e.preventDefault()

    if(addtoFavorites.image.value.slice(0, 50) !== "https://storage.googleapis.com/ygoprodeck.com/pics"){
        alert("Sorry, that's not a card")
    }else{
        let card = {
            "name": addtoFavorites.name.value,
            "type": addtoFavorites.type.value,
            "race": addtoFavorites.race.value,
    
            "attribute": addtoFavorites.attribute.value,
            "atk": addtoFavorites.atk.value,
            "def": addtoFavorites.def.value,
        
            "level": addtoFavorites.level.value,
            "id":  addtoFavorites.id.value,
            "card_images": [],
    
            "desc": addtoFavorites.description.value
        }   

        let imageURL = {image_url: addtoFavorites.image.value}

        card.card_images.push(imageURL)

        if(sort === 'favorite'){
            renderNewCard(card)
        }

        patch(card)
    
        addtoFavorites.reset()
    }

}

function renderNewCard(card){
    let cardImage = document.createElement('div')

    cardImage.className = `Deck_Image`
    cardImage.innerHTML = `
    <img id="${card.name} "src="${card.card_images[0].image_url}" width = "50" height = "50">
    `

    document.querySelector('#Card_List').appendChild(cardImage)

    let cardData = document.querySelector(`#Card_Data`)

    cardImage.addEventListener('click', function(){
        document.getElementById("Yu_Gi_Oh_Background").src=`${card.card_images[0].image_url}`

        //Add Card Data//

        cardData.innerHTML = ``

        if(card.atk >= 0){
            renderMonsterCard(card)
        }

        if(card.type === "Spell Card" || card.type === "Trap Card"){
            renderSpellTrapCard(card)
        }

    })
}

function emptyDeck(){
    alert('Select your Duelist!')
}

//Add To Favorites//

//Random Card Button//

let randomButton = document.getElementById('button')

let discoverCardData = document.getElementById('Discover_Card_Data')

randomButton.addEventListener('click', () => {
    discoverCardData.innerHTML = ``
    fetchRandomCard()
})

//Random Card Button//

//Duelist Buttons//

let cardList = document.querySelector('#Card_List')

let yugi = document.getElementById('Yugi')

yugi.addEventListener('click', () => {
    sort = 'yugi'
    cardList.innerHTML = ` `
    fetchCards("yugi")
})

let joey = document.getElementById('Joey')

joey.addEventListener('click', () =>{
    sort = 'joey'
    cardList.innerHTML = ` `
    fetchCards("Joey")
})

let seto = document.getElementById('Seto')

seto.addEventListener('click', () =>{
    sort = 'seto'
    cardList.innerHTML = ` `
    fetchCards("kaiba")
})

let pegasus = document.getElementById('Pegasus')

pegasus.addEventListener('click', () =>{
    sort = 'pegasus'
    cardList.innerHTML = ` `
    fetchCards("pegasus")
})

let myFavorites =  document.getElementById('My_Favorite')

myFavorites.addEventListener('click', () =>{
    sort = 'favorite'
    cardList.innerHTML = ` `
    fetchFavorites("myFavorites")
})

//Duelist Buttons//

//Duel Zone///////////////////////////////////////////////////////

//Draw Button//

function draw(){
    fetch(`https://db.ygoprodeck.com/api/v7/randomcard.php`)
    .then(response => response.json())
    .then(function(card){

        renderPlayerOneCard(card)        

        fetch(`https://db.ygoprodeck.com/api/v7/randomcard.php`)
        .then(response => response.json())
        .then(function(cardtwo){
        
        renderPlayerTwoCard(cardtwo)

        setTimeout(() => gameTypeOne(card, cardtwo), 750)

        })

    })
}

function drawTwo(){
    fetch(`https://db.ygoprodeck.com/api/v7/randomcard.php`)
    .then(response => response.json())
    .then(function(card){

        renderPlayerOneCard(card)        

        fetch(`https://db.ygoprodeck.com/api/v7/randomcard.php`)
        .then(response => response.json())
        .then(function(cardtwo){
        
        renderPlayerTwoCard(cardtwo)

        setTimeout(() => gameTypeTwo(card, cardtwo), 750)

        })

    })
}

//Draw Button//

//Render Player Card//

function renderPlayerOneCard(card){
    document.getElementById("Yu_Gi_Oh_Card_1").src=`${card.card_images[0].image_url}`
}

function renderPlayerTwoCard(card){
    document.getElementById("Yu_Gi_Oh_Card_2").src=`${card.card_images[0].image_url}`
}

//Render Player Card//

//Score Keeping//

let win1 = document.getElementById('win_1')
let player1Win = parseInt(win1.innerHTML)

let win2 = document.getElementById('win_2')
let player2Win = parseInt(win2.innerHTML)

let lose1 = document.getElementById('lost_1')
let player1Lose = parseInt(lose1.innerHTML)

let lose2 = document.getElementById('lost_2')
let player2Lose = parseInt(lose2.innerHTML)

function playerWin(player){
    if(player === "Player 1"){
        win1.innerText = ++player1Win
    } else if(player === "Player 2"){
        win2.innerText = ++player2Win
    }

    if(player1Win === 3 || player2Win === 3){

        setTimeout(() => kingOfGames(player), 750)

    }
}

function playerLose(player){
    if(player === "Player 1"){
        lose1.innerText = ++player1Lose
    } else{
        lose2.innerText = ++player2Lose
    }
}

//Score Keeping//

//Button Clicked//

let duelZone = document.getElementById('Duel_Zone')

duelZone.addEventListener('submit', function(e){
    e.preventDefault()

    if(e.target.Game_Type.value === "Monster, Spell, Trap!"){
        drawTwo()
    }else if(e.target.Game_Type.value === "Draw Battle!"){
        draw()
    }
    
})

function gameTypeOne(cardOne, cardTwo){
    if(cardOne.type === "Spell Card" || cardOne.type === "Trap Card" || cardTwo.type === "Spell Card" || cardOne.type === "Trap Card"){
        alert("Draw Again!")
    }else if(cardOne.atk > 0 && cardTwo.atk > 0){
        if(cardOne.atk > cardTwo.atk){
            playerLose("Player 2")
            playerWin("Player 1")
        } else if(cardTwo.atk > cardOne.atk){
            playerLose("Player 2")
            playerWin("Player 1")
        } else{
            alert(`It's a tie! Draw again, Duelists!`)
        }
    }
}

function gameTypeTwo(cardOne, cardTwo){
    if(cardOne.type.slice(cardOne.type.length -7) === "Monster" && cardTwo.type === "Spell Card"){
        playerLose("Player 2")
        playerWin("Player 1")
    }else if(cardOne.type.slice(cardOne.type.length -7) === "Monster" && cardTwo.type === "Trap Card"){
        playerLose("Player 1")
        playerWin("Player 2")
    }else if(cardOne.type === "Spell Card" && cardTwo.type.slice(cardTwo.type.length -7) === "Monster"){
        playerLose("Player 1")
        playerWin("Player 2")
    }else if(cardOne.type === "Spell Card" && cardTwo.type === "Trap Card"){
        playerLose("Player 2")
        playerWin("Player 1")
    }else if(cardOne.type === "Trap Card" && cardTwo.type.slice(cardTwo.type.length -7) === "Monster"){
        playerLose("Player 2")
        playerWin("Player 1")
    }else if(cardOne.type === "Trap Card" && cardTwo.type === "Spell Card"){
        playerLose("Player 1")
        playerWin("Player 2")
    }else{
        alert("Draw Again!")
    }
}

//Button Clicked//

//Restart Game//

let dropBox = document.getElementById('Game_Type')

dropBox.addEventListener('change', () => {

    player1Win = 0
    player1Lose = 0
    player2Win = 0
    player2Lose = 0

    win1.innerText = player1Win
    win2.innerText = player2Win
    lose1.innerText = player1Lose
    lose2.innerText = player2Lose

})

//Restart Game//

})