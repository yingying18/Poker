// PUBLIC JS

function testing() {
    alert('working');
}

function dealPlayerOne(){
    var dealCard = anime({
        targets: '',
        duration: 500,
        loop: false,
        direction: 'normal',
        translateX: 300,
        translateY: 200,
        autoplay: false,
        easing: 'easeInCubic'
    })
}

function dealPlayerTwo(){
    var initPos = 20;
}

function play() {
    var playCard = anime({
        targets: '#Card_Back',
        duration: 900,
        loop: false,
        translateX: 200,
        translateY: 300,
        direction: 'normal',
        easing: 'easeInCubic',
        // scaleX: {
        //     value: 1.35,
        //     duration: 150,
        //     delay: 600
        // }
    });
}