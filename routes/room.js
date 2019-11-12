const express = require("express");
const router = express.Router();

const Room = require("../models/room");
const User = require("../models/user");

// GET BY ID

router.get("/api/room/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const room = await Room.findById(id);

    res.send(room);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

// GET BY CITY

router.get("/api/rooms", async (req, res) => {
  try {
    const filters = createFilters(req);
    const search = Room.find(filters).populate("category");

    if (city === req.body.city) {
      const posts = await Post.find().populate("title");
    }
    const listByCity = [];
    posts.push(listByCity);
    res.json(listByCity);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

/*router.get("/product", async (req, res) => {
  

  // Ici, nous construisons notre recherche
  const search = Product.find(filters).populate("category");

  if (req.query.sort === "rating-asc") {
    search.sort({ averageRating: 1 });
  } else if (req.query.sort === "rating-desc") {
    search.sort({ averageRating: -1 });
  } else if (req.query.sort === "price-asc") {
    // Ici, nous continuons de construire notre recherche
    search.sort({ price: 1 });
  } else if (req.query.sort === "price-desc") {
    // Ici, nous continuons de construire notre recherche
    search.sort({ price: -1 });
  }

  // limit : le nombre de résultats affichés
  // skip : Ignorer les X premiers

  if (req.query.page) {
    const page = req.query.page;
    const limit = 4;

    search.limit(limit).skip(limit * (page - 1));
  }

  const products = await search;
  res.json(products);
});*/

// POST
router.post("/api/room/publish", async (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let photos = req.body.photos;
  let price = req.body.price;
  let ratingValue = req.body.ratingValue;
  let reviews = req.body.reviews;
  let city = req.body.city;
  let loc = req.body.loc;

  try {
    const newRoom = new Room({
      title: title,
      description: description,
      photos: photos,
      price: price,
      ratingValue: ratingValue,
      reviews: reviews,
      city: city,
      loc: loc
    });

    await newRoom.save();
    res.send("Room Created");
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

module.exports = router;
