import { Schema, model, models } from 'mongoose';

const FavoriteSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  productImageUrl: {
    type: String,
    required: [true, 'productImageurl is required.'],
  },
  name: {
    type: String,
    required: [true, 'Name is required.'],
  },
  onStack: {
    type: Boolean,
    required: [true, 'on stack is required.'],
  },
  rating: {
    type: Number,
    required: [true, 'rating is required.'],
  },
  price: {
    type: Number,
    required: [true, 'price is required.'],
  },
  details: {
    type: String,
    required: [true, 'details is required.'],
  },

});

const Favorite = models.Favorite || model('Favorite', FavoriteSchema);

export default Favorite;