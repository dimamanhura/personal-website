export interface OpenSearchResponse<TDocument> {
  hits: {
    total: { value: number; relation: string } | number;
    max_score: number | null;
    hits: Array<{
      _index: string;
      _id: string;
      _score: number;
      _source: TDocument;
      highlight?: Record<string, string[]>;
    }>;
  };
}
