"use strict";

const dbConnection = require("../database");

const getAllContinents = async (event, ctx) => {
  const query = `SELECT * FROM continents WHERE DATE(created_at) = CURDATE()`;

  try {
    if (dbConnection.state === "disconnected") {
      dbConnection.connect();
    }

    const continents = await new Promise((resolve, reject) => {
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
        data: continents,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      success: false,
      message: err,
    };
  }
};

module.exports.handler = getAllContinents;
