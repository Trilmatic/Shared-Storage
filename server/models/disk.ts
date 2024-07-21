import { DataTypes, HasManyGetAssociationsMixin, Model } from "sequelize";
import { useDatabase } from "../hooks/database.js";
import { File } from "./file.js";

const { sequelize } = useDatabase();

export class Disk extends Model {
    declare getFiles: HasManyGetAssociationsMixin<File>;
    declare id: number;
    declare name: string;
    declare hash: string;
    declare password?: string | null;
}

Disk.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hash: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, { sequelize });

export function setupRelations() {
    Disk.hasMany(File, { as: 'Files', foreignKey: 'diskId' });
}
