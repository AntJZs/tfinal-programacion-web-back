import { getConnSQL } from '../db/database.js';

const verifyUser = async (req, res) => {
  try {
    const { user, pass } = req.body;
    const data = { user, pass };
    const conn = await getConnSQL();
    const result = await conn.query(
      `SELECT ID_Cliente, Codigo_cuenta, Tipo_Cuenta, nombres, apellidos, correo, telefono, direccion, balance FROM cliente WHERE correo = ? OR Codigo_cuenta = ? AND hash = ?`,
      [user, user, pass]
    );
    // console.log(result[0]);
    res.json({ user: result[0] });
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
    res.json({ estado: 'Exitoso', result });
  } catch (err) {
    console.log(err);
    res.json({ estado: 'Error', message: err });
  }
};

export const methods = {
  verifyUser,
  createUser,
};
