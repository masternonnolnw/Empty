const { errorMonitor } = require('events');

path = require('path')

const userRoutes = (app, fs) => {

    // variables
    const dataPath = './data/users.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/users/:id', (req, res) => {
        var userdata = require('../../data/users.json');
        for (var key in userdata) {
            if (key == req.params.id) {
                res.status(231).send(userdata[key].username);
                return;
            }
        }
        res.status(232).send("-1");
        return;
    });

    // CREATE
    app.post('/users', (req, res) => {
        // รับเป็น json body ประกอบด้วย username, password
        readFile(data => {
            // Note: this isn't ideal for production use. 
            // ideally, use something like a UUID or other GUID for a unique ID value
            const newUserId = Date.now().toString();

            req.body.username = req.body.username.toLowerCase();

            for (var key in data) {
                if (data[key].username == req.body.username) {
                    res.status(444).send("account already existed");
                    return;
                }
            }
            // add the new user
            data[newUserId.toString()] = req.body;

            writeFile(JSON.stringify(data, null, '\t'), () => {
                res.status(200).send('new user added');
            });
        },
            true);
    });


    // UPDATE
    app.put('/users/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const userId = req.params["id"];
            data[userId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/users/:id', (req, res) => {

        readFile(data => {

            // delete the user
            const userId = req.params["id"];
            delete data[userId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} removed`);
            });
        },
            true);
    });
};

module.exports = userRoutes;
