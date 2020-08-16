
const v = require('node-input-validator');
module.exports = {
    date : (date, min = 0) => {
        if (date) {
            // let numInt= moment(date).unix();
            return momentTimezone(date).tz("UTC").add(min, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        } else {
            // console.log(min)
            return momentTimezone().tz("UTC").add(min, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        }
    },
    validate: async (data, rules) => {
        let validator = new v(data, requires);
        let matched = await validator.check();
        if (!matched) {
            return {status: false, error: validator.errors}
        } else {
            return {status: true}
        }
    }
}