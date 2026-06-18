require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;


const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./db");
const jwt = require("jsonwebtoken")
const app = express();

const PORT = 3000;
app.use(cors());
app.use(express.json());

app.post("/api/register", (req, res) => {
  try {
    const { login, password } = req.body;

    console.log(login, password);

    if (!login || !password) {
      return res.status(400).json({
        success: false,
        message: "Заполните данные",
      });
    }

    const existsUser = db
      .prepare("SELECT id FROM users WHERE login = ?")
      .get(login);

    if (existsUser) {
      return res.status(400).json({
        success: false,
        message: "Такой пользователь уже существует",
      });
    }

    // console.log(existsUser);

    const salt = bcrypt.genSaltSync(10);

    const passwordHash = bcrypt.hashSync(password, salt);

    const wri = db.prepare(
      "INSERT INTO users(login, passwordHash) VALUES (?, ?)"
    );
    const info = wri.run(login, passwordHash);

    res.status(201).json({
      message: "Поздравляю! Вы авторизованы",
      success: true,
      userId: info.lastInsertRowid,
      login: login,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/auth", (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({
        success: false,
        message: "Заполните данные",
      });
    }

    const user = db.prepare("SELECT * FROM users WHERE login = ?").get(login);

    console.log(user);

    if(!user){

        return res.status(401).json({
            success: false,
            message: "Логин или пароль не верны",
          });

    }

  


    const isValid = bcrypt.compareSync(password, user.passwordHash);

    if(!isValid){
        return res.status(401).json({
            success: false,
            message: "Логин или пароль не верны",
          });
        
    }

    const token = jwt.sign({id:user.id, login:user.login, role:user.role}, JWT_SECRET, {expiresIn:"24h"});


    res.status(200).json({
        success:true,
        token,
        user:{id:user.id, login:user.login, role:user.role}
    })

  } catch (error) {
    console.log(error);
  }
});

app.delete('/api/delete', (req, res)=>{
  try {
    
    const deleteUser = db.prepare("DELETE FROM users WHERE id = ?");
    deleteUser.run(req.query.id);

    res.json({
      success:true
    })

  } catch (error) {
    console.log(error)
  }


})


const autenticate = (req, res, next) =>{
    try {
        const authHeader = req.headers['authorization'];
        const toketn = authHeader && authHeader.split(' ')[1];

        jwt.verify(toketn, JWT_SECRET, (err, user) =>{
            if(err){
                res.status(403).json({
                    error: 'Неверный или истекший токен'
                })
            }

            req.user = user;
            next()
        })
    } catch (error) {
        console.log(error)
    }
}

app.get("/", (req, res) => {
  res.json({
    success: true,
  });
});

app.listen(PORT, () => {
  console.log("server started");
});
