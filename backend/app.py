from flask import Flask, request, jsonify
from flask_cors import CORS
from feature import api_stuff

app = Flask(__name__)
CORS(app)
@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.json['data']
    response = api_stuff(input_data)
    return jsonify(response)

if __name__ == '__main__':
  app.run()