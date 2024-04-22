// pages/api/get-prompt.js
import { exec } from 'child_process';

export default function handler(req, res) {
  const { prompt } = req.query;

  if (!prompt) {
    return res.status(400).json({ error: 'No prompt provided' });
  }

  // Ensure proper shell escaping to prevent injection attacks
  const safePrompt = encodeURIComponent(prompt);
  const command = `python app.py "${safePrompt}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Execution error: ${error}`);
      return res.status(500).json({ error: `Execution error: ${error.message}` });
    }
    if (stderr) {
      console.error(`Standard error: ${stderr}`);
      if (!stdout) {
        // Only send stderr as error if there's no stdout
        return res.status(500).json({ error: `Script error: ${stderr}` });
      }
    }
    // Always send stdout as response, even if there is some stderr
    res.status(200).json({ response: stdout.trim() });
  });
}