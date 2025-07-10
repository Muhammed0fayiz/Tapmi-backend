const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  getAllUsers,
  getUserById,
  createNewUser,
  deleteAllUsers,
} = require('../controllers/userController');

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ✅ Create new user (with multiple image uploads)
router.post(
  '/createUser',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'projectImage', maxCount: 1 },
    { name: 'caseStudyImage', maxCount: 1 },
    { name: 'youtubeImage', maxCount: 1 },
  ]),
  createNewUser
);


router.get('/users', getAllUsers);
router.get('/user/:id', getUserById);
router.delete('/delete-all', deleteAllUsers);

module.exports = router;
