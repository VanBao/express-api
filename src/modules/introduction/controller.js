const model = require("./model");
module.exports = {
    list_introduction: async (query) => {
        return await model.list_introduction(query);
    }
}