import { Schema, model, models } from 'mongoose';

const CategoryShema = new Schema({
    name: {
        type: String,
    },
});

const Category = models.Category || model("Category", CategoryShema);

export default Category;