const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "password",
    database: "loginpage",
  },
});

const app = express();

let intialPath = path.join(__dirname, "public");

app.use(bodyParser.json());
app.use(express.static(intialPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(intialPath, "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(intialPath, "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(intialPath, "register.html"));
});

// app.post("/register-user", (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name.length || !email.length || !password.length) {
//     res.json({error:"fill all the fields"});
//   } else {
//     db("users")
//       .insert({
//         name: name,
//         email: email,
//         password: password,
//       })
//       .returning(["name", "email"])
//       .then((data) => {
//         res.json({data:data[0]});
//       })
//       .catch((err) => {
//         if (err.detail.includes("already exists")) {
//           res.json({ error: "Email already exists" });
//         }
//       });
//   }
// });

app.post("/register-user", (req, res) => {
  const { name, email, password } = req.body;

  // Email validation regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password validation regular expression
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

  if (!name.length || !email.length || !password.length) {
    res.status(400).json({ error: "Please fill all the fields" });
  } else if (!emailRegex.test(email)) {
    res.status(400).json({ error: "Invalid email address" });
  } else if (!passwordRegex.test(password)) {
    res.status(400).json({
      error:
        "Password must be at least 8 characters long and contain at least one letter and one number",
    });
  } else {
    db("users")
      .insert({
        name: name,
        email: email.toLowerCase(),
        password: password,
      })
      .returning(["name", "email"])
      .then((data) => {
        res.json({ data: data[0] });
      })
      .catch((err) => {
        if (err.message.includes("already exists")) {
          res.status(409).json({ error: "Email already exists" });
        } else {
          res
            .status(500)
            .json({ error: "An error occurred while registering the user" });
        }
      });
  }
});

// app.post("/login-user", (req, res) => {
//   const { email, password } = req.body;

//   db.select("name", "email")
//     .from("users")
//     .where({
//       email: email,
//       password: password,
//     })
//     .then((data) => {
//       if (data?.length > 0) {
//         console.log("DATAA11",data)
//         res.json({data:data[0]}).status(200)
//       } else {
//         res.json({error:"email or password is incorrect"});
//       }
//     });
// });

app.post("/login-user", (req, res) => {
  const { email, password } = req.body;

  // Email validation
  if (!isValidEmail(email)) {
    res.status(400).json({ error: "Invalid email format" });
    return;
  }

  // Password validation
  if (!isValidPassword(password)) {
    res.status(400).json({
      error:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
    });
    return;
  }

  db.select("name", "email")
    .from("users")
    .where({
      email: email.toLowerCase(),
      password: password,
    })
    .then((data) => {
      if (data?.length > 0) {
        console.log("DATAA11", data);
        res.status(200).json({ data: data[0] });
      } else {
        res.status(400).json({ error: "Email or password is incorrect" });
      }
    });
});

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password validation function
function isValidPassword(password) {
  // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
}

app.listen(3000, (req, res) => {
  console.log("listening on port 4000......");
});
