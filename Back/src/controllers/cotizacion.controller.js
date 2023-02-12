//Permite ejecutar acciones cuando este archivo sea visitada
const { Pool } = require('pg');
const pool = require('../../db')

//ver listas de cotizaciones

const listarCotizaciones = async (req, res) => {
  const result = await pool.query(`
  SELECT detalles_cotizacion.*, articulo.nombre as nombre_articulo,
  cotizaciones.fecha as fecha_cotizacion,
  cotizaciones.idusuario as usuario_cotizacio, 
  cotizaciones.idcliente as cliente_cotizaciones,
  cliente.nombre as cliente_nombre,
  usuario.nombre as usuario_nombre
  FROM detalles_cotizacion
  JOIN articulo ON detalles_cotizacion.idarticulo = articulo.idarticulo
  JOIN cotizaciones ON detalles_cotizacion.id_cotizacion = cotizaciones.id_cotizacion
  JOIN cliente ON cotizaciones.idcliente = cliente.idcliente
  JOIN usuario ON cotizaciones.idusuario = usuario.idusuario`)
  res.send(result.rows);
};

//ver listas de articulos
const listarc = async (req, res) => {
  const result = await pool.query("SELECT * FROM articulo")
    res.send(result.rows);
  }
  



//ver listas de articulos
const listarArticulos = async (req, res) => {
  const result = await pool.query("SELECT * FROM articulo")
    res.send(result.rows);
  }
  



//ver una cotizacion
const listarCotizacion= async (req, res) => {
  const id = req.params.id 
  const result = await pool.query(`SELECT * FROM venta WHERE idventa = ${id}`)
  res.send(result.rows);

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Articulo no encontrado" });
    }
  res.json(result.rows[0]);
};

//crear una cotizacion
const crearCotizacion = async (req, res) => {
  const{iducliente,idusuario,idarticulo,descripcion,cantidad,total}=req.body;

  const resul=await pool.query
  (`INSERT INTO venta (iducliente,idusuario,idarticulo,descripcion,cantidad,total)
  VALUES('${iducliente}','${idusuario}',' ${idarticulo}',  '${descripcion}', ${cantidad}, ${total})`)
  
  console.log(resul)
  res.send("Crear una Cotización");
};

//Eliminar una cotizacion
const eliminarCotizacion = async(req, res) => {
  const id = req.params.id 
  await pool.query(`DELETE FROM articulo WHERE idventa = ${id}`)
  res.send("Cotización eliminada");
  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Articulo no encontrado" });
    }
  res.json(result.rows[0]);

};

const actualizarCotizacion = async(req, res, next) => {
  try {
    const {id} = req.params 
    const{idusuario,idarticulo,descripcion,cantidad,total}=req.body;
  
    const result =await pool.query(
   `UPDATE venta SET
    iducliente=${iducliente}
    idusuario =${idusuario},
    idarticulo = ${idarticulo},  
    descripcion= '${descripcion}',
    cantidad=${cantidad},
    total=${total},    
    WHERE idventa= ${id}`)
  
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        message: "La cotizacion que desea actualizar no ha sido encontrada" })};
  
    console.log(result.rows[0]); 
  } catch (error) {
    next(error)
    
  }

}; 
//Luego exportamos las funciones así:
module.exports = {
  listarCotizaciones,
  listarCotizacion,
  crearCotizacion,
  eliminarCotizacion,
  actualizarCotizacion,
  listarArticulos,
 listarc,
};


