import os
import elasticsearch
import json


es = elasticsearch.Elasticsearch("http://localhost:9200")
print("connection successful")


with open(f'{os.getcwd()}/data.json') as f:
    data = json.load(f)

index_name = 'pics'
for doc in data:
    es.index(index=index_name, body=doc)