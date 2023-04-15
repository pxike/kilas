import feature
import json
import os

directory = f"{os.getcwd()}/images"
docs = []

print(os.listdir(directory))
for filename in os.listdir(directory):
    docs.append(feature.feature(filename))

with open('data.json', 'a') as f:
    f.write(json.dumps(docs) + '\n')