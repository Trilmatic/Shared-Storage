import { Model, ModelStatic, Sequelize } from "sequelize";

const db: Record<string, ModelStatic<Model>> = {};
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

export function useDatabase() {
  function define(property: string, value: ModelStatic<Model>) {
    db[property] = value;
  }

  return {
    define,
    db,
    sequelize
  };
}
