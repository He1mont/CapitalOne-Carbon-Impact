const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const openai = require("openai");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const openaiClient = new openai.OpenAI(process.env.OPENAI_API_KEY);

// Function to extract a summarized response from the OpenAI API output
const extractSummary = (response) => {
  // Split the response by periods to create sentences
  const sentences = response.split(".");
  
  // Take the first three sentences as the summary
  const summary = sentences.slice(0, 3).join(".") + "."; // Add period at the end

  return summary;
};

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  try {
    let systemPrompt;

    // Check if the user's prompt is related to reducing carbon score or transactions
    if (prompt.toLowerCase().includes("reduce my carbon score")) {
      systemPrompt = "Carbon Emission Transactions Expert focuses on the carbon impact of transactions for the bank Capital One. When it comes to reducing your carbon score, understanding the carbon impact of your transactions is crucial. I can provide insights into the carbon footprint of various transactions and suggest ways to minimize emissions.";
    } else if (prompt.toLowerCase().includes("transactions")) {
      systemPrompt = "Carbon Emission Transactions Expert focuses on the carbon impact of transactions for the bank Capital One. I can provide insights into the carbon footprint of different types of transactions and suggest strategies to reduce emissions.";
    } else {
      systemPrompt = "Carbon Emission Transactions Expert focuses on the carbon impact of transactions for the bank Capital One.";
    }

    const completion = await openaiClient.chat.completions.create({
      messages: [{ role: "user", content: prompt }, { role: "system", content: systemPrompt }],
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
    ) {
      const response = completion.choices[0].message.content;

      // Extract summarized response
      const summary = extractSummary(response);
      
      res.json({ message: summary });
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
