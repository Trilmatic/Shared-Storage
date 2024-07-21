import { Disk } from "../models/disk.js";
import { findDisk, createDisk } from "../services/diskService.js";
import { createFile, listFiles } from "../services/fileService.js";

export const create = async (req, res) => {
    if (!req.body.name) {
        res.status(500);
        res.json({ status: 'error', message: 'Disk Name Required' });
        return;
    }
    const disk = await createDisk(req.body.name);
    res.json({
        disk: disk,
    });
};

export const open = async (req, res) => {
    const disk = await findDisk(req.params.diskHash) as Disk | null;

    if (!disk) {
        res.status(404);
        res.json({ status: 'error', message: 'Not found' });
        return;
    }

    const files = await listFiles(disk.id, req.query.parent ?? null);

    res.json({
        disk: disk,
        files: files,
    });
};

export const upload = async (req, res) => {
    const disk = await findDisk(req.params.diskHash) as Disk | null;
    if (!disk) {
        res.status(404);
        res.json({ status: 'error', message: 'Not found' });
        return;
    }

    req.files.forEach(async (file) => {
        await createFile(file.originalname, file.mimetype, file.destination, file.path, file.size, req.body.parent ?? null, disk.id);
    });
    res.json({ status: 'success', message: 'File Uploaded' });
};

export const createFolder = async (req, res) => {
    const disk = await findDisk(req.params.diskHash) as Disk | null;
    if (!disk) {
        res.status(404);
        res.json({ status: 'error', message: 'Not found' });
        return;
    }

    const folder = await createFile(req.body.name, null, null, null, null, req.body.parent ?? null, disk.id, true);
    res.json(folder);
};