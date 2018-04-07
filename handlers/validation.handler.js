class ValidationHandler {
	static get EMAIL_REGEX() {
		return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    }

    static get SCRIPT_REGEX() {
		return /<script[^>]*>(.*?)<\/script[^>]*>|<javascript[^>]*>(.*?)<\/javascript[^>]*>/;
    }

    static regex(value, reg) {
        if (value) {
            if (reg.test(value)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    static isEmail(value) {
        if (value) {
            if (ValidationHandler.EMAIL_REGEX.test(value)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    static checkScriptTag(str) {
        return ValidationHandler.SCRIPT_REGEX.test(str);
    }

    static testInput(data) {
        if (!data || data.constructor !== String) {
            return data;
        } else {
            data = data.trim();
            data = ValidationHandler.stripslashes(data);
            data = ValidationHandler.htmlspecialchars(data);
            return data;
        }
    }

    static stripslashes(str) {
        str = str.replace(/\\'/g, '\'');
        str = str.replace(/\\"/g, '"');
        str = str.replace(/\\0/g, '\0');
        str = str.replace(/\\\\/g, '\\');
        return str;
    }

    static htmlspecialchars(str) {
        const MAP = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };

        return str.replace(/[&<>"']/g, (m) => MAP[m]);
    }

    static decodeHtml(str) {
        const MAP = {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&#039;': "'"
        };
    
        return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, (m) => MAP[m]);
    }

    static slugify(str) {
        return str
            .toString()
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-\-+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "");
    }
}

module.exports = ValidationHandler;
