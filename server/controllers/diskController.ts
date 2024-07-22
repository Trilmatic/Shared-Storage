import { Disk } from "../models/disk.js";
import { findDisk, createDisk } from "../services/diskService.js";
import { createFile, getFile, listFiles } from "../services/fileService.js";
import { File } from "../models/file.js";

export const create = async (req, res, next) => {
  if (!req.body.name) {
    res.status(500);
    res.json({ status: "error", message: "Disk Name Required" });
    return;
  }
  try {
    const disk = await createDisk(req.body.name);
    res.json({
      disk: disk,
    });
  } catch (error) {
    next(error);
  }
};

export const open = async (req, res, next) => {
  const disk = (await findDisk(req.params.diskHash)) as Disk | null;

  if (!disk) {
    res.status(404);
    res.json({ status: "error", message: "Not found" });
    return;
  }

  try {
    const files = await listFiles(disk.id, req.query.parent ?? null);

    res.json({
      disk: disk,
      files: files,
    });
  } catch (error) {
    next(error);
  }
};

export const upload = async (req, res, next) => {
  try {
    const disk = (await findDisk(req.params.diskHash)) as Disk | null;
    if (!disk) {
      res.status(404);
      res.json({ status: "error", message: "Not found" });
      return;
    }

    req.files.forEach(async (file) => {
      await createFile(
        file.originalname,
        file.mimetype,
        file.destination,
        file.path,
        file.size,
        req.body.parent ?? null,
        disk.id
      );
    });
    res.json({ status: "success", message: "File Uploaded" });
  } catch (error) {
    next(error);
  }
};

export const createFolder = async (req, res, next) => {
  try {
    const disk = (await findDisk(req.params.diskHash)) as Disk | null;
    if (!disk) {
      res.status(404);
      res.json({ status: "error", message: "Not found" });
      return;
    }

    const folder = await createFile(
      req.body.name,
      null,
      null,
      null,
      null,
      req.body.parent ?? null,
      disk.id,
      true
    );
    res.json(folder);
  } catch (error) {
    next(error);
  }
};

export const download = async (req, res, next) => {
  try {
    const disk = (await findDisk(req.params.diskHash)) as Disk | null;
    if (!disk) {
      res.status(500);
      return;
    }

    const file = (await getFile(req.params.fileId)) as File | null;

    if (!file || !file.path || file.diskId !== disk.id) {
      res.status(500);
      return;
    }

    res.download(file.path, file.name);
  } catch (error) {
    next(error);
  }
};
