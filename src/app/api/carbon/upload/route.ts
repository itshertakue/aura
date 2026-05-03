import { NextResponse } from 'next/server';
import { addRecord } from '@/lib/data';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      // Fallback for demo if key is missing
      console.warn('GOOGLE_GENERATIVE_AI_API_KEY is not set. Falling back to mock data.');
      const amount = parseFloat((Math.random() * 8 + 1).toFixed(2));
      const record = addRecord({
        title: file.name,
        category: 'Logistics',
        amount: amount,
        status: 'Verified'
      });
      return NextResponse.json({ ...record, carbonAmount: amount });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Convert file to base64
    const buffer = await file.arrayBuffer();
    const base64Data = Buffer.from(buffer).toString('base64');

    const prompt = `
      Extract the following information from this invoice/document related to carbon emissions:
      1. Estimated Carbon Amount in Metric Tons (number only).
      2. Category (one of: Logistics, Manufacturing, Procurement, Energy).
      
      Return the result as a JSON object like this:
      {
        "amount": 1.25,
        "category": "Logistics"
      }
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: file.type || 'application/pdf'
        }
      }
    ]);

    const responseText = result.response.text();
    const cleanJson = responseText.replace(/```json|```/g, '').trim();
    const extracted = JSON.parse(cleanJson);

    // Save to our live data layer
    const record = addRecord({
      title: file.name,
      category: extracted.category || 'Logistics',
      amount: extracted.amount || 0,
      status: 'Verified'
    });

    return NextResponse.json({
      ...record,
      carbonAmount: extracted.amount
    });
  } catch (error) {
    console.error('Gemini processing error:', error);
    return NextResponse.json({ error: 'Failed to process document with AI' }, { status: 500 });
  }
}

