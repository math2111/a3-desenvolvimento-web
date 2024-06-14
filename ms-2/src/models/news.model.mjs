import { DataTypes } from 'sequelize';
import { db } from '../db.mjs';

export const News = db.define(
  'News',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    shelterName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shelterAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shelterContact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }
)