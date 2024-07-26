const requestValidator = (schema, data = {}) => {
    try {
        const { error } = schema.validate(data, { abortEarly: false })
        if (error) {
            return error
        }
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = requestValidator;