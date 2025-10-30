import { getConnSQL } from '../db/database.js';

const verifyUser = async (req, res) => {
  try {
    const { user, pass } = req.body;
    const data = { user, pass };
    const conn = await getConnSQL();
    const result = await conn.query(
      `SELECT ID_Cliente, Codigo_cuenta, Tipo_Cuenta, nombre, apellidos, correo, telefono, direccion, balance FROM cliente WHERE correo = ? OR Codigo_cuenta = ? AND hash = ?`,
      [user, user, pass]
    );
    console.log(result);
    res.json({ user: result[0] });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

export const methods = {
  verifyUser,
};
