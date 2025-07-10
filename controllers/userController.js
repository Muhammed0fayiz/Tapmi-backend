const User = require('../models/user_profile');
const Project = require('../models/project');
const CaseStudy = require('../models/case_study');

// ✅ Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate('project')
      .populate('caseStudy');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// ✅ Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .populate('project')
      .populate('caseStudy');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user by ID', error: error.message });
  }
};

// ✅ Create new user
const createNewUser = async (req, res) => {
  try {
    const {
      name,
      age,
      heOrShe,
      email,
      phone,
      gitLink,
      linkedinLink,
      youtubeLink,
      about,
      projectName,
      projectDescription,
      caseStudyName,
      caseStudyDescription,
    } = req.body;

    const skills = JSON.parse(req.body.skills || '[]');
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    const image = req.files?.image?.[0]?.filename
      ? `${baseUrl}/uploads/${req.files.image[0].filename}`
      : '';

    const youtubeImage = req.files?.youtubeImage?.[0]?.filename
      ? `${baseUrl}/uploads/${req.files.youtubeImage[0].filename}`
      : '';

    const projectImage = req.files?.projectImage?.[0]?.filename
      ? `${baseUrl}/uploads/${req.files.projectImage[0].filename}`
      : '';

    const caseStudyImage = req.files?.caseStudyImage?.[0]?.filename
      ? `${baseUrl}/uploads/${req.files.caseStudyImage[0].filename}`
      : '';

    // ✅ Set pronouns
    let pronouns = '';
    const lowerCaseInput = heOrShe?.toLowerCase().trim();

    if (lowerCaseInput === 'male' || lowerCaseInput === 'he') {
      pronouns = 'he/him';
    } else if (lowerCaseInput === 'female' || lowerCaseInput === 'she') {
      pronouns = 'she/her';
    } else {
      pronouns = 'they/them';
    }

    // ✅ Save project
    const project = new Project({
      name: projectName,
      description: projectDescription,
      image: projectImage,
    });
    await project.save();

    // ✅ Save case study
    const caseStudy = new CaseStudy({
      name: caseStudyName,
      description: caseStudyDescription,
      image: caseStudyImage,
    });
    await caseStudy.save();

    // ✅ Save user
    const newUser = new User({
      name,
      age,
      heOrShe,
      pronouns,
      email,
      phone,
      gitLink,
      linkedinLink,
      youtubeLink,
      about,
      image,
      youtubeImage,
      skills,
      project: project._id,
      caseStudy: caseStudy._id,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};


const deleteAllUsers = async (req, res) => {
  try {
    const deletedUsers = await User.deleteMany({});
    const deletedProjects = await Project.deleteMany({});
    const deletedCaseStudies = await CaseStudy.deleteMany({});

    res.status(200).json({
      message: 'All data deleted successfully',
      deletedCounts: {
        users: deletedUsers.deletedCount,
        projects: deletedProjects.deletedCount,
        caseStudies: deletedCaseStudies.deletedCount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting data', error: error.message });
  }
};


module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  deleteAllUsers,
};
