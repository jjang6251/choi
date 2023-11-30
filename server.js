const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const models = require("./models");
const PORT = '5000';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/signup', (req, res) => {
    const saltRounds = 10;
    const password = req.body.password;
    bcrypt.hash(password, saltRounds, function(err, hashed_password){
        if(err) throw err;
        models.User.create({
            userid: req.body.id,
            password: hashed_password,
            email: req.body.email,
            name: req.body.name,
            gender: req.body.gender,
            location: req.body.location,
            nickname: req.body.nickname
        })
    })
    return res.status(200).send('회원가입 완료!');
})


app.listen(PORT, () => console.log(`${PORT} connected`));