import { generateOverview } from '@/lib/bedrock';

export async function POST(req: Request) {
  try {
    const { query, results } = await req.json();

    if (!query || !results || results.length === 0) {
      return Response.json({ error: 'Query and search results are required' }, { status: 400 });
    }

    const overviewText = await generateOverview({ query, results });

    return Response.json({ overview: overviewText });
  } catch (error) {
    console.error('Bedrock API Error:', error);
    return Response.json({ error: 'Failed to generate overview' }, { status: 500 });
  }
}
