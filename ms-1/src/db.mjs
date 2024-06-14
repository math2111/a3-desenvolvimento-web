import { Sequelize } from 'sequelize';

const db = new Sequelize('postgres://user:password@localhost:5432/ms-1-db')

try {
  await db.authenticate();
} catch (error) {
  console.log(error);
}

export { db }