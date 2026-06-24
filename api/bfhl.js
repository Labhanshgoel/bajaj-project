const express = require("express");

const app = express();

app.use(express.json());

const USER_ID = "labhansh_goel_2310991965";
const OFFICIAL_EMAIL = "labhansh1965.be23@chitkara.edu.in";
const ROLL_NUMBER = "2310991965";

/**
 * Health Check Endpoint
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: OFFICIAL_EMAIL
  });
});

/**
 * BFHL Endpoint
 */
app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    const oddNumbers = [];
    const evenNumbers = [];
    const alphabets = [];
    const specialCharacters = [];

    let sum = 0;
    let allLetters = "";

    data.forEach((item) => {
      // Number
      if (/^\d+$/.test(item)) {
        const num = Number(item);

        if (num % 2 === 0) {
          evenNumbers.push(item);
        } else {
          oddNumbers.push(item);
        }

        sum += num;
      }
      // Alphabet string
      else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        allLetters += item;
      }
      // Special character
      else {
        specialCharacters.push(item);
      }
    });

    // Reverse alphabetical characters and apply alternating caps
    const concatString = allLetters
      .split("")
      .reverse()
      .map((char, index) =>
        index % 2 === 0
          ? char.toUpperCase()
          : char.toLowerCase()
      )
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id: USER_ID,
      email: OFFICIAL_EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets,
      special_characters: specialCharacters,
      sum: sum.toString(),
      concat_string: concatString
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      is_success: false,
      message: "Internal Server Error"
    });
  }
});

// For local testing
if (process.env.NODE_ENV !== "production") {
  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;