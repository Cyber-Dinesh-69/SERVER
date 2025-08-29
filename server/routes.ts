import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { handleChatMessage } from "./chat-handler";
import dotenv from "dotenv";
import path from "path";

// __dirname setup (future static assets ke liye useful hoga)
// CommonJS style path handling
// __dirname is available in CommonJS

// Load environment variables
dotenv.config();

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(express.json());

  // Chat endpoint
  app.post("/api/chat", handleChatMessage);

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      // Validation
      if (!name || !email || !subject || !message) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          message: "Please provide a valid email address",
        });
      }

      // TODO: Add DB save / email notification / CRM webhook here

      res.status(200).json({
        message: "Message received successfully",
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({
        message: "An error occurred while processing your request",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
