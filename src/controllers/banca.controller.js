import { getConnSQL } from '../db/database.js';

const verifyUser = async (req, res) => {
  try {
    const { user, pass } = req.body;
    const data = { user, pass };
    const conn = await getConnSQL();
    const result = await conn.query(
      `SELECT ID_Cliente, hash FROM cliente WHERE correo = ? OR Codigo_cuenta = ? AND hash = ?`,
      [user, user, pass]
    );
    console.log(result[0]);
    res.json(result[0]);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

const createUser = async (req, res) => {
  try {
    const { tipo, nombres, apellidos, correo, telefono, direccion, hash } = req.body;
    const Tipo_cuenta = tipo;
    const data = { Tipo_cuenta, nombres, apellidos, correo, telefono, direccion, hash };
    const conn = await getConnSQL();
    const first = await conn.query(`CALL gen_6digit_code(?, ?, @cod_cuenta);`, [nombres, telefono]);
    const result = await conn.query(`INSERT INTO cliente SET \`Codigo_cuenta\` = @cod_cuenta, ?;`, [data]);
    const result_ = await conn.query(`SELECT ID_Cliente FROM cliente WHERE hash = ?`, hash);
    const ID = result_[0];
    res.json({ ID, hash });
  } catch (err) {
    console.log(err);
    res.json({ estado: 'Error', message: err });
  }
};

const getDetalles = async (req, res) => {
  try {
    const hash = req.get('hash');
    const conn = await getConnSQL();
    const result = await conn.query(
      `SELECT Codigo_cuenta, Tipo_Cuenta, nombres, apellidos, correo, telefono, direccion, balance, re.deudas, (re.hist_ingresos-re.hist_egresos) as bal_mes
 FROM cliente cl LEFT JOIN reporte re ON cl.ID_Cliente = re.ID_Cliente WHERE cl.hash = ?`,
      hash
    );
    res.json({ user: result[0] });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

const getBalHistory = async (req, res) => {
  try {
    const hash = req.get('hash');
    const conn = await getConnSQL();
    const result = await conn.query(
      `SELECT cantidad, tipo, timestamp, c.nombres,  c.apellidos FROM (SELECT t.cantidad, t.tipo, t.timestamp, t.ID_emisor FROM cliente c LEFT JOIN transaccion t ON t.ID_emisor = c.ID_Cliente OR t.ID_receptor = c.ID_Cliente WHERE hash = ?) li LEFT JOIN cliente c on li.ID_emisor = c.ID_Cliente
`,
      hash
    );
    res.json({ user: result[0] });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

const getLoanHistory = async (req, res) => {
  try {
    const hash = req.get('hash');
    const conn = await getConnSQL();
    const result = await conn.query(
      `SELECT p.nombre, p.cantidad_total, p.plazo, p.estado FROM cliente c INNER JOIN prestamo p on c.ID_Cliente = p.ID_Cliente WHERE hash = ?`,
      hash
    );
    res.json({ user: result[0] });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

const getStats = async (req, res) => {
  const conn = await getConnSQL();
  const hash = req.get('hash');
  const result = await conn.query(
    `SELECT hist_ingresos, hist_egresos, deudas FROM reporte r INNER JOIN cliente c ON c.ID_Cliente = r.ID_Cliente WHERE c.hash =  ?`,
    hash
  );
  res.json({ stats: result[0] });
};

const createTransaction = async (req, res) => {
  try {
    const { tipo, t_cuenta, cantidad, codigo, hash } = req.body;
    const conn = await getConnSQL();
    var ID_emisor = await conn.query(`SELECT ID_Cliente FROM cliente WHERE hash = ?`, hash);
    ID_emisor = ID_emisor[0][0].ID_Cliente;
    if (cantidad <= 0) {
      res.json({ message: 'La cantidad no es válida.' });
      return;
    }
    if (tipo == 0) {
      var ID_receptor = await conn.query(`SELECT ID_Cliente FROM cliente WHERE Codigo_cuenta = ? AND Tipo_cuenta = ?`, [
        codigo,
        t_cuenta,
      ]);
      ID_receptor = ID_receptor[0][0].ID_Cliente;
      const data = { cantidad, ID_emisor, ID_receptor, tipo };
      conn.query(`INSERT INTO transaccion SET ?`, data);
    } else if (Math.abs(tipo) == 1) {
      const data = { cantidad, ID_emisor, tipo };
      conn.query(`INSERT INTO transaccion SET ?`, data);
    } else {
      res.json({ error: 'El tipo de transacción a realizar es inválido' });
    }
    res.json({ message: 'La transacción se ha realizado correctamente.' });
  } catch (err) {
    res.json({ message: err });
  }
};

const createLoan = async (req, res) => {
  const conn = await getConnSQL();
  const { nombre, cantidad_total, plazo, hash } = req.body;
  var ID_Cliente = await conn.query(`SELECT ID_Cliente FROM cliente WHERE hash = ?`, hash);
  ID_Cliente = ID_Cliente[0][0].ID_Cliente;
  const data = { nombre, cantidad_total, plazo, ID_Cliente };
  conn.query(`INSERT INTO prestamo SET ?`, data);
  res.json({ message: 'El préstamo se ha realizado correctamente.' });
};

export const methods = {
  verifyUser,
  createUser,
  getDetalles,
  getLoanHistory,
  getBalHistory,
  createTransaction,
  createLoan,
  getStats,
};
