const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);

    //app.get('/about', restrictedPages.hasRole('Admin'), controllers.home.about);
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.post('/logout', controllers.user.logout);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);
    //Admin Func
    app.get('/addCar',controllers.admin.addCarView)
    app.post('/addCar',controllers.admin.createCar)
    //Query Func
    app.get('/viewAll',controllers.query.queryAll)

    //Rent logic
    app.get('/details/:id',controllers.rent.getRentDetails)
    
    app.post('/rent/:id',controllers.rent.rentCar)
    //Profile
    app.get('/userProfile/:id',controllers.user.getProfile)

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};