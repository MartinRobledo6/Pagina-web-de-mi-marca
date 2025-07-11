import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Mensaje vacío' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'Sos un asistente amigable y profesional de martcode.dev, especializado en desarrollo web.' },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 200
    });

    const reply = completion.choices[0].message.content;
    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Error OpenAI:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}