import { fromNodeProviderChain } from '@aws-sdk/credential-providers';
import { Client } from '@opensearch-project/opensearch';
import { AwsSigv4Signer } from '@opensearch-project/opensearch/aws';
import { OpenSearchResponse, OpenSearchDocument } from '@/types';
import { env } from './config';

const OPENSEARCH_ENDPOINT = env.OPENSEARCH_ENDPOINT;
const INDEX_NAME = env.OPENSEARCH_INDEX_NAME;
const AWS_REGION = env.AWS_REGION;

const osClient = new Client({
  ...AwsSigv4Signer({
    region: AWS_REGION,
    service: 'es',
    getCredentials: () => fromNodeProviderChain()(),
  }),
  node: OPENSEARCH_ENDPOINT,
});

export const search = async ({
  index = INDEX_NAME,
  query,
  size = 50,
}: {
  index?: string;
  query: string;
  size?: number;
}) => {
  const response = await osClient.search({
    index,
    body: {
      query: {
        bool: {
          should: [
            {
              multi_match: {
                query,
                fields: ['title^3', 'subtitle^2'],
                fuzziness: 'AUTO',
              },
            },
            {
              match: {
                searchable_text: {
                  query,
                },
              },
            },
          ],
        },
      },
      highlight: {
        pre_tags: ['<em>'],
        post_tags: ['</em>'],
        fields: {
          searchable_text: {
            type: 'unified',
          },
        },
      },
      size,
    },
  });

  const responseBody = response.body as never as OpenSearchResponse<OpenSearchDocument>;

  return responseBody;
};
