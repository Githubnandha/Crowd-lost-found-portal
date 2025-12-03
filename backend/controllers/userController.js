const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const greeting = (request, response) => {
  response.status(200).send("hello world");
};

const registerUser = async (request, response) => {
  try {
    console.log(request.body);
    console.log(request.file);
    const { username, contact_number, email, password } = request.body;
    console.log(`registered password ${password}`);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const profile_photo = request.file
      ? `http://localhost:5000/${request.file.path.replace(/\\/g, "/")}`
      : null;
    const data = [
      profile_photo,
      username,
      contact_number,
      email,
      hashedPassword,
    ];
    const sql =
      "insert into users (profile_photo,username,contact_number,email,password)values(?,?,?,?,?)";
    const [result] = await pool.promise().query(sql, data);
    console.log(result);

    response.status(201).json({ message: "user registered" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ messsage: "database error" });
  }
};

const loginUser = async (request, response) => {
  try {
    const { username, password } = request.body;
    console.log(username, password);
    const SECRET_KEY = process.env.SECRET_KEY;
    const find_user =
      "SELECT user_id,username,password,profile_photo FROM users WHERE username = ?";
    const [find_user_result] = await pool
      .promise()
      .query(find_user, [username]);
    if (find_user_result.length === 0) {
      console.log("user not found");
      return response.status(404).json({ message: "user not found" });
    }
    console.log("user found");
    const result = await bcrypt.compare(
      String(password),
      find_user_result[0].password
    );
    if (!result) {
      const pass = await bcrypt.hash(password, 10)
      console.log(pass);
      console.log(find_user_result[0])
      console.log(result);
      console.log("unauthorized");
      return response.status(401).json({ message: "password incorrect" });
    }
    console.log("password correct");
    const token = jwt.sign(
      { userId: find_user_result[0].user_id, username: find_user[0].username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    response.status(200).json({
      message: "login successful",
      token,
      user_id: find_user_result[0].user_id,
      profile_photo: find_user_result[0].profile_photo,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "login error" });
  }
};

module.exports = { greeting, registerUser, loginUser };
