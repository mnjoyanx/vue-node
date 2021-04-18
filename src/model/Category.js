const {
  Schema,
  model,
  Schema: {
    Types: { ObjectId },
  },
} = require("mongoose");

const categorySchema = new Schema({
  title: {
    type: String,
    default: "",
  },

  description: {
    type: String,
    default: "",
  },

  productId: [
    {
      type: ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = model("Category", categorySchema);
