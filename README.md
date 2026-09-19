#  Banca$uya Backend
![Logo BancaSuya](./static/banner.png)    
Backend de la aplicación de BancaSuya.
Aquí se puede encontrar el código en JavaScript (Node.JS) y cada uno de los endpoints que lleva esta aplicación.

## Dependencias para la ejecución.
Esto necesita un archivo .env que contenga las siguientes variables (cambiar las de ejemplo): 
ˋˋˋ
PORT=8001
DB_USER=mysql
DB_PASSWORD=*******
DB_HOST=localhost
DB_PORT=3306
DB_NAME=bs
ˋˋˋ
| La conexión fue hecha con MySQL2, por lo que necesita una base de datos afín a ese motor de base de datos (ej. MySQL, MariaDB...)    

**Construir y ejecutar**:
ˋˋˋbash
npm install && npm run dev
ˋˋˋ
