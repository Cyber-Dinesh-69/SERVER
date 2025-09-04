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

  // Navigation with typo tolerance
  if (/(go|take|navigate|open|naviaget|naviagte|opne).*(home|hom|start)/.test(text))
    return navigateTo("home", "Home");
  if (/(go|take|navigate|open|naviaget|naviagte|opne).*(about|abut|abot)/.test(text))
    return navigateTo("about", "About");
  if (/(go|take|navigate|open|naviaget|naviagte|opne).*(education|educaton|educaion|study|studies)/.test(text))
    return navigateTo("education", "Education");
  if (/(go|take|navigate|open|naviaget|naviagte|opne).*(project|projects|work|works|projct|projet)/.test(text))
    return navigateTo("projects", "Projects");
  if (/(go|take|navigate|open|naviaget|naviagte|opne).*(achievement|achievements|award|awards|achivment)/.test(text))
    return navigateTo("achievements", "Achievements");
  if (/(go|take|navigate|open|naviaget|naviagte|opne).*(contact|reach|message|contct|mesage)/.test(text))
    return navigateTo("contact", "Contact");

  if (/what.*(can you|do you)|help|commands|hlep|comands/.test(text)) {
    return {
      reply:
        "🤖 I can help you with:\n• Ask about Dinesh's skills, projects, or background\n• Navigate: 'go to projects', 'open contact', 'navigate to education'\n• Ask about specific people or topics\n• General portfolio questions\n\nTry asking 'Who is Dinesh?' or 'What skills does he have?'",
    };
  }

  // Portfolio-specific responses with typo tolerance
  if (/(who|about).*(dinesh|dines|dinsh|dines|you)/.test(text)) {
    return {
      reply: "Creator of this site, A web Developer | Cloud & DevOps Enthusiast",
    };
  }

  // Special response for Simran with random versions
  if (/(who|about).*(simran|simarn|simrn|shimran)/.test(text)) {
    const simranResponses = [
      "She is the source of motivation and confidence for my creator 💪\nAnd the only one who truly cares about him 🙂",
      "She is the biggest inspiration behind my creator's journey 💫\nThe one who always stands by him and truly cares 🙂",
      "She is the reason my master never gives up 💪\nHis strongest supporter and the one who truly cares ❤️"
    ];
    const randomResponse = simranResponses[Math.floor(Math.random() * simranResponses.length)];
    return {
      reply: randomResponse,
    };
  }

  if (/(skill|technology|tech|programming|skil|skils|technlogy|programing)/.test(text)) {
    return {
      reply: "💻 Technical Skills:\n• Programming: JavaScript, TypeScript, Python, SQL, HTML, CSS\n• Frameworks: React, Node.js, Express\n• Cloud & DevOps: AWS, Docker, CI/CD\n• Databases: MySQL, MongoDB\n• Tools: Git, VS Code, Postman\n• Security: Cybersecurity frameworks, Ethical Hacking\n\nCheck out the 'About' section for detailed skills and the 'Projects' section for practical implementations!",
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
            content: "You are Dinesh's intelligent portfolio assistant. Dinesh is a web developer and Cloud & DevOps enthusiast. You should be helpful, professional, and knowledgeable about his work. Handle typos and variations in questions gracefully. Keep responses concise but informative. If asked about skills, focus on web development, cloud technologies, and DevOps tools.",
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
            content: "You are Dinesh's intelligent portfolio assistant. Dinesh is a web developer and Cloud & DevOps enthusiast. You should be helpful, professional, and knowledgeable about his work. Handle typos and variations in questions gracefully. Keep responses concise but informative. If asked about skills, focus on web development, cloud technologies, and DevOps tools.",
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
      reply: "Welcome! 🤝 I’m your AI guide. Explore Dinesh’s journey through his projects, skills, and technologies.",
    });
  } catch (error) {
    console.error("Error processing chat message:", error);
    res.status(500).json({
      reply: "Sorry, I'm having trouble processing your request right now.",
    });
  }
}
