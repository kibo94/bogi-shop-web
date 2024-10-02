import { Schema, model, models } from 'mongoose';

const CommentShema = new Schema({
 product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      }, 
 creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
  comment: {
    type: String,
    required: [true, 'Comment is required.'],
  },
  rating: {
    type: Number,
    required: [true, 'rating is required.'],
  },
});

const Comment = models.Comment || model("Comment", CommentShema);

export default Comment;