"use strict";

const dbConnection = require("../database");

const getAllCountries = async (event, ctx) => {
  let { country } = event.pathParameters;
  const query = `SELECT * FROM countries WHERE country = '${country}'`;

  try {
    if (dbConnection.state === "disconnected") {
      dbConnection.connect();
    }

    const country = await new Promise((resolve, reject) => {
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
        data: country,
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

module.exports.handler = getAllCountries;
