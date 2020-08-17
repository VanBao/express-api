const { Validator } = require('node-input-validator');
module.exports = {
    format_date : (date, min = 0) => {
        if (date) {
            // let numInt= moment(date).unix();
            return momentTimezone(date).tz("UTC").add(min, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        } else {
            // console.log(min)
            return momentTimezone().tz("UTC").add(min, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        }
    },
    validate_input: async (data, rules) => {
        const validator = new Validator(data, rules);
        let matched = await validator.check();
        if (!matched) {
            return {status: false, error: validator.errors}
        } else {
            return {status: true, error: null}
        }
    }
}