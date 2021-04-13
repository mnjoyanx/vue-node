const boom = require("@hapi/boom");

const mainCrud = (model) => ({
  async getOne({params: {id}}) {
        try {
        const item = await model.findById(id)
    } catch (err) {
      throw boom.boomify(err);
    }
  },
  async getAll() {
      try {
        const allItems = await model.find()
    } catch (err) {
      throw boom.boomify(err);
    }
  },
  async create({body}) {
      try {
          const newItem = new model(body)
          await newItem.save()
    } catch (err) {
      throw boom.boomify(err);
    }
  },
    async update({ params: { id }, body}) {
      try {
          const updateItem = await model.findByIdAndUpdate(id, body, { new: true })
          return updateItem
    } catch (err) {
      throw boom.boomify(err);
    }
  },
  async delete({params: {id}}) {
      try {
          await model.findByIdAndDelete(id)
          return { status: 'OK', message: 'item has been removed'}
    } catch (err) {
      throw boom.boomify(err);
    }
  },
});

module.exports = mainCrud;
