import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

// Read from .env.local manually since I can't use dotenv easily without installing it or if it's not working correctly
const envContent = fs.readFileSync(".env.local", "utf8");
const match = envContent.match(/GEMINI_API_KEY=(.*)/);
const apiKey = match ? match[1].trim() : null;

if (!apiKey) {
    console.error("GEMINI_API_KEY not found in .env.local");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function checkModels() {
    try {
        console.log("Testing gemini-2.0-flash (should work but maybe 429)...");
        try {
            const model20 = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            const result20 = await model20.generateContent("test");
            console.log("gemini-2.0-flash works!");
        } catch (e) {
            console.log("gemini-2.0-flash failed/quota:", e.message);
        }

        console.log("\nTesting gemini-1.5-flash...");
        try {
            const model15 = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result15 = await model15.generateContent("test");
            console.log("gemini-1.5-flash works!");
        } catch (e) {
            console.log("gemini-1.5-flash failed:", e.message);
        }

        console.log("\nTesting gemini-1.5-pro...");
        try {
            const modelPro = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
            const resultPro = await modelPro.generateContent("test");
            console.log("gemini-1.5-pro works!");
        } catch (e) {
            console.log("gemini-1.5-pro failed:", e.message);
        }

    } catch (err) {
        console.error("General error:", err);
    }
}

checkModels();
