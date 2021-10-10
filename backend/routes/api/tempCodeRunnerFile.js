      const userdata = require('./backend/data/users.json');

      const userid = req.body.userid;
      const userExists = userdata.hasOwnProperty(userid);

      if (!userExists) res.status(402).send("You don't have permission");