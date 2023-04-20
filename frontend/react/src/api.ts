import { Client } from '@elastic/elasticsearch';

interface SearchResult {
  _id: string;
}

export async function searches(index: string, query: Array<number>): Promise<Array<SearchResult>> {
  const client = new Client({ node: 'http://localhost:9200' });

  try {
    const response = await client.search({
      index,
      body: {
        knn: {
          field: "crd",
          query_vector: query,
          k: 10,
          num_candidates: 100
        },
        _source: ["_id"]
      }
    });
    const hits = response.hits;
    console.log(hits)
    const searchResults = hits.hits

    return searchResults;
  } catch (error) {
    console.error(`Error searching Elasticsearch index ${index}: ${error}`);
    throw error;
  }
}