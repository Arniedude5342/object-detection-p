img = "";
status = "";
objects = [];
objectDetector = "";

function preload() {
    img = loadImage('Bedroom-image.jpg');
    img = loadImage('Clothes.jpg');
    img = loadImage('Fruit-basket.jpg');
    img = loadImage('kitchen-sink.jpg');
    img = loadImage('TV-image.avif');

}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw() {
    
    image(img, 0, 0, 640, 420);
    if(status != "") {
        for(var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill(255, 0 ,0);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " "+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(255, 0, 0);
            rect(objects[i].x, objects[i].y, objects[i].width ,objects[i].height);
        }
    }
}
function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
    
}