const sequelize = require('../config/connection');


const seedAll = async () => {
  await sequelize.sync(); // force true for dev

  //await seedGallery();

  //await seedPaintings();

  process.exit(0);
};

seedAll();