/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

const bodyParser = require('body-parser');
const keystone = require('keystone');
const url = require('url');

const Config = require(`${global.__base}/config/Config`);
const conf = new Config();
const AppEnv = require(`${global.__base}/enum/AppEnv`);
const middleware = require('./middleware');

const importRoutes = keystone.importer(__dirname);
const Utility = require(`${global.__base}/helper/Utility`);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
const routes = {
    views: importRoutes('./views')
};

// Factory
const RestfulAPIFactory = require(`${global.__base}/routes/lib/RestfulAPIFactory`);

// Helpers
const apiRequestHelper = require(`${global.__base}/routes/lib/apiRequestHelper`);

const { getCategoryList } = require(global.__base + '/routes/handler/category/categoryGetRequest');
const { getWorkList } = require(global.__base + '/routes/handler/work/workHandlers');

// Setup Route Bindings
const indexRoute = function indexRoute(app) {
    if (process.env.APP_ENV !== 'production') {
        app.use(middleware.webpackDevMiddleware('app'));
        app.use(middleware.webpackHotMiddleware('app'));
    }

    if(conf.appEnv == AppEnv.production.key){
        app.all('*', ensureSecure);
        function ensureSecure(req, res, next){
            if(req.secure || req.headers["x-forwarded-proto"] === "https"){
              return next();
            };
            // handle port numbers if you need non defaults
            res.redirect('https://' + req.hostname + req.url); // express 4.x
        }
    }

    app.options('/*', (req, res) => {
        // res.set('Access-Control-Allow-Origin', '*');
        res.set(
            'Access-Control-Allow-Methods',
            'GET, POST, PATCH, PUT, DELETE'
        );
        res.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');
        res.end();
    });

    app.patch('/*', bodyParser.json({ type: 'application/*+json' }));
    // api
    app.get('/api', (req, res) => {
        const urlObject = {
            protocol: conf.enableHttp ? 'http:' : 'https:',
            host: conf.appDomain
        };
        const urls = {};
        apiRequestHelper.sendGetRes(req, res, urls);
    });

    
    app.get('/api/category', getCategoryList);
    app.get('/api/work', getWorkList);
    app.get('/*', routes.views.index);

    // import plugins' routes
    try {
        const pluginPath = `${global.__base}/plugins`;
        const plugins = Utility.getDirectories(pluginPath);
        plugins.forEach(plugin => {
            try {
                const pluginRoutesPath = `${global.__base}/plugins/${plugin}/routes.js`;
                const pluginRoutes = require(pluginRoutesPath);
                pluginRoutes(app);
            } catch (err) {
                console.log('Plugins routes.js not exist!');
            }
        });
    } catch (err) {
        console.log('Plugins folder not exist!');
    }
};

// import plugins' middleware
try {
    const pluginPath = `${global.__base}/plugins`;
    const plugins = Utility.getDirectories(pluginPath);
    plugins.forEach(plugin => {
        try {
            const pluginMiddlewarePath = `${global.__base}/plugins/${plugin}/middleware.js`;
            const pluginMiddleware = require(pluginMiddlewarePath);
            if (pluginMiddleware.preRoutes) {
                keystone.pre('routes', pluginMiddleware.preRoutes);
            }
            if (pluginMiddleware.preDynamic) {
                keystone.pre('dynamic', pluginMiddleware.preDynamic);
            }
            if (pluginMiddleware.preSignin) {
                keystone.pre('signin', pluginMiddleware.preSignin);
            }
        } catch (err) {
            console.log('Plugins middleware.js not exist!');
        }
    });
} catch (err) {
    console.log('Plugins folder not exist!');
}

exports = indexRoute;
module.exports = indexRoute;
