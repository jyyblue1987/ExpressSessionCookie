const {v4: uuidv4} = require('uuid');


// manageSession and parseCookies
exports.parseCookies = function(req, res, next) {
    // retreive the Cookie header from the request
    const { headers: { cookie } } = req;

    // check out our readings to parse the names and values out of the cookie header
    if (cookie) {
        const values = cookie.split(';').reduce((res1, item) => {
            const data = item.trim().split('=');
            return { ...res1, [data[0]]: data[1] };
        }, {});

        // create a property called hwCookies on the request object; 
        req.hwCookies = values;
    }
    else 
        req.hwCookies = {};

    // console.log('hwCookies', JSON.stringify(req.hwCookies));

    next();
}

// create a global variable in your module; initialize it to an empty object
var sessionStore = {};


exports.manageSession = function(req, res, next) {
    // check if sessionId is in req.hwCookies    
    if( 'sessionId' in req.hwCookies )
    {
        if( req.hwCookies.sessionId in sessionStore ) // check if that session id exists within your session store
        {
            req.hwSession = sessionStore[req.hwCookies.sessionId];         

            //  add a property called sessionId to req.hwSession that has a value of the current session id
            req.hwSession.sessionId = req.hwCookies.sessionId;

            console.log('session already exists:', req.hwCookies.sessionId);

        }
    }

    // however, if there is no sessionId in hwCookies or if the sessionId isn't in our session store
    if( !req.hwSession )        
    {
        // then generate a new session id and create an em
        var sessionId = uuidv4();
        sessionStore[sessionId] = {};        

        req.hwSession = sessionStore[sessionId];

        //  add a property called sessionId to req.hwSession that has a value of the current session id
        req.hwSession.sessionId = sessionId;
        console.log('session generated:', sessionId);
    }

    res.cookie('sessionId', req.hwSession.sessionId);

    next();
}
