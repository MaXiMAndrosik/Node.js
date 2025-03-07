

function checkParams(scheme) {
    return (req, res, next) => {
        const validationResult = scheme.validate(req.params);
        if (validationResult.error) {
            return res.status(400).render('users',
                { 
                    title: 'Bad Request',
                    message: validationResult.error.details[0].message
                }
            );
        }
        next();
    };
}

function checkBody(scheme) {
    return (req, res, next) => {
        const validationResult = scheme.validate(req.body);
        if (validationResult.error) {
            return res.status(400).render('users',
                { 
                    title: 'Bad Request',
                    message: validationResult.error.details[0].message
                }
            );
        }
        next();
    };
}

module.exports = { checkParams, checkBody };