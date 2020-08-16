module.exports = (knex) => {
    return async (query, options) => {
        const perPage = options.perPage || 10;
        let page = options.page || 1;
        // console.log(1)
        // console.log(query.clone().as('inner'))
        const countQuery = knex.count('* as total').from(query.clone().as('inner'));

        if (page < 1) {
            page = 1;
        }
        const offset = (page - 1) * perPage;

        query.offset(offset);

        if (perPage > 0) {
            query.limit(perPage);
        }

        const [data, countRows] = await Promise.all([
            query,
            countQuery
        ]);

        const total = countRows[0].total;

        return {
            total:total
        };
    };
};
/*
    Usage:
    const paginator = require('./knex-paginator.js');
    const ticketsQuery = knex('tickets').select('*').orderBy('created_at', 'ASC');
    paginator(knex)(ticketsQuery, {
	    perPage: 1,
    }).then(({ data, pagination }) => {
	    console.log(data, pagination);
    }).catch(err => {
	    console.log(err);
    });

*/