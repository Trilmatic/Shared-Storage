# Storage Disk

This project is a basic example of storage system using Node.js and Vue.js.

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
npm run build
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

## Possible improvements or future implementations

- refactorings like validating requests and many more
- share function that invites users based on email
- connect to s3 using multer and track upload progress
- disk expiration and maximum size
- statistics of used space and file details
- automated tests and gh pipelines
- possibly some auth using passport or similar
