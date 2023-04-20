import os
from xml.dom.minidom import Document
import elasticsearch
import json


es = elasticsearch.Elasticsearch("http://localhost:9200")
print("connection successful")

# Define the index settings and mapping
index_settings = {
    "mappings": {
        "properties": {
            "crd": {
                "type": "dense_vector",
                "dims": 1000,
                "index": True,
                "similarity": "l2_norm",
                "index_options": {
                    "type": "hnsw",
                    "m": 32,
                    "ef_construction": 100
                }
            }
        }
    }
}

index_name = "pic"
# Create the index
index_name = "pic"
if es.indices.exists(index=index_name):
    print(f"Index '{index_name}' already exists.")
else:
    es.indices.create(index=index_name, body=index_settings)
    print(f"Index '{index_name}' created with settings:\n{index_settings}")
with open(f'{os.getcwd()}/data.json') as f:
    data = json.load(f)

for doc in data:
    es.index(index=index_name, document=doc)



    