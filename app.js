var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;
var cookieSession = require("cookie-session");
var router_app = require("./routes_app");
var session_middleware = require("./middleware/session");
var formidable = require("express-formidable");

var methodOverride = require("method-override");

var app = express();

app.use("/public", express.static('public'));
app.use(bodyParser.json());//para peticiones app/json
app.use(bodyParser.urlencoded({extended: true}));

/*app */
app.use(methodOverride("_method"));

app.use(cookieSession({
  name: "session",
  keys: ["llave-1", "llave-2"]
}));

//app.use(formidable({ keepExtensions: true }));

app.set("view engine", "jade");

app.get("/", function(req, res){
    console.log(req.session.user_id);
    res.render("index");
});

//Creacion de Usuarios
app.get("/singup", function(req, res){
    User.find(function(err, doc){
       console.log(doc);
        res.render("singup");
    });

});

//Incio de sesion
app.get("/login", function(req, res){
    res.render("login");
});

//-----La funcion de cuando se registran los datos

app.post("/users", function(req, res){
    var user = new User({email: req.body.email,
                    password: req.body.pass,
                    password_conf: req.body.password_conf,
                    username: req.body.username
                  });

    user.save().then(function(us) {
        res.send("Guardamos el usuario exitosamente");
    }, function(err){
      if (err) {
        console.log(String(err));
        res.send("No pudimos guardar la informacion");
      }
    });
});

app.post("/session", function(req, res){
  //User.find({/*query*/}, /*campos*/"",/*Callback*/function(err, docs){
   User.findOne({email: req.body.email, password: req.body.pass }, function(err, user){
     req.session.user_id = user._id;
     res.redirect("/app");
   });
});

app.use("/app", session_middleware);

app.use("/app", router_app);


app.listen(8080);
