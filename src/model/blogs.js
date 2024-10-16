import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User schema
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const blogSchema = new mongoose.Schema({
    blogName: {
        type: String,
        required: true
    },
    blogImage: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    blogStatus: {
        type: String,
        required: true
    },
    blogDescription: {
        type: String,
        required: true
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Storing user IDs who liked the blog
    }],
    comments: [commentSchema] // Array of comments
});

const Blogs = mongoose.model('Blogs', blogSchema);
export default Blogs;
