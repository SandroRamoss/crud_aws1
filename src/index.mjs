import mysql from 'mysql';

const con = mysql.createConnection({
  host: 'gym-database',
  user: 'admin',
  port:"3306",
  password: '',
  database: '',
});

export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const query = (sql, values) => new Promise((resolve, reject) => {
    con.query(sql, values, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });

  try {
    // Detectar el método HTTP
    switch (event.httpMethod) {
      case 'POST': {
        const { description, stock, estado } = JSON.parse(event.body);
        
        if (!description || !stock || !estado) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Todos los campos son obligatorios: descripción, stock y estado.' }),
          };
        }
        
        const sql = "INSERT INTO tb_producto (description,stock, estado) VALUES (?,?,?)";
        await query(sql, [description, stock, estado]);
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Se registró el producto.' }),
        };
      }

      case 'GET': {
        const sql = "SELECT * FROM tb_producto";
        const results = await query(sql);
        return {
          statusCode: 200,
          body: JSON.stringify(results),
        };
      }

      case 'PUT': {
        const { id_producto, estado } = JSON.parse(event.body);
        const sql = "UPDATE tb_producto SET estado = ? WHERE id_producto = ?";
        await query(sql, [estado, id_producto]);
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Se actualizó el valor.' }),
        };
      }

      case 'DELETE': {
        const id_producto = event.queryStringParameters?.id_producto;
        if (!id_producto) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: "El ID del producto es requerido." }),
          };
        }
        const sql = "DELETE FROM tb_producto WHERE id_producto = ?";
        await query(sql, [id_producto]);
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Se eliminó el valor.' }),
        };
      }

      default: {
        return {
          statusCode: 405,
          body: JSON.stringify({ message: 'Método no permitido.' }),
        };
      }
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error: ' + err.message }),
    };
  }
};