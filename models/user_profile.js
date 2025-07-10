const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String },
  heOrShe: { type: String },
  pronouns: { type: String }, 
  email: { type: String, required: true },
  phone: { type: String },
  gitLink: { type: String },
  linkedinLink: { type: String },
  youtubeLink: { type: String },
  about: { type: String },
  image: { type: String },
  youtubeImage: { type: String },
  skills: [{ type: String }],
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  caseStudy: { type: mongoose.Schema.Types.ObjectId, ref: 'CaseStudy' },
}, { timestamps: true });

module.exports = mongoose.model('Used', userSchema);
