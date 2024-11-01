import { DataTypes, Model, UUIDV4 } from "sequelize";
import { gamenanceDB } from ".";

// // Define a type for the creation of new records
// interface UnverifiedAccountCreationAttributes
//   extends Optional<
//     UnverifiedAccountAttributes,
//     "id" | "registerId" | "deletedAt"
//   > {}

// Create a model class
export class UnverifiedAccount extends Model {
  public id!: number;
  public firstName!: string;
  public secondaryName?: string | null;
  public lastName!: string;
  public secondaryLastName?: string | null;
  public email!: string;
  public registerId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt?: Date | null;
}

// Initialize the model
UnverifiedAccount.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secondaryName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secondaryLastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    registerId: {
      type: DataTypes.STRING,
      defaultValue: UUIDV4(),
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: gamenanceDB,
    paranoid: true,
  },
);
