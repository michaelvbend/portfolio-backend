import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: String,
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

ProjectSchema.statics.findBySlug = function (slug) {
  return this.find({ slug });
};

const Project = mongoose.model('Project', ProjectSchema);

export default Project;
