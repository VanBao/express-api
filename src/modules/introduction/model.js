const Repository = require("./repository")

const IntroductionRepository = require("./repository");
const introRepo = new IntroductionRepository();
module.exports = {
    list_introduction: async (query) => {
        let listData =  await introRepo.list_introduction();
        return {status: true, message: 'success', code: 0, data: listData};
    }
}