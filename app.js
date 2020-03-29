(require('dotenv').config({ silent: process.env.NODE_ENV === 'production' }))
const ejs = require("ejs");
const express = require("express");
const bodyParser = require("body-parser");
var $ = require("jquery");
var mongoose = require('mongoose');
var jsdom = require('jsdom');
$ = require('jquery')(new jsdom.JSDOM().window);
const nodemailer = require('nodemailer');
var fs=require('fs');
const Email = require('email-templates');


const email = new Email({
  message: {
    from: process.env.EMAIL_USER
  },
  // uncomment below to send emails in development/test env:
  send: true,
  transport: {
    host: process.env.EMAIL_SERVER,
    port: 587,
    auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASSWORD
    },
    preview: false
  }
});

var port = process.env.PORT || 8080;
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

mongoose.connect("mongodb+srv://FashionPetsDevOps:fashionpets123@cluster0-8gspq.azure.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

const clienteSchema = new mongoose.Schema ({
  nombre: {type: String, required: true},
  apellido: {type: String, required: true},
  direccion: {type: String, required: true},
  telefono: {type: Number, required: true},
  correo: {type: String, required: true},
  nombreMascota: {type: String, require: true},
  especie: {type: String, require: true},
  raza: {type: String, require: true},
  altura: {type: String, require: true},
  peso: {type: String, require: true},
  corteUnas: String,
  limpiezaOidos: String,
  limpiezaLagrimales: String,
  perianales: String,
  cepilladoDientes: String,
  limpiezaAlmohadillas: String,
  banoCosmetico: String,
  corteEstilo: String,
  accesorio: String,
  fecha: String,
  domicilio: String,
  instalaciones: String,
  comentarios: String
});

const Cliente = mongoose.model('Cliente', clienteSchema);

// let transport = nodemailer.createTransport({
//     host: process.env.EMAIL_SERVER,
//     port: 587,
//     auth: {
//        user: process.env.EMAIL_USER,
//        pass: process.env.EMAIL_PASSWORD
//     }
// });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

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

  // const message = {
  //     from: 'fashionpetsec@gmail.com', // Sender address
  //     to: 'fashionpetsec@gmail.com',         // List of recipients
  //     subject: 'Nueva Orden', // Subject line
  //     template: 'order-received'
  // };

  let correo = req.body.correo;
  let nombre = req.body.nombre;
  let apellido = req.body.apellido;
  let direccion = req.body.direccion;
  let telefono = req.body.telefono;
  let nombreMascota = req.body.nombreMascota;
  let especie = req.body.especie;
  let raza = req.body.raza;
  let altura = req.body.altura;
  let peso = req.body.peso;
  let fecha = req.body.fecha;
  let domicilioInstalaciones = req.body.inlineRadioOptions;  
  let servicios = 
  [
        corteUnas = req.body.corteUnas,
        limpiezaOidos = req.body.limpiezaOidos,
        limpiezaLagrimales = req.body.limpiezaLagrimales,
        perianales = req.body.perianales,
        cepilladoDientes = req.body.cepilladoDientes,
        limpiezaAlmohadillas = req.body.limpiezaAlmohadillas,
        banoCosmetico = req.body.banoCosmetico,
        corteEstilo = req.body.corteEstilo,
        accesorio = req.body.accesorio
  ];
  let comentarios = req.body.comentarios;
  
  // Filtrando todos los servicios no seleccionados
  var serviciosFiltrado = servicios.filter(function (el) {
    return el != null;
  });
 
  const cliente = new Cliente ({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    correo: req.body.correo,
    nombreMascota: req.body.nombreMascota,
    especie: req.body.especie,
    raza: req.body.raza,
    altura: req.body.altura,
    peso: req.body.peso,
    corteUnas: req.body.corteUnas,
    limpiezaOidos: req.body.limpiezaOidos,
    limpiezaLagrimales: req.body.limpiezaLagrimales,
    perianales: req.body.perianales,
    cepilladoDientes: req.body.cepilladoDientes,
    limpiezaAlmohadillas: req.body.limpiezaAlmohadillas,
    banoCosmetico: req.body.banoCosmetico,
    corteEstilo: req.body.corteEstilo,
    accesorio: req.body.accesorio,
    fecha: req.body.fecha,
    domicilioInstalaciones: req.body.inlineRadioOptions,
    comentarios: req.body.comentarios
  });

  
  

  cliente.save(function(err) {
    if(!err) {
      res.redirect("gracias");

      email
  .send({
    template: 'new-order',
    message: {
      to: correo
    },
    locals: {
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      correo: correo,
      direccion: direccion,
      nombreMascota: nombreMascota,
      especie: especie,
      raza: raza,
      altura: altura,
      peso: peso,
      servicios: serviciosFiltrado,
      fecha: fecha,
      domicilioInstalaciones: domicilioInstalaciones,
      comentarios: comentarios
    }
  })
  // .then(console.log)
  // .catch(console.error);

  email
  .send({
    template: 'recibida',
    message: {
      to: process.env.EMAIL_USER
    },
    locals: {
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      correo: correo,
      direccion: direccion,
      nombreMascota: nombreMascota,
      especie: especie,
      raza: raza,
      altura: altura,
      peso: peso,
      servicios: serviciosFiltrado,
      fecha: fecha,
      domicilioInstalaciones: domicilioInstalaciones,
      comentarios: comentarios
    }
  })
    } else {
      console.log(err);
    }
  })
})

//////////////////////////// Contacto //////////////////////////////

app.route("/contacto")

.get(function(req, res) {
  res.render("contacto")
});

///////////////////////////Gracias!/////////////////////////////////

app.route("/gracias")

.get(function(req, res) {
  res.render("gracias")
})

/////////////////////////////////////////////////////////////////////



app.listen(port, function() {
  console.log("Server running on port 3000...");
});
