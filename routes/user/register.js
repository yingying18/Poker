module.exports = function (app, dbRequest, dbconn, upload, fs) {
  app.get("/register", (req, res) => {
    //console.log("register post called");

    res.render("user/register");
  });

  app.post("/registersave", upload.single("registeruserimage"), (req, res) => {
    //console.log("register post called" + (req.body));
    //handle image
    let image = null;
    let mimetype = null;
    console.log("form data", req.file);
    // image/jpeg
    if (typeof req.file === "undefined") {
      mimetype = "image/png";
      image = "person";
    } else {
      mimetype = req.file.mimetype;
    }
    //image/png
    if ((mimetype === "image/jpeg") || (mimetype === "image/png")) {
      let extension = mimetype.split("/");
      let jsonob = JSON.parse(req.body["postdata"]);
      jsonob.filetype = extension[1];
      if (image === null) {
        jsonob.picture = 1;
      } else {
        jsonob.picture = 0;
      }

      console.log("json : " + JSON.stringify(jsonob));

      dbRequest.getUserEmailandUserNameCount(dbconn, jsonob, function (result) {
        // console.log("return" + JSON.stringify(result));
        if (typeof result.code !== "undefined" || result === "") {
          res.send("we encountered an error during the registration");
        } else {
          console.log("count result :" + JSON.stringify(result[0].count));
          if (result[0].count > 0) {
            res.send("your user name or email is already in use please choose different one ");
          } else {

            dbRequest.insertUser(dbconn, jsonob, function (result) {
              // console.log("return" + JSON.stringify(result));
              if (typeof result.code !== "undefined" || result === "") {
                res.send("we encountered an error during the registration");
              } else {
                //collect the id associated with the user email to give the id as the file name for user's image
                dbRequest.getUserByEmail(dbconn, jsonob, function (result) {
                  // console.log("return" + JSON.stringify(result));
                  if (typeof result.code !== "undefined" || result === "") {
                    res.send("we encountered an error during the registration");
                  } else {
                    //console.log("return image file" + JSON.stringify(result));


                    //console.log("file mime type" + jsonob.registername);
                    if (image === null) {
                      fs.rename(
                        "public/images/userimages/" + req.file.filename,
                        "public/images/userimages/" + result[0].id + '.' + extension[1],
                        function (err) {
                          if (err) console.log("ERROR: " + err);
                        }
                      );
                    }
                    res.send("your registration is done. You can login now");
                  }
                });

                //res.send("your registration is done. You can login now");
              }
            });

            //res.send("your registration is done. You can login now");
          }
        }
      });
    } else {
      res.send("uploaded image type is not supported. we support jpeg or png images  ");
    }








  });
};
