const axios = require('axios');

class RecaptchaHandler {
    static checkRecaptcha(recaptcha, remoteip) {
        return new Promise((resolve, reject) => {
            const verifyUrl = `${process.env.BASE_RECAPTCHA_URL}?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}&remoteip=${remoteip}`;
            
            axios.post(verifyUrl)
                .then((response) => {
                    if (response.data.success) {
                        resolve();
                    } else {
                        reject();
                    }
                })
                .catch(reject);
        });
    }
}

module.exports = RecaptchaHandler;
