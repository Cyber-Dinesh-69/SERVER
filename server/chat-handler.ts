import type { Request, Response } from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from root .env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Providers: OpenAI (Responses API) and Hugging Face fallback
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const HF_API_KEY = process.env.HF_API_KEY;

const HUGGINGFACE_API_URL =
  "https://api-inference.huggingface.co/models/google/flan-t5-small";

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

  // No intent detected
  return { reply: "" };
}

async function callOpenAI(userMessage: string): Promise<string | null> {
  if (!OPENAI_API_KEY) return null;
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: [
          {
            role: "system",
            content: "You are a helpful portfolio assistant. Keep answers concise.",
          },
          { role: "user", content: userMessage },
        ],
      }),
    });
    if (!response.ok) throw new Error(await response.text());
    const data = (await response.json()) as any;
    const text =
      data?.output_text || data?.choices?.[0]?.message?.content || null;
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

    // Lightweight local intent detection
    const intent = detectIntent(message);
    if (intent.reply && intent.action === "navigate" && intent.target) {
      return res.status(200).json(intent);
    }

    // Try OpenAI first
    const openAi = await callOpenAI(message);
    if (openAi) return res.status(200).json({ reply: openAi });

    // Fallback to HuggingFace
    const hf = await callHuggingFace(message);
    if (hf) return res.status(200).json({ reply: hf });

    // Final fallback
    return res.status(200).json({
      reply: "AI is not configured. Set OPENAI_API_KEY or HF_API_KEY in .env.",
    });
  } catch (error) {
    console.error("Error processing chat message:", error);
    res.status(500).json({
      reply: "Sorry, I'm having trouble processing your request right now.",
    });
  }
}
