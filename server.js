const express = require("express");
const { Pool } = require("pg");
const pool = new Pool({
  connectionString:
    "postgresql://postgres:mysecretpassword@localhost:5432/users",
});

async function init() {
  const app = express();
   try{
  app.get("/get", async (req, res) => {
    const client = await pool.connect();
    const [userData] = await Promise.all([
      client.query(
        "SELECT * FROM myuser"
      ),
     
    ]);

    res
      .json({
        status: "ok",
        data: userData.rows
      })
      .end();
    await client.end();
  });

  const PORT = process.env.PORT || 3000;
  app.use(express.static("./static"));
  app.listen(PORT);

  console.log(`running on http://localhost:${PORT}`);
}catch{
    console.log(e)
}
}
init();