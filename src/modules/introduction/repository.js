class Repository {
    constructor() {
        this.db = "introduction";
        this.column = {
            id: "id",
            title: "title",
            content: "content",
            image: "image",
            status: "status",
            created_at: "created_at",
            updated_at: "updated_at"
        };
    }

    _create_select_ignore(ignore = []) {
        let select = [];
        for (let item in this.column) {
            if (ignore.indexOf(this.column[item]) === -1) {
                select.push(this.column[item]);
            }
        }
        return select;
    }

    _create_select_care(care = []) {
        let select = [];
        for (let item in this.column) {
            if (care.indexOf(this.column[item]) !== -1) {
                select.push(this.column[item]);
            }
        }
        return select;
    }

    async list_introduction(){
        return await global.db(this.db).select(this._create_select_ignore([]));
    }
}

module.exports = Repository;