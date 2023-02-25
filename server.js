import { createRequire } from "module"
const require = createRequire(import.meta.url)
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const OPENAI_API_KEY =  'your_key'
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
 });
const PORT = 4088

//init chat
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


// test server
app.post("/api", async (req, res) => {
  try {

    const {question} = req.body;
    console.log(question)

    async function answer(){

      const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: question,
            n: 1,
            max_tokens: 50,
            temperature: 1,
          })
      return response 
    }
    answer()
    .then((result) => {
      const answer = result.data.choices[0].text.trim()
      console.log(answer)
      res.status(200).json(answer);
      })
  } 
  
  catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
  
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} and ready to receive requests.`);
});
