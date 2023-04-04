	// SETTING ALL VARIABLES

    var isMouseDown=false;
    var canvas = document.createElement('canvas');
    var body = document.getElementsByTagName("body")[0];
    var ctx = canvas.getContext('2d');
    var linesArray = [];
    currentSize = 13;
    var currentColor = "rgb(200,20,100)";
    var currentBg = "white";

    // INITIAL LAUNCH


    createCanvas();

    // BUTTON EVENT HANDLERS
    document.getElementById('predict').addEventListener('click', function() {

        // Get the canvas element
        const canvas = document.getElementById('canvas');

        // Convert the canvas to a data URL
        const dataUrl = canvas.toDataURL('image/png');

        // Convert the data URL to a Blob object
        const blob = dataURItoBlob(dataUrl);

        // Create a new FormData object
        const formData = new FormData();

        // Append the image Blob to the form data
        formData.append('image', blob, 'canvas.png');

        // Make a POST request with the form data
        fetch('/', {
        method: 'POST',
        body: formData
        })
        .then(response => response.json())
        .then(data => alert("I think it is: " + data['prediction']))
        .catch(error => console.error(error));

        // Helper function to convert a data URL to a Blob object
        function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
        }
    }, false);

    document.getElementById('clear').addEventListener('click', createCanvas);


    // REDRAW 

    function redraw() {
            for (var i = 1; i < linesArray.length; i++) {
                ctx.beginPath();
                ctx.moveTo(linesArray[i-1].x, linesArray[i-1].y);
                ctx.lineWidth  = linesArray[i].size;
                ctx.lineCap = "round";
                ctx.strokeStyle = linesArray[i].color;
                ctx.lineTo(linesArray[i].x, linesArray[i].y);
                ctx.stroke();
            }
    }

    // DRAWING EVENT HANDLERS

    canvas.addEventListener('mousedown', function() {mousedown(canvas, event);});
    canvas.addEventListener('mousemove',function() {mousemove(canvas, event);});
    canvas.addEventListener('mouseup',mouseup);

    // CREATE CANVAS

    function createCanvas() {
        canvas.id = "canvas";
        canvas.width = 400;
        canvas.height = 400;
        canvas.style.zIndex = 8;
        canvas.style.position = "relative";
        canvas.style.border = "1px solid";
        ctx.fillStyle = currentBg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        document.getElementById("box").appendChild(canvas);
    }




    // GET MOUSE POSITION

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    // ON MOUSE DOWN

    function mousedown(canvas, evt) {
        var mousePos = getMousePos(canvas, evt);
        isMouseDown=true
        var currentPosition = getMousePos(canvas, evt);
        ctx.moveTo(currentPosition.x, currentPosition.y)
        ctx.beginPath();
        ctx.lineWidth  = currentSize;
        ctx.lineCap = "round";
        ctx.strokeStyle = currentColor;

    }

    // ON MOUSE MOVE

    function mousemove(canvas, evt) {

        if(isMouseDown){
            var currentPosition = getMousePos(canvas, evt);
            ctx.lineTo(currentPosition.x, currentPosition.y)
            ctx.stroke();
            store(currentPosition.x, currentPosition.y, currentSize, currentColor);
        }
    }

    // STORE DATA

    function store(x, y, s, c) {
        var line = {
            "x": x,
            "y": y,
            "size": s,
            "color": c
        }
        linesArray.push(line);
    }

    // ON MOUSE UP

    function mouseup() {
        isMouseDown=false
        store()
    }