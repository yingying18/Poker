cards.init({table:'#card-table'});

//Create a new deck of cards
deck = new cards.Deck();
//By default it's in the middle of the container, put it slightly to the side
deck.x -= 50;

//cards.all contains all cards, put them all in the deck
deck.addCards(cards.all);
//No animation here, just get the deck onto the table.
deck.render({immediate:true});

//Now lets create a couple of hands, one face down, one face up.
upperhand = new cards.Hand({faceUp:false, y:60});
lowerhand = new cards.Hand({faceUp:true, y:340});

//Lets add a discard pile
discardPile = new cards.Deck({faceUp:true});
discardPile.x += 50;



$('#deal').click(function() {
    //Deck has a built in method to deal to hands.
    $('#deal').hide();
    deck.deal(5, [upperhand, lowerhand], 50, function() {
        //This is a callback function, called when the dealing
        //is done.
        discardPile.addCard(deck.topCard());
        discardPile.render();
    });
});



deck.click(function(card){
    if (card === deck.topCard()) {
        lowerhand.addCard(deck.topCard());
        lowerhand.render();
    }
});


lowerhand.click(function(card){
    if (card.suit == discardPile.topCard().suit
        || card.rank == discardPile.topCard().rank) {
        discardPile.addCard(card);
        discardPile.render();
        lowerhand.render();
    }
});