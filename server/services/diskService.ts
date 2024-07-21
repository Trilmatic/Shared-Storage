import { Op } from "sequelize";
import { useDatabase } from "../hooks/database.js";
import Hashids from 'hashids';
import { Disk } from "../models/disk.js";

const { db } = useDatabase();
const hashids = new Hashids('', 25);

export async function findDisk(h: string) {
    return db.Disk.findOne({
        where: {
            hash: {
                [Op.eq]: h,
            },
        },
    });
}

export async function findDiskByPk(id: number) {
    return db.Disk.findByPk(id);
}

export async function createDisk(name: string) {
    const disk = await db.Disk.create({
        name: name,
    }) as Disk;

    const hash = hashids.encode(disk.id);
    disk.hash = hash;
    disk.save();

    return disk;
}