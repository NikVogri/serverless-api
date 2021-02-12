"use strict";

const dbConnection = require("../database");

const MAX_ITEMS_PER_PAGE = 25;

const getCountriesInContinent = async (event, ctx) => {
  let { page, continent } = event.pathParameters;

  const offset = Number(page) * MAX_ITEMS_PER_PAGE - MAX_ITEMS_PER_PAGE;

  const query = `SELECT * FROM countries WHERE continent LIKE '%${continent}%' && DATE(created_at) = CURDATE()
                LIMIT ${MAX_ITEMS_PER_PAGE} OFFSET ${offset}`;

  try {
    if (dbConnection.state === "disconnected") {
      dbConnection.connect();
    }

    const countries = await new Promise((resolve, reject) => {
      dbConnection.query(query, (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: countries,
        results: countries.length,
        page: Number(page),
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      success: false,
      message: "Database Error",
    };
  }
};

module.exports.handler = getCountriesInContinent;
