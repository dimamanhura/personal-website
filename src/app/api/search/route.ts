import { search } from '@/lib';
import { transformSearchResults } from '@/utils';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return Response.json({ error: 'Query is required' }, { status: 400 });
    }

    const responseBody = await search({ query });

    const hits = transformSearchResults(responseBody);

    return Response.json({ results: hits });
  } catch (error) {
    console.error('OpenSearch API Error:', error);
    return Response.json({ error: 'Search failed' }, { status: 500 });
  }
}
