import { sequelize } from "../db/connection_w_models";

export const sync_all_tables_forced = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("All tables are synced with the models 📅📅📅");
  } catch (error) {
    console.log(error);
  }
};

export const alter_all_tables = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("All tables are altered with the models 📅📅📅");
  } catch (error) {
    console.log(error);
  }
};
