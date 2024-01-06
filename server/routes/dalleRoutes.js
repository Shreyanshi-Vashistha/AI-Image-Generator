import express from "express";
import * as dotenv from "dotenv";
// import { Configuration, OpenAIApi } from "openai";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });

// const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL-E!" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    //console.log(aiResponse.data);

    const image = aiResponse.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);

    if (error.response && error.response.data && error.response.data.error) {
      const { code, message } = error.response.data.error;

      if (code === "billing_hard_limit_reached") {
        // Billing hard limit reached
        return res.status(402).json({
          error:
            "Billing hard limit reached. Please upgrade your plan or contact support.",
        });
      } else {
        // Other errors
        return res
          .status(500)
          .json({ error: message || "Something went wrong" });
      }
    } else {
      // Unexpected errors
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
});

export default router;
