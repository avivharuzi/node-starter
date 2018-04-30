const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

class PasswordHelper {
    static generateHashPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
                if (err) {
                    reject(err);
                }
        
                bcrypt.hash(password, salt, (err, hashPassword) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(hashPassword);
                });
            });
        });
    }

    static comparePassword(password, hashPassword) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hashPassword, (err, isMatch) => {
                if (err) {
                    reject(err);
                } else if (isMatch) {
                    resolve(isMatch);
                } else {
                    reject();
                }
            });
        });
    }
}

module.exports = PasswordHelper;
