const boom = require("@hapi/boom");

const mainCrud = (model) => ({
  async getOne({params: {id}}, res) {
        try {
          const item = await model.findById(id)
          return res.status(200).send(item)
    } catch (err) {
      return res.status(400).send( boom.boomify(err))
    }
  },
  async getAll(req, res) {
      try {
        const allItems = await model.find()
        return res.status(200).send(allItems)
    } catch (err) {
      return res.status(400).send( boom.boomify(err))
    }
  },
  async create({body}, res) {
      try {
          const item = new model(body)
        const newItem = await item.save()
        return res.status(200).send(newItem)
    } catch (err) {
      return res.status(400).send( boom.boomify(err))
    }
  },
    async update({ params: { id }, body}, res) {
      try {
          const updateItem = await model.findByIdAndUpdate(id, body, { new: true })
          return res.status(200).send(updateItem)
    } catch (err) {
      return res.status(400).send( boom.boomify(err))
    }
  },
  async delete({params: {id}}, res) {
      try {
          await model.findByIdAndDelete(id)
          return res.send({ status: 'OK', message: 'item has been removed'})
    } catch (err) {
      return res.status(400).send( boom.boomify(err))
    }
  },
});

module.exports = mainCrud;
