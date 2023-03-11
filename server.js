import { createRequire } from "module"
const require = createRequire(import.meta.url)
require('dotenv').config()
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const OPENAI_API_KEY = process.env.SECRET_API_KEY
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
 });
const PORT = YOURPORT

// init chat gpt
const openai = new OpenAIApi(configuration);
const app = express();

// middleware
app.use(express.json()) 
app.use(express.static('public'))

app.post("/gpt", async (req, res)=> {

  const { question } = req.body
  console.log(question)
  let chatResponse = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: question,
    n: 1,
    max_tokens: 100,
    temperature: 1,
  })
  const answer = chatResponse.data.choices[0].text.trim()
  res.status(200).send({ "response": answer })
  console.log(answer)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} and ready to receive requests.`);
})
