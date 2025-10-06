import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  bio: { type: String, default: '' },
  skills: { type: [String], default: [] },
  interests: { type: [String], default: [] },
  location: { type: String, default: '' },
  partnerType: { type: String, enum: ['Co-founder','Collaborator','Mentor','Investor','Other'], default: 'Collaborator' },
  avatarUrl: String,
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
