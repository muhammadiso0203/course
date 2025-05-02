export const catchError = (res, code, err) => {
    console.log(`Danggg: ${err}`);
    return res.status(code).json({
        statusCode: code,
        message: err
    });
}