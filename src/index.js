import app from './app.js';

const main = () => {
  app.listen(app.get('port'));
  console.log(`dev: Escuchando en el puerto ${app.get('port')}! 🎉`);
};

main();
