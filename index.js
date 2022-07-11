if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const knex = require("./server/knex");
const path = require("path");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const USER_TABLE = "user";
// const passport = require("passport");
const initializePassport = require("./server/passport-config");

initializePassport(
  passport,
  async (email) => {
    const user = await knex.select().from(USER_TABLE).where({ email }).first();
    return user;
  },
  (id) => {
    return knex.select().from(USER_TABLE).where({ id }).first();
  }
);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    console.log("login ran");
    const { id, user_name, email } = req.user;
    res.status(200).json({ sucess: true, data: { id, user_name, email } });
  }
);

const categoryController = require("./server/contollers/categoryController");
const actionController = require("./server/contollers/actionController");
const tempController = require("./server/contollers/tempController");
const userController = require("./server/contollers/userController");
app.use("/categories", categoryController);
app.use("/actions", actionController);
app.use("/temps", tempController);
app.use("/users", userController);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    console.log("Running migrations");
    await knex.migrate.latest();
    console.log("Seeding data");
    await knex.seed.run();

    console.log("Starting express");
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
  } catch (err) {
    console.error("Error starting app!", err);
    process.exit(-1);
  }
})();
