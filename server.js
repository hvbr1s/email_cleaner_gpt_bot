const express = require("express");
const {await} = require("axios");
const { Configuration, OpenAIApi } = require("openai");
const OPENAI_API_KEY = 'yourAPIKey'
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
 });
const PORT = 4088

const openai = new OpenAIApi(configuration);
const app = express();

app.use(express.json()) 

app.get('/', (req, res) => {
  console.log('Hello, you have reached the home route!')
});

app.post('/', (req,res) =>{
  res.status(200).send("'Hey what would you like to post?'")

});


app.post("/api", async (req, res) => {
  try {

    const {question} = req.body;
    const userprompt = JSON.stringify(question)
    console.log(question)

    async function answer(){

      const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: userprompt,
            n: 1,
            max_tokens: 50,
            temperature: 1,
          })
      return response 
    }
    answer()
    .then((result) => {
      const answer = result.data.choices[0].text.trim()
      res.status(200).json(answer);
        }) 
  } 
  
  catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
  
});

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
  console.log('Server is ready to receive requests.')
});
