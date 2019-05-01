function deckEx1(){
    cards.init({table:'#card-table'});
 
    //Create a new deck of cards
    deck = new cards.Deck();
    //By default it's in the middle of the container, put it slightly to the side
    deck.x -= 50;
 
    //cards.all contains all cards, put them all in the deck
    deck.addCards(cards.all);
    //No animation here, just get the deck onto the table.
    deck.render({immediate:true});
    console.log("Init Deck!");
 
    upperhand = new cards.Hand({faceUp:false, y:60});
    lowerhand = new cards.Hand({faceUp:true, y:340});
 
    discardPile = new cards.Deck({faceUp:true});
    discardPile.x += 50;
 }



function deckEx2(){
    upperhand = new cards.Hand({faceUp:false, y:50});
    lowerhand = new cards.Hand({faceUp:true, y:350});
    lefthand = new cards.Hand({faceUp:false, y:50});
    righthand = new cards.Hand({faceUp:true, y:250});
    centerhand = new cards.Hand({faceUp:true, y:300})
    deck.deal(2, [upperhand, lowerhand, lefthand, righthand], 50);
    deck.deal(3, [centerhand], 100);
    console.log("This is getting the hands");
}

function deckEx3(){
    console.log("gameboard 3");
}

function deckEx4(){
    console.log("gameboard 4");
}

function deckEx5(){
    upperhand = new cards.Hand({faceUp:false, y:50});
    lowerhand = new cards.Hand({faceUp:true, y:350});
    deck.deal(5, [upperhand, lowerhand], 50)
}

function deckEx6(){
    upperhand = new cards.Hand({faceUp:false, y:50});
    lowerhand = new cards.Hand({faceUp:true, y:350});
    deck.deal(5, [upperhand, lowerhand], 50)
}



deck.click(function(card){
    if(card === deck.topCard()){
        lowerhand.addCard(deck.topCard());
        lowerhand.render();
    }
});
 


/*
Cheat sheet:

move the deck:
deck.x -= || += "number"
deck.y
deck.render

DECKVAR



*/


 //Now lets create a couple of hands, one face down, one face up.
 // upperhand = new cards.Hand({faceUp:false, y:60});
 // lowerhand = new cards.Hand({faceUp:true, y:340});
 
 // //Lets add a discard pile
 // discardPile = new cards.Deck({faceUp:true});
 // discardPile.x += 50;
 
 
 // //Let's deal when the Deal button is pressed:
 // $('#deal').click(function() {
 //     //Deck has a built in method to deal to hands.
 //     $('#deal').hide();
 //     deck.deal(5, [upperhand, lowerhand], 50, function() {
 //         //This is a callback function, called when the dealing
 //         //is done.
 //         discardPile.addCard(deck.topCard());
 //         discardPile.render();
 //     });
 // });
 
 
 // //When you click on the top card of a deck, a card is added
 // //to your hand
 // deck.click(function(card){
 //     if (card === deck.topCard()) {
 //         lowerhand.addCard(deck.topCard());
 //         lowerhand.render();
 //     }
 // });
 
 