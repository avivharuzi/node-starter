const STATUS_CODE_OK = 200;

class RouteHandler {
    base(res, success, error, status, message, errors, data) {
        res.status(status);

        res.send({
            success: success,
            error: error,
            status: status,
            message: message,
            errors: errors,
            data: data
        });
    }

    static success(res, data = null, message = null) {
        RouteHandler.base(res, true, false, STATUS_CODE_OK, message, null, data);
    }

    static error(res, status, errors = null, message = null) {
        RouteHandler.base(res, false, true, status, message, errors, null);
    }
}

module.exports = RouteHandler;
