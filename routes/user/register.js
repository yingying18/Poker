module.exports = function(app, dbRequest, dbconn, upload, fs) {
  app.get("/register", (req, res) => {
    //console.log("register post called");

    res.render("user/register");
  });

  app.post("/registersave", upload.single("registeruserimage"), (req, res) => {
    //console.log("register post called" + (req.body));
    //handle image

    console.log("form data", req.file);
    console.log(req.file.filename);
    fs.rename(
      "public/images/userimages/" + req.file.filename,
      "public/images/userimages/5.jpg",
      function(err) {
        if (err) console.log("ERROR: " + err);
      }
    );

    //handle the rest of the form and post data to db and get the result
    dbRequest.insertUser(dbconn, req.body, function(result) {
      // console.log("return" + JSON.stringify(result));
      if (typeof result.code !== "undefined" || result === "") {
        res.send("we encountered an error during the registration");
      } else {
        res.send("your registration is done. You can login");
      }
    });
  });
};
