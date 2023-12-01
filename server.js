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
    console.log(req.body);
    const saltRounds = 10;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, function(err, hashed_password){
        if(err) {
            console.error('해시 생성 중 에러 발생:', err);
            return res.status(500).send('회원가입 중 에러가 발생했습니다.');
        }

        models.User.create({
            userid: req.body.id,
            password: hashed_password,
            email: req.body.email,
            name: req.body.name,
            gender: req.body.gender,
            location: req.body.location,
            nickname: req.body.nickname
        })
        .then(() => {
            return res.status(200).send('회원가입 완료!');
        })
        .catch((error) => {
            console.error('DB에 회원가입 정보 저장 중 에러 발생:', error);
            return res.status(500).send('회원가입 정보 저장 중 에러가 발생했습니다.');
        });
    });
});



app.listen(PORT, () => console.log(`${PORT} connected`));