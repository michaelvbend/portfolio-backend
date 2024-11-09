import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    imgUrl: String,
    techStack: [String],
    githubLink: String,
    websiteLink: String,
  },
  {
    timestamps: true,
  }
);

ProjectSchema.statics.findByName = function (name) {
  return this.find({ name: name });
};

const Project = mongoose.model('Project', ProjectSchema);

export default Project;
