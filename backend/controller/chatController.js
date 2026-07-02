import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const chatController = async (req, res) => {
  try {

    const { message } = req.body;

    const response =
      await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: message
          }
        ]
      });

    res.json({
      reply:
      response.choices[0].message.content
    });

  } catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Chat failed"
    });

  }
};

export default chatController;