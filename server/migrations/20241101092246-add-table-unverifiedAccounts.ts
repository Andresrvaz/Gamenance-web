/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Sequelize from "sequelize";

export default {
  up: async (queryInterface: Sequelize.QueryInterface) => {
    const transaction = await queryInterface.sequelize.transaction({
      autocommit: false,
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    });

    try {
      await queryInterface.createTable(
        "UnverifiedAccounts",
        {
          id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          firstName: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          secondaryName: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
          },
          lastName: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          secondaryLastName: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
          },
          email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          registerId: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: Sequelize.UUIDV4(),
            unique: true,
          },
          createdAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
          },
          deletedAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
          },
        },
        { transaction },
      );
      transaction.commit();
    } catch (e: any) {
      const errorMessage = e.message;
      transaction.rollback();
      throw Error(errorMessage);
    }
  },
  down: async (queryInterface: Sequelize.QueryInterface) => {
    const transaction = await queryInterface.sequelize.transaction({
      autocommit: false,
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    });

    try {
      await queryInterface.dropTable("UnverifiedAccounts");

      transaction.commit();
    } catch (e: any) {
      const errorMessage = e.message as string;
      transaction.rollback();
      throw Error(errorMessage);
    }
  },
};
