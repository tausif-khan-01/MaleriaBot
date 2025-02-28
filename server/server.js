import { GoogleGenerativeAI } from "@google/generative-ai";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express"; 

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json()); 

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const context = `You are a helpful human health assistant and Dengue and Maleria Detector Bot. Answer the question as best as you can.   
    If you dont know the answer, just say that you dont know, dont try to make up an answer.  Start the answer directly. No small talk please. . You are Specialized in Dengue and Maleria. If asked to detect or check the Dengue or Maleria status and if necessary ask the user to tell the required parameter values for diagnosis. 
    You can use markdown for response. Dont use I or As a doctor just tell the answer. Don't answer any question which is not related to human health. Strictly follow the instructions. You have to tell Diagnosis, Plan of treatment, precautions and care.
      `;

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;
    const prompt = `${context}\n USER : ${question}`;
    const result = await model.generateContent(prompt);
    res.json({ answer: result.response.text() });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000", `http://localhost:3000`);
});
