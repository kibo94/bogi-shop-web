import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
  },
  quantity: {
    type: Number,
    required: [true, 'quantity is required.'],
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

const Product = models.Product || model('Product', PromptSchema);

export default Product;