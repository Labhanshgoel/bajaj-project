const express = require("express");

const app = express();

app.use(express.json());

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
      if (/^\d+$/.test(item)) {
        const num = Number(item);

        if (num % 2 === 0) {
          evenNumbers.push(item);
        } else {
          oddNumbers.push(item);
        }

        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        allLetters += item;
      } else {
        specialCharacters.push(item);
      }
    });

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
      user_id: "labhansh_goel_2310991965",
      email: "labhansh1965.be23@chitkara.edu.in",
      roll_number: "2310991965",
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets,
      special_characters: specialCharacters,
      sum: sum.toString(),
      concat_string: concatString
    });
  } catch (error) {
    return res.status(500).json({
      is_success: false,
      message: "Internal Server Error"
    });
  }
});

// Local testing only
if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

module.exports = app;