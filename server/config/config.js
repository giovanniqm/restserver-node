/*==================================================
# - Definimos un archivo para el manejo de puerto
# - Esto para definir a futuro los entornos
# - El de producción y el de desarrollo
# - Entendiendo que el de desarrollo es nuestro equipo
# - Y producción es la NUBE
===================================================*/

// =================
//      Puerto:
// =================
process.env.PORT = process.env.PORT || 3000;

// =======================
//         Entorno:
// =======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =======================
//  Vencimiento del Token:
// =======================
/*  # - 60 segundos
    # - 60 minutos
    # - 24 horas
    # - 30 dias */

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// =======================
//  SEED de Autenticación:
// =======================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// =======================
//     Base de Datos
// =======================
let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/crud';
} else {

    urlDB = process.env.MONGO_URI;

}

process.env.URLDB = urlDB;