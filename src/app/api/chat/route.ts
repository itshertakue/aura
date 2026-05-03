import { NextResponse } from 'next/server';
import { getStats, carbonRecords } from '@/lib/data';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const stats = getStats();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      // Fallback if no key
      return NextResponse.json({
        role: 'assistant',
        content: `I've analyzed your ${stats.recordCount || 0} recent records. Your current emissions are ${stats.totalEmissions} MT CO2e. (Note: API Key not set, using simulated intelligence).`
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const context = `
      You are Aura's Climate Copilot, an expert in carbon intelligence and supply chain optimization.
      User Stats:
      - Total Emissions: ${stats.totalEmissions} MT CO2e
      - Estimated Tax Liability: ${stats.taxSavings}
      - Compliance Score: ${stats.complianceScore}%
      
      Current Records:
      ${JSON.stringify(carbonRecords.slice(0, 10))}
      
      Respond to the user's query professionally. Be concise but insightful.
      If relevant, suggest ways to reduce carbon taxes or optimize specific categories (Logistics, Manufacturing, etc.).
    `;

    console.log('Sending prompt to Gemini...');
    const fullPrompt = `${context}\n\nUser Question: ${message}`;
    
    const result = await model.generateContent(fullPrompt);
    const responseText = result.response.text();
    console.log('Gemini responded successfully');

    return NextResponse.json({
      role: 'assistant',
      content: responseText,
      stats: [
        { label: 'Current Emissions', value: stats.totalEmissions + 't' },
        { label: 'Est. Tax', value: stats.taxSavings }
      ]
    });

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Failed to reach Copilot' }, { status: 500 });
  }
}
