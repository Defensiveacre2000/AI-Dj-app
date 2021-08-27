song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_leftwrist = 0;
score_rightwrist = 0;
function preload()
{
song = loadSound("music.mp3");
}
//function load sound ends
function setup()
{
canvas = createCanvas(600 , 500);
canvas.center();
video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video , modelLoaded);
poseNet.on('pose' , gotPoses);
}
//function setup webcam ends here
function gotPoses(results)
{
if(results.length > 0)
{
console.log(results);
score_leftwrist = results[0].pose.keypoints[9].score;
score_rightwrist = results[0].pose.keypoints[10].score;
console.log("score_leftwrist = " + score_leftwrist)
console.log("score_rightwrist = " + score_rightwrist)
leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;
console.log("Left Wrist X = " + leftWristX + "Left Wrist Y = " + leftWristY);
rightWristX = results[0].pose.rightWrist.x;
rightWristY = results[0].pose.rightWrist.y;
console.log("Right Wrist X = " + rightWristX + "Right Wrist Y = " + rightWristY);
}
//if ends
}
//function got poses ends here
function modelLoaded()
{
console.log('Posenet is initialized');
}
//function modelLoaded ends here
function draw()
{
image(video , 0 , 0 , 600 , 500);
fill("#0776e6");
stroke("#ff0000");
circle(leftWristX , leftWristY , 20);
circle(rightWristX , rightWristY , 20);
if(score_leftwrist > 0.2)
{
circle(leftWristX , leftWristY , 20);
numberleftY = Number(leftWristY);
remove_decimal = floor(numberleftY);
volume = remove_decimal/500;
document.getElementById("Vl").innerHTML = "volume = " + volume;
song.setVolume(volume);
}
if(score_rightwrist > 0.2)
{
circle(rightWristX , rightWristY , 20);
//all if conditions start here
if(rightWristY > 0 && rightWristY <= 100)
{
document.getElementById('Sp').innerHTML = "Speed = 0.5X";
song.rate(0.5);
}
//slow speed
else if(rightWristY > 100 && rightWristY <= 200)
{
document.getElementById('Sp').innerHTML = "Speed = 1.0X";
song.rate(1);
}
//normal speed
else if(rightWristY > 200 && rightWristY <= 300)
{
document.getElementById('Sp').innerHTML = "Speed = 1.5X";
song.rate(1.5);
}
//little fast speed
else if(rightWristY > 300 && rightWristY <= 400)
{
document.getElementById('Sp').innerHTML = "Speed = 2.0X";
song.rate(2);
}
//fast speed
else if(rightWristY > 400 && rightWristY <= 500)
{
document.getElementById('Sp').innerHTML = "Speed = 2.5X";
song.rate(2.5);
}
//Very fast speed
}
//all ifs end here
}
//function draw canvas ends here
function Play()
{
song.play();
song.setVolume(1); //Volume of song
song.rate(1); //Playback speed of song
}