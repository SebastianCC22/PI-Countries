"use strict";
const express = require("express");
const router = express.Router();

const sequelize = require("sequelize");
const { Op } = require("sequelize");

const { Country, Season, Activity } = require("../db.js");
const { getCountriesByName, getCountries } = require("../controllers/countriesControllers/getController");

router.use(express.json());

router.get("/", async (req, res) => {
const { name } = req.query;
  try {
    if(name){
      const countries = await getCountriesByName(name)
      if (countries.length !== 0){
        res.status(200).json(countries)
      } else {
        res.status(404).send("Error ")
      }
    } else {
      const allCountries = await getCountries();
      if(allCountries) {
        res.status(200).json(allCountries)
      } else {
        res.status(404).send('Error 404, Paises no encontrados')
      }
    }
} catch (error) {
  console.log('Error getCountries en el llamado ' + error);
}
});
  // try {
//     let { name } = req.query;
//     if (name === "" || name === undefined) {
//       let data = await Country.findAll({
//         include: [{ model: Activity }],
//       });
//       res.json(data);
//     } else if (name) {
//       const country = await Country.findAll({
//         where: sequelize.where(
//           sequelize.fn("unaccent", sequelize.col("country.name")),
//           {
//             [Op.iLike]:
//               name
//                 .normalize("NFD")
//                 .replace(/[\u0300-\u036f]/g, "")
//                 .toLowerCase() + "%",
//           }
//         ),
//         include: [{ model: Activity }],
//       });

//       if (country.length !== 0) {
//         res.json(country);
//       } else {
//         res.json([]);
//       }
//     }
//   } catch (e) {
//     console.log("/routes/countries.js get / error: ", e);
//   }
// });

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {

    // const pais = await Country.findByPk(id.toUpperCase(), {
    //   include: [{ model: Activity, include: [{ model: Season }] }],
    // });
    const pais = await Country.findOne({where: {id:id},
      include: [{ model: Activity, include: [{ model: Season }] }],
    })
    if (pais !== null) {
      res.json(pais);
    } else {
      res.json("Pa??s no encontrado");
    }
  } catch (e) {
    console.log("/routes/countries.js get /:id error: ", e);
  }
});

module.exports = router;
