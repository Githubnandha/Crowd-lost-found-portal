const pool = require("../config/db");

const greeting = (request, response) => {
  response.status(200).send("hello world");
};
const uploadHander = (request, response) => {
  const file = request.file;
  if (!file) {
    return response.status(400).json({ message: "No file uploaded" });
  }
  const sql = "INSERT INTO files (filename,filepath) VALUES (?,?)";
  pool.query(sql, [file.originalname, file.path], (err, result) => {
    if (err) {
      console.error("DB error: ", err);
      return response.status(500).json({ message: "Database error" });
    }
    response.status(200).json({
      message: "File uploaded and saved to DB",
      fileId: result.insertId,
      filename: file.originalname,
      filepath: file.path,
    });
  });
};
const getImages = (request, response) => {
  const sql = "select * from files";
  pool.query(sql, (err, rows) => {
    if (err) {
      console.error("DB error", err);
      return response.status(500).json({ message: "Database error" });
    }
    const result = rows.map((row) => ({
      ...row,
      filepath: `http://localhost:5000/${row.filepath.replace(/\\/g, "/")}`,
    }));
    response.status(200).json(result);
  });
};
module.exports = { greeting, uploadHander, getImages };
