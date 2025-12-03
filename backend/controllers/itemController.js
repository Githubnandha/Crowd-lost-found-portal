const pool = require("../config/db");

const postLostItem = async (request, response) => {
  try {
    const { user_id, type, title, category, description, location } =
      request.body;
    const item_photo = request.file
      ? `http://localhost:5000/${request.file.path.replace(/\\/g, "/")}`
      : null;
    console.log(item_photo);
    const data = [
      user_id,
      item_photo,
      type,
      title,
      category,
      description,
      location,
    ];
    const sql = `INSERT INTO ITEMS 
                 (user_id,item_photo,type,title,category,description,location) 
                 VALUES(?,?,?,?,?,?,?)`;
    const [result] = await pool.promise().query(sql, data);
    console.log(result);
    response.status(201).json({
      message: "Item added to database",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "Database error" });
  }
};

const getAllItems = async (request, response) => {
  try {
    const sql = "select * from getItems;";
    const [result] = await pool.promise().query(sql);
    console.log(result);
    return response.status(200).json({ items: result });
  } catch (error) {
    console.log("Error ");
    return response.status(500).json("Database error");
  }
};

module.exports = { postLostItem, getAllItems };
