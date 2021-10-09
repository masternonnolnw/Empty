// import other routes

const path = require('path')

const { json } = require('body-parser');
const userRoutes = require('./users');

dir = path.join(process.cwd(), '/data/users.json')
const json_data = require(dir)

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });

    app.get('/login', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        
        var login_success = false;

        for (var key in json_data) {
            /* console.log(json_data[key].username) */
            if(json_data[key].username == username 
                && json_data[key].password == password) {
                    res.send(key);
                    login_success = true;
                    break;
            }
        }
        
        if(!login_success) res.send("Wrong username or passsword");
    });


    // // other routes
    userRoutes(app, fs);
};

module.exports = appRouter;