import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock';
import { generateText } from 'ai';
import fs from 'fs';
import path from 'path';
import { GlobalSearchResultItem } from '@/types';
import { env } from './config';

const AWS_BEDROCK_REGION = env.AWS_BEDROCK_REGION;
const AWS_BEDROCK_MODEL = env.AWS_BEDROCK_MODEL;

const bedrockProvider = createAmazonBedrock({
  region: AWS_BEDROCK_REGION,
});

const getSystemPrompt = (): string => {
  const promptPath = path.join(process.cwd(), 'src', 'prompts', 'overview-prompt.md');
  return fs.readFileSync(promptPath, 'utf8');
};

export const generateOverview = async ({
  query,
  results,
}: {
  query: string;
  results: GlobalSearchResultItem[];
}) => {
  const contextData = results.map((r) => ({
    title: r.title,
    type: r.type,
    subtitle: r.subtitle,
    description: r.searchableText,
  }));

  const systemPrompt = getSystemPrompt();
  const userPrompt = `Search Query: "${query}"\n\nContext JSON:\n${JSON.stringify(contextData)}`;

  const { text } = await generateText({
    model: bedrockProvider(AWS_BEDROCK_MODEL),
    system: systemPrompt,
    prompt: userPrompt,
  });

  return text;
};
