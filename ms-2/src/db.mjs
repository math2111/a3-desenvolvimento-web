import { Sequelize } from 'sequelize';

const db = new Sequelize('postgres://user:password@localhost:5433/ms-2-db')

try {
  await db.authenticate();
} catch (error) {
  console.log(error);
}

export { db }