import json

# Load the JSON document
with open('data.json', 'r') as f:
    data = json.load(f)

# Iterate over the documents and rename the "vector" field to "crd"
for doc in data:
    if 'vector' in doc:
        doc['crd'] = doc.pop('vector')

# Save the modified JSON document
with open('data.json', 'w') as f:
    json.dump(data, f, indent=2)