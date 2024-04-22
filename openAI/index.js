const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const openai = require("openai");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const openaiClient = new openai.OpenAI(process.env.OPENAI_API_KEY);

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openaiClient.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo-1106",
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log("OpenAI API response:", completion.choices[0].message.content);

    if (
      completion &&
      completion.choices &&
      completion.choices.length > 0 
      // completion.choices[0].message &&
      // completion.choices[0].message.length > 0 
      
    ) {
      const response = completion.choices[0].message.content;
      res.json({ message: response });
    } else {
      console.error("Invalid response format from OpenAI API");
      res.status(500).json({ message: "Invalid response format from OpenAI API" });
    }
  } catch (error) {
    console.error("Error from OpenAI API:", error.message);
    res.status(500).json({ message: "Error from OpenAI API" });
  }
});




const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
