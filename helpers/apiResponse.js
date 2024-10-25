exports.success = (message, result, status) => {
    return {
        message,
        error: false,
        code: status || 200,
        result
    }
}

exports.error = (message, status) => {
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];
    const findCode = codes.find((code) => code === status);

    if (!findCode) {
        status = 500;
    } else {
        statusCode = status;
    }

    return {
        message,
        code: statusCode,
        error: true
    };
}

exports.validation = (errors) => {
    return {
        message: "Validation errors",
        error: true,
        code: 422,
        errors
    };
};