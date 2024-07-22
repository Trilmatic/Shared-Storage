import {
  BelongsToGetAssociationMixin,
  DataTypes,
  HasManyGetAssociationsMixin,
  Model,
} from "sequelize";
import { useDatabase } from "../hooks/database.js";
import { Disk } from "./disk.js";

const { sequelize } = useDatabase();

export class File extends Model {
  declare getChildren: HasManyGetAssociationsMixin<File>;
  declare getParent: BelongsToGetAssociationMixin<File>;
  declare id: number;
  declare name: string;
  declare path: string | null;
  declare size: string | null;
  declare type: string | null;
  declare destination: string | null;
  declare parentId: number | null;
  declare diskId: number;
  declare isFolder: boolean;
}

File.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: File,
        key: "id",
      },
    },
    diskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Disk,
        key: "id",
      },
    },
    isFolder: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize }
);

export function setupRelations() {
  File.hasMany(File, { as: "Children", foreignKey: "parentId" });
  File.belongsTo(File, { as: "Parent", foreignKey: "parentId" });
}
