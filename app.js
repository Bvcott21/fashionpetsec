const ejs = require("ejs");
const express = require("express");
const bodyParser = require("body-parser");
var $ = require("jquery");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



//////////////////////////// Home Page ////////////////////////////

app.route("/")

.get(function(req, res) {
  res.render("home")
});

//////////////////////////// Servicios ////////////////////////////

app.route("/servicios")

.get(function(req, res) {
  res.render("servicios")
});

//////////////////////////// Precios //////////////////////////////

app.route("/precios")

.get(function(req, res) {
  res.render("precios");
})

.post(function(req,res) {
  var nombre = req.body.nombre;
  var apellido;
  var direccion;
  var telefono;
  var correo;
  var nombreMascota;
  var especie;
  var raza;
  var altura;
  var peso;
  var imagenMascota;
  var corteUnas;
  var limpiezaOidos;
  var limpiezaLagrimales;
  var perianales;
  var cepilladoDientes;
  var limpiezaAlmohadillas;
  var banoCosmetico;
  var corteEstilo;
  var accesorio;
  var fecha;
  var domicilio;
  var instalaciones;


  console.log(nombre);



})

//////////////////////////// Contacto //////////////////////////////

app.route("/contacto")

.get(function(req, res) {
  res.render("contacto")
});

/////////////////////////////////////////////////////////////////////
app.listen(process.env.PORT, function() {
  console.log("Server running on port 3000...");
});
