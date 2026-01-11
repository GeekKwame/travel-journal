import fs from "fs";

const envContent = fs.readFileSync(".env.local", "utf8");
const match = envContent.match(/GEMINI_API_KEY=(.*)/);
const apiKey = match ? match[1].trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1') : null;

async function listProModels() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        if (data.models) {
            const modelsPro = data.models.filter(m => m.name.toLowerCase().includes("pro"));
            console.log("Found Pro models:");
            modelsPro.forEach(m => console.log(`- ${m.name}`));
        } else {
            console.log("No models found:", data);
        }
    } catch (err) {
        console.error("Fetch error:", err);
    }
}

listProModels();
