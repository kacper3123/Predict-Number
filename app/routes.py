from flask import render_template, request, jsonify
from app import app
from app.utils import predict, transform_img




@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html')
    elif request.method == 'POST':
        file=request.files['image']
        file.save("predict.png")
        img = transform_img()

        prediction = predict(img)

        response_data = {'prediction': f'{prediction}'}
        return jsonify(response_data)

        

