const models = require('./../models/index');

class MongooseHandler {
    static find(model, query = {}, select = '') {
        return new Promise((resolve, reject) => {
            models[model].find(query, select)
                .then(resolve)
                .catch(reject);
        });
    }

    static checkBeforeActionById(model, id) {
        return new Promise((resolve, reject) => {
            models[model].findById(id)
                .then((result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(`${model} does not exist`);
                    }
                })
                .catch(() => reject(`${model} does not exist`));
        });
    }

    static checkIfAlreadyExist(model, field, value) {
        return new Promise((resolve, reject) => {
            models[model].findOne({
                [field]: value
            })
            .then((result) => {
                if (result) {
                    reject(`This ${field} is already in used`);
                } else {
                    resolve();
                }
            })
            .catch(reject);
        });
    }

    static pagination(model, pageNumber, perPage, query = {}, populate = '') {
        pageNumber = pageNumber > 0 ? pageNumber - 1 : 0;

        return new Promise((resolve, reject) => {
            models[model].find(query)
                .limit(perPage)
                .skip(perPage * pageNumber)
                .populate(populate)
                .then((results) => {
                    models[model].count()
                        .then((counts) => {
                            resolve({
                                data: results,
                                page: pageNumber + 1,
                                pages: Math.ceil(counts / perPage)
                            })
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }
}

module.exports = MongooseHandler;
