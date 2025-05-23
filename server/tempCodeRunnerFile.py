
from flask import Flask , request, jsonify
from util import get_address_names,get_estimated_price,load_saved_artifacts
import util
app = Flask(__name__)

load_saved_artifacts()
@app.route('/get_address_names')
def get_address_names():
    response = jsonify({
        'address' :util.get_address_names()
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route("/predict_rent",methods=['POST'])
def predict_rent():
    data = request.get_json()
    address = data['address']
    beds = int(data['beds'])
    bath = int(data['bath'])
    area = float(data['area'])
    
    
    response = jsonify({
         'estimated_price': util.get_estimated_price(address,beds,bath,area) 
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server for Rent Prediction")
    app.run()


