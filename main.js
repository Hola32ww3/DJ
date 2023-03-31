scoreRightWrist = "0";
socerLeftWrist = "0";
rightWristX = "0";
rightWristY = "0";
leftWristX = "0";
leftWristY = "0";

function preload()
{
        song = loadSound("cancion.mp3");
}

function setup()
{
    video = createCapture(VIDEO);
    video.hide();
    canvas = createCanvas(600, 500);
    canvas.position(650,250);

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded()
{
    console.log('PoseNet se a inicializado');
}
function gotPoses(results)
{
    if (results.length > 0) {
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("ola");
        socerLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
    }
}
function draw()
{
    image(video, 0, 0, 600, 500);
    fill("#B1FF07");
    stroke("#000000");
    if (scoreRightWrist >0.2) {
        circle(rightWristX,rightWristY,20);
        if (rightWristY >0 && rightWristY <=100)
        {
            document.getElementById("speed").innerHTML = "Velocidad = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristY >100 && rightWristY <=200)
        {
            document.getElementById("speed").innerHTML = "Velocidad = 1x";
            song.rate(1);
        }
        else if(rightWristY >200 && rightWristY <=3000)
        {
            document.getElementById("speed").innerHTML = "Velocidad = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristY >300 && rightWristY <=400)
        {
            document.getElementById("speed").innerHTML = "Velocidad = 2x";
            song.rate(2);
        }
        else if (rightWristY >400 && rightWristY <=500) 
        {
            document.getElementById("speed").innerHTML = "Velocidad = 2.5x";
            song.rate(2.5);    
        }
    }
    if(socerLeftWrist > 0.2)
    {
        InNumberleftWristY = Number(leftWristY);
        circle(leftWristX,leftWristY,20);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = 'Volume = ' + volume;
        song.setVolume(volume);
    } 
}
function play()
{
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}