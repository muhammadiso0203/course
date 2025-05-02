import Joi from 'joi';

export const userValidator = (data) => {
    const user = Joi.object({
        name: Joi.string().min(3).max(25).required(),
        email: Joi.string().min(7).max(25).required(),
        password: Joi.string().min(8).max(22).required(),
        role: Joi.string().valid('student', 'superadmin','teacher', 'user').default('student')
    });
    return user.validate(data);
}