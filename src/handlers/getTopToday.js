"use strict";

const dbConnection = require("../database");

const getTopToday = async (event, ctx) => {
  const query = `SELECT * FROM countries WHERE DATE(created_at) = CURDATE() ORDER BY newCases DESC LIMIT 10`;

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

module.exports.handler = getTopToday;
