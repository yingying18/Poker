module.exports = function (app, dbRequest, dbconn) {

    app.get('/gamedrawing', (req, res) => {
        console.log("gamedrawing get called");

        res.render('game/gamedrawing');

    });

}