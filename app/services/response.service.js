//Success Response
exports.successResponse = function (data) {
    return response = {
        status : true,
        data : data
    }
};

//Error Response
exports.errorResponse = function (err) {
    return response = {
        status : false,
        data : err
    }
};

