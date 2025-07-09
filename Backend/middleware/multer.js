import multer from 'multer';

// Use memory storage for Cloudinary uploads
const storage = multer.memoryStorage();

// Configure multer with file size limits
const upload = multer({ 
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit for videos
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'image') {
      // Accept only image files
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed for image field'), false);
      }
    } else if (file.fieldname === 'video') {
      // Accept only video files
      if (file.mimetype.startsWith('video/')) {
        cb(null, true);
      } else {
        cb(new Error('Only video files are allowed for video field'), false);
      }
    } else {
      cb(new Error('Unknown field'), false);
    }
  }
});

export default upload;
