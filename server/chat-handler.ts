import type { Request, Response } from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from root .env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Providers: OpenAI, Groq (faster alternative), and Hugging Face fallback
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const HF_API_KEY = process.env.HF_API_KEY;

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const HUGGINGFACE_API_URL =
  "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct";

type ChatAction = { action: "navigate"; target: string } | { action?: undefined };

function detectIntent(userMessage: string): { reply: string } & ChatAction {
  const text = userMessage.toLowerCase();
  const navigateTo = (id: string, label: string) => ({
    reply: `Navigating to ${label}…`,
    action: "navigate" as const,
    target: `#${id}`,
  });

  if (/(go|take|navigate|open).*(home|start)/.test(text))
    return navigateTo("home", "Home");
  if (/(go|take|navigate|open).*(about)/.test(text))
    return navigateTo("about", "About");
  if (/(go|take|navigate|open).*(education)/.test(text))
    return navigateTo("education", "Education");
  if (/(go|take|navigate|open).*(project|work)/.test(text))
    return navigateTo("projects", "Projects");
  if (/(go|take|navigate|open).*(achievement|award)/.test(text))
    return navigateTo("achievements", "Achievements");
  if (/(go|take|navigate|open).*(contact|reach|message)/.test(text))
    return navigateTo("contact", "Contact");

  if (/what.*(can you|do you)|help|commands/.test(text)) {
    return {
      reply:
        "You can ask about projects, skills, or say things like: 'go to projects', 'open contact', 'navigate to education'.",
    };
  }

  // Portfolio-specific responses
  if (/(who|about).*(dinesh|you)/.test(text)) {
    return {
      reply: "I'm Dinesh's AI portfolio assistant! Dinesh is a cybersecurity enthusiast and developer with expertise in web technologies, data analytics, and security frameworks. You can explore his projects, education, and achievements using this portfolio.",
    };
  }

  if (/(skill|technology|tech|programming)/.test(text)) {
    return {
      reply: "Dinesh has skills in cybersecurity, web development (React, TypeScript, Node.js), data analytics, SQL, Python, and various security frameworks. Check out the 'About' section for detailed skills and the 'Projects' section for practical implementations!",
    };
  }

  if (/(project|work|portfolio)/.test(text)) {
    return {
      reply: "Dinesh has created various projects including web applications, security tools, and data analytics solutions. Navigate to the 'Projects' section to see detailed case studies with technologies used and live demos!",
    };
  }

  if (/(certificate|education|qualification)/.test(text)) {
    return {
      reply: "Dinesh holds multiple certifications in cybersecurity (Deloitte), data analytics (Microsoft BI, LinkedIn Learning), and programming languages (Python, JavaScript, SQL, CSS, HTML). Check the 'Education' section for all certificates!",
    };
  }

  if (/(contact|hire|reach|email)/.test(text)) {
    return {
      reply: "You can contact Dinesh through the contact form in the 'Contact' section, or connect via LinkedIn and other social links. He's open to cybersecurity roles, development projects, and consulting opportunities!",
    };
  }

  // No intent detected
  return { reply: "" };
}

async function callOpenAI(userMessage: string): Promise<string | null> {
  if (!OPENAI_API_KEY) return null;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful portfolio assistant for Dinesh, a cybersecurity enthusiast and developer. Keep answers concise and professional.",
          },
          { role: "user", content: userMessage },
        ],
        max_tokens: 150,
      }),
    });
    if (!response.ok) throw new Error(await response.text());
    const data = (await response.json()) as any;
    const text = data?.choices?.[0]?.message?.content || null;
    return typeof text === "string" ? text : null;
  } catch {
    return null;
  }
}

async function callGroq(userMessage: string): Promise<string | null> {
  if (!GROQ_API_KEY) return null;
  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: "system",
            content: "You are a helpful portfolio assistant for Dinesh, a cybersecurity enthusiast and developer. Keep answers concise and professional.",
          },
          { role: "user", content: userMessage },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });
    if (!response.ok) throw new Error(await response.text());
    const data = (await response.json()) as any;
    const text = data?.choices?.[0]?.message?.content || null;
    return typeof text === "string" ? text : null;
  } catch {
    return null;
  }
}

async function callHuggingFace(userMessage: string): Promise<string | null> {
  if (!HF_API_KEY) return null;
  try {
    const hfResponse = await fetch(HUGGINGFACE_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: userMessage }),
    });
    if (!hfResponse.ok) throw new Error(await hfResponse.text());
    const result = (await hfResponse.json()) as Array<{ generated_text?: string }>;
    return result?.[0]?.generated_text ?? null;
  } catch {
    return null;
  }
}

export async function handleChatMessage(req: Request, res: Response) {
  try {
    const { message } = req.body as { message?: string };
    if (!message || !message.trim()) {
      return res.status(400).json({ reply: "Please provide a message." });
    }

    // Enhanced intent detection - try this first for better user experience
    const intent = detectIntent(message);
    if (intent.reply) {
      return res.status(200).json(intent);
    }

    // Try Groq first (fast and reliable)
    const groqResponse = await callGroq(message);
    if (groqResponse) return res.status(200).json({ reply: groqResponse });

    // Try OpenAI as backup
    const openAi = await callOpenAI(message);
    if (openAi) return res.status(200).json({ reply: openAi });

    // Fallback to HuggingFace
    const hf = await callHuggingFace(message);
    if (hf) return res.status(200).json({ reply: hf });

    // Final fallback for unmatched queries
    return res.status(200).json({
      reply: "I'm Dinesh's portfolio assistant! You can ask about his skills, projects, education, or say things like 'go to projects' or 'open contact' to navigate.",
    });
  } catch (error) {
    console.error("Error processing chat message:", error);
    res.status(500).json({
      reply: "Sorry, I'm having trouble processing your request right now.",
    });
  }
}
