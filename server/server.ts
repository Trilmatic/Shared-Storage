"use strict";

import express from "express";
import cors from "cors";
import multer from "multer";

const upload = multer({ dest: 'storage' });

import { useDatabase } from "./hooks/database.js";
import { File, setupRelations as setupFileRelations } from "./models/file.js";
import { Disk, setupRelations as setupDiskRelations } from "./models/disk.js";
import { create as createDisk, createFolder, open as openDisk, upload as uploadToDisk } from "./controllers/diskController.js";

const { sequelize, define } = useDatabase();

async function setupDB() {
  try {
    define("File", File);
    define("Disk", Disk);
    setupFileRelations();
    setupDiskRelations();
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error(error);
  }
}

async function startServer() {
  try {
    await setupDB();
    const port = 3001;
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.get("/api/disk/:diskHash", openDisk);
    app.post("/api/disk", createDisk);
    app.post("/api/disk/:diskHash/files", upload.array('fileList[]', 10), uploadToDisk);
    app.post("/api/disk/:diskHash/folder", createFolder);

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();
