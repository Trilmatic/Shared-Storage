import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "storage/");
  },
});

const upload = multer({ storage: storage });

export function useUpload() {
  return {
    upload,
  };
}
