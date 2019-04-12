module.exports = function(app, dbRequest, dbconn) {
  app.get("/register", (req, res) => {
    console.log("register post called");

    res.render("user/register");
  });

  app.post("/registersave", (req, res) => {
    console.log("register post called" + JSON.stringify(req.body));
    dbRequest.insertUser(dbconn, req.body, function(result) {
      console.log("return" + JSON.stringify(result));
      if (typeof result.code !== "undefined" || result === "") {
        res.send("we encountered an error during the registration");
      } else {
        res.send("your registration is done. You can login");
      }
    });
  });
};
