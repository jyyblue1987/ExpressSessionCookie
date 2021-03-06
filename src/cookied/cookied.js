const {v4: uuidv4} = require('uuid');

// manageSession and parseCookies
exports.parseCookies = function(req, res, next) {
    const { headers: { cookie } } = req;
    if (cookie) {
        const values = cookie.split(';').reduce((res1, item) => {
            const data = item.trim().split('=');
            return { ...res1, [data[0]]: data[1] };
        }, {});
        req.hwCookies = values;
    }
    else 
        req.hwCookies = {};

    console.log('hwCookies', JSON.stringify(req.hwCookies));

    next();
}

exports.manageSession = function(req, res, next) {
    if( !req.hwSession )
        req.hwSession = {sessionId: ''};
    

    if( !req.hwSession )
        req.hwSession.sessionId = uuidv4();

    console.log('hwSession', JSON.stringify(req.hwSession));


    next();
}
