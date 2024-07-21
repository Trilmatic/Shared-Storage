# Shared Storage

This project is a basic example of shared storage system using Node.js and Vue.js. You can create a named storage disk and then anybody with the link can access the storage and download / upload files.

## Setup

1. Install dependencies in both client and server folders.

```bash
cd server
npm install
cd ../client
npm install
```

Running server:

```bash
cd server
npm start
```

Running the client in dev mode:

```bash
cd ../client
npm run dev
```

## Features:

- generating hash ids for disks upon creation that are then used to access the disk
- folder structure with parent / child relations

## What to implement

- share function that invites users based on email
- connect to s3 using multer and track upload progress
- possibly some auth using passport or similar
- statistics of used space and file details
- automated tests and gh pipelines
