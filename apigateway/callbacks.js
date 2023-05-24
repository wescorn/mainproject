
const setupCallbacks = (app, routes) => {
    routes.forEach(r => {
        if ("callback" in r) {
            app.use(r.url, function(req, res, next) {
                try {
                    r.callback(req, res);
                } catch (error) {
                    console.log('CALLBACK MIDDLEWARE ERROR', error);
                }
                next();
            });
        }
    })
}

exports.setupCallbacks = setupCallbacks