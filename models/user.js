var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/fotos");

var sexvar = ["H", "M"];
var ERmail = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Coloca un email valido"];

var user_schema = new Schema({
    name: String,
    username: {type: String, required: true, maxlength: [50, "Username muy grande"]} ,
    password: {
        type: String,
        minlength: [8, "El password muy corto"],
        validate:{
            validator: function(p){
                                  return this.password_conf == p;

                                  },
                  message:"Las contraseñas no son iguales"
                }
              },
    age: {type: Number, min: [5, "La edad no puede ser menor que 5"], max: [99, "La edad no puede ser mayor que 100"]},
    email: {type: String, required: "El correo es obligatorio", match: ERmail},
    date_of_birth: Date,
    sex: {type: String,  enum:{values: sexvar, message: "Opcion no valida"} }
});

user_schema.virtual("password_conf").get(function(){
    return this.pconfirmacion;
}).set(function(password){
    this.pconfirmacion = password;
});

var User = mongoose.model("User", user_schema);

module.exports.User = User;






/*
String
Number
Date
Buffer
Boolean
Mixed
Objectid
Array
 */
