const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
        
    }
}
export {asyncHandler}



// const asyncHandler = () => {}
// const asyncHandler = (fn) => {() => {}}
// const asyncHandler = (fn) => async() => {}

// const asyncHandler = (func) => async(err, req, res, next) => {
//     try {
//         await func(err, req, res, next);
//     } catch (error) {
//         res.status(err.code || 404).json({
//             success: false,
//             message: err.message
//         })
//     }
// }