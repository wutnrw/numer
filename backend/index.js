const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");
const app = express()

app.use(cors());

const db = mysql.createPool({
  host: "db"  || process.env.DB_HOST,
  user: "root"||  process.env.DB_USER,
  database: "numer" || process.env.DB_NAME,
  password: "123456" || process.env.DB_PASSWORD,
});

app.get('/gettoken/:name',(req,res)=>{
    const token = jwt.sign({//แปลงชื่อเป็น sign token
        user: req.params.name
    },'ss')
// console.log('token')
// console.log(token)
res.send(token)

})


app.get("/test",(req,res)=>{
  const q = "SELECT * FROM equation";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    console.log("datasucceeded");
    return res.json(data);})

})

app.get("/getequa",authorization,(req,res)=>{
    const q = "SELECT * FROM equation";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    console.log("datasucceeded");
    return res.json(data);
  });

})

function authorization(req, res, next) {
    let token = req.headers["authorization"];
    if (token === undefined) {
      res.send("don't have authorization");
    } else {
      try {
        
        token = token.split(" ")[1];
        console.log(token);
        let decode = jwt.verify(token, 'ss');
        console.log(decode);
        if (decode.user === "wut") {
          next();
        } else {
          res.send("pls authen");
        }
      } catch {
        res.send("no correct");
      }
    }
  }
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));//เอา swagger มาใช้


app.listen(9000,()=>{
    console.log("connect");
})
module.exports=app