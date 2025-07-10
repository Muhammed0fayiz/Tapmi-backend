const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String }, 
}, { timestamps: true });

module.exports = mongoose.model('CaseStudy', caseStudySchema);
