import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { dietary, members, goal, budget } = await request.json();

    const message = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are Nutri, a warm and culturally intelligent AI nutritionist for diverse families in Canada.

Create a personalised 7-day food chart for a family with the following profile:
- Dietary identity: ${dietary}
- Number of family members: ${members}
- Primary health goal: ${goal}
- Weekly grocery budget: $${budget} CAD

Format your response as follows:
1. A brief 2-sentence welcome that acknowledges their cultural dietary identity warmly
2. A 7-day meal plan table with Breakfast, Lunch, and Dinner for each day
3. 3 practical grocery tips to stay within their budget
4. One key nutrition note specific to their dietary identity

Keep the tone warm, practical, and encouraging. All meals must strictly respect the dietary identity specified.`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    return NextResponse.json({ chart: content.text });
  } catch (error) {
    console.error('Nutri API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate food chart' },
      { status: 500 }
    );
  }
}