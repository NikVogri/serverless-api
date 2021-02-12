"use strict";

const dbConnection = require("../database");

const getTopToday = async (event, ctx) => {
  const query = `SELECT * FROM continents WHERE continent = 'All'`;

  try {
    if (dbConnection.state === "disconnected") {
      dbConnection.connect();
    }

    const world = await new Promise((resolve, reject) => {
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
        data: world,
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

module.exports.handler = getTopToday;
