import json
import pickle
import numpy as np

__address = None
__data_columns = None
__model = None

def get_estimated_price(address,beds,bath,area):
    try:
        loc_index = __data_columns.index(address.lower())
    except:
        loc_index = -1
    x = np.zeros(len(__data_columns))
    x[0]= beds
    x[1]= bath
    x[2]= area
    if loc_index >= 0:
        x[loc_index] = 1
    return round(__model.predict([x])[0],2)


def get_address_names():
    return __address

def load_saved_artifacts():
    print("Loading saved artifacts...start")
    global __address
    global __data_columns
    global __model
    with open("./artifacts/columns.json",'r') as f:
        __data_columns = json.load(f)['data_columns']
        __address = __data_columns[3:]
        
    with open("./artifacts/Dhaka_property_rent_model.pickle",'rb') as f:
        __model = pickle.load(f)
    print("Loading saved artifacts...done")
    

if __name__ == '__main__':
    load_saved_artifacts()
    print(get_address_names())
    print(get_estimated_price('block j, baridhara, dhaka',3,2,1700))