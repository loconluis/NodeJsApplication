var Imagen = require("../models/imagenes");
var check = require("./image_perm");

module. exports = function(req, res, next){
  Imagen.findById(req.params.id)
        .populate("creator")
        .exec(function(err, imagen){
            if(imagen!= null && check(imagen, req, res)){
              //console.log("Encontre la imagen "+ imagen.creator);
              res.locals.imagen = imagen;
              next();
            }else{
              res.redirect("/app");
            }
          })
}
