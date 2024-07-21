import { Op } from "sequelize";
import { useDatabase } from "../hooks/database.js";
import { File } from "../models/file.js";

interface Path {
    name: string;
    id: number
};

const { db } = useDatabase();

export async function getRoot(disk: number, offset: number = 0, limit: number = 10) {
    return db.File.findAndCountAll({
        where: {
            parentId: {
                [Op.eq]: null,
            },
            diskId: {
                [Op.eq]: disk,
            }
        },
        order: [
            ['isFolder', 'DESC'],
            ['name', 'ASC'],
        ],
        offset: offset,
        limit: limit,
    });
}

export async function createFile(name: string, type: string | null, destination: string | null, path: string | null, size: string | null, parentId: number | null = null, diskId: number | null = null, isFolder: boolean = false) {
    return db.File.create({
        name: name,
        mimetype: type,
        destination: destination,
        path: path,
        size: size,
        parentId: parentId,
        diskId: diskId,
        isFolder: isFolder,
    });
}

export async function listFiles(disk: number, parent: number | null = null) {
    if (parent) {
        const file = await getFile(parent) as File | null;
        return getChildren(file, disk);
    } else {
        return getRoot(disk);
    }
}

export async function searchFiles(disk: number, search: string, offset: number = 0, limit: number = 10) {
    if (search.length < 3) return null;
    return db.File.findAndCountAll({
        where: {
            name: {
                [Op.like]: '%' + search + '%',
            },
            diskId: {
                [Op.eq]: disk,
            }
        },
        offset: offset,
        limit: limit,
    });
}

export async function getChildren(file: File, disk: number, offset: number = 0, limit: number = 10) {
    return db.File.findAndCountAll({
        where: {
            parentId: {
                [Op.eq]: file.id,
            },
            diskId: {
                [Op.eq]: disk,
            }
        },
        order: [
            ['isFolder', 'DESC'],
            ['name', 'ASC'],
        ],
        offset: offset,
        limit: limit,
    });
}

export async function getParent(file: File) {
    return file.getParent() ?? null;
}

export async function getFile(id: number) {
    return db.File.findByPk(id);
}