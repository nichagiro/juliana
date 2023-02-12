//Aqui se guardan la URLs
const { Router } = require("express");
//const pool = require('../db')
const {
  listarCotizaciones,
  listarCotizacion,
  crearCotizacion,
  eliminarCotizacion,
  actualizarCotizacion,
  listarArticulos,
  listarc
} = require("../controllers/cotizacion.controller");

const router = Router();

router.get("/", listarCotizaciones);
router.get("/", listarArticulos);


router.get("/c", listarc);

router.get("/:id", listarCotizacion);

router.post("/", crearCotizacion);

router.delete("/", eliminarCotizacion);

router.put("/", actualizarCotizacion);

module.exports = router;
