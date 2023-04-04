import numpy as np
import cv2
import os
from tensorflow import keras

def transform_img():
    PATH = "./"
    img_array = cv2.imread(os.path.join(PATH, "predict.png"), cv2.IMREAD_GRAYSCALE)
    new_array = cv2.resize(img_array, (50, 50))
    img = np.array([new_array]).reshape(-1 , 50, 50, 1)

    img = img / 255.0

    return img

def predict(img):
        
    model = keras.models.load_model(".\\app\\num_predict")
    prediction = model.predict(img)

    prediction = np.argmax(prediction[0])
    return prediction