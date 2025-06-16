export const successResponse = (res, {
    data = null,
    message = 'Success',
    shortMessage = 'Success',
    statusCode = 200
}) => {
    return res.status(statusCode).json({
        status: true,
        message,
        shortMessage,
        data
    });
};


export const errorResponse = (res, {
    message = 'Something went wrong',
    shortMessage = 'Something went wrong',
    statusCode = 500,
    data = null
}) => {
    return res.status(statusCode).json({
        status: false,
        message,
        shortMessage,
        data
    });
};
