const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const { error } = require("console");
const { TIMEOUT } = require("dns");
const { title } = require("process");
const send = require("send");
const app = express();
const dotenv = require("dotenv").config();

app.use(express.json());
app.use(cors());

const PORT = process.env.port || 5500;

app.get("/MusicAlbum", async (req, res) => {
  try {
    const [MusicAlbum] = await db.query("Select * from MusicAlbum");
    if (!MusicAlbum) {
      return res.status(400).send({
        message: "No data received",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Data fetched successfully",
      success: true,
      data: MusicAlbum,
    });
  } catch (e) {
    return res.status(500).send({
      message: "Can't connect with DB",
      success: false,
    });
  }
});

app.post("/MusicAlbum", async (req, res) => {
  try {
    const { album_name, artist_name, year_released, imdb_rating } = req.body;
    console.log("Received body:", req.body);
    if (!album_name || !artist_name || !year_released || !imdb_rating) {
      return res.status(400).send({
        message: "No Data received!",
        success: false,
      });
    }
    const [MusicAlbum] = await db.query(
      "Insert into MusicAlbum(album_name, artist_name, year_released, imdb_rating) VALUES (?,?,?,?)",
      [album_name, artist_name, year_released, imdb_rating]
    );
    return res.status(200).send({
      message: "Data added succesfully",
      success: true,
    });
  } catch (e) {
    return res.status(500).send({
      message: "Can't connect to db",
      success: false,
      error: e.message,
    });
  }
});

app.post("/MusicAlbum", async (req, res) => {
  try {
    const { album_name, artist_name, year_released, imdb_rating } = req.body;
    console.log("Received body:", req.body);
    if (!album_name || !artist_name || !year_released || !imdb_rating) {
      return res.status(400).send({
        message: "No Data received!",
        success: false,
      });
    }
    const [MusicAlbum] = await db.query(
      "Insert into MusicAlbum(album_name, artist_name, year_released, imdb_rating) VALUES (?,?,?,?)",
      [album_name, artist_name, year_released, imdb_rating]
    );
    return res.status(200).send({
      message: "Data added succesfully",
      success: true,
    });
  } catch (e) {
    return res.status(500).send({
      message: "Can't connect to db",
      success: false,
      error: e.message,
    });
  }
});

app.put("/MusicAlbum/:id", async (req, res) => {
  try {
    const { album_name } = req.body;
    const { id } = req.params;
    console.log(album_name);
    if (!id || !album_name) {
      return res.status(400).send({
        message: "No data received.",
        success: false,
      });
    }
    const [MusicAlbum] = await db.query(
      "UPDATE  MusicALbum set album_name=? where id =?",
      [album_name, id]
    );
    return res.status(200).send({
      message: "Data updated succesfully",
      success: true,
      data: MusicAlbum,
    });
  } catch (e) {
    return res.status(500).send({
      message: "Can't connect to DB",
      success: false,
      error: e.message,
    });
  }
});
app.delete("/MusicAlbum/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!id) {
      return res.status(400).send({
        message: "No data received",
        success: false,
      });
    }
    const [MusicALbum] = await db.query("DELETE from MusicAlbum where id=?", [
      id,
    ]);
    return res.status(200).send({
      message: "Data deleted succesfully",
      success: true,
    });
  } catch (e) {
    return res.status(500).send({
      message: "Can't connect to DB.",
      success: false,
      error: e.message,
    });
  }
});
app.get("/MusicAlbum/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        message: "Can't fetch from db",
        success: false,
      });
    }
    const [MusicALbum] = await db.query("Select * from MusicAlbum where id=?", [
      id,
    ]);
    if (MusicALbum.length !== 0) {
      console.log(MusicALbum);
      return res.status(200).send({
        message: "Data fetched from DB",
        success: true,
        data: MusicALbum,
      });
    } else {
      return res.status(404).send({
        message: "Entry doesn't exist",
        success: false,
      });
    }
  } catch (e) {
    return res.status(500).send({
      message: "Can't connect to DB",
      success: false,
      error: e.message,
    });
  }
});
app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
