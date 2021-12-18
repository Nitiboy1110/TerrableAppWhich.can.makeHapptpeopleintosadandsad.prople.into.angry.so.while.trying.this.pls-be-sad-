
prediction_1 = " "

prediction_2 = " "

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("photo_result").innerHTML = '<img id="captured_img" src=" ' + data_uri + '"/>' ;
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/nfFsafLfu/model.json' , modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded');
}

function speak()
{
    var synth = window.speechSynthesis ; 
    speech_data_1 = "The first predection is " + prediction_1;
    speech_data_2 = "The second predection is " + prediction_2;
    var UtterThis = new SpeechSynthesisUtterance (speech_data_1 + speech_data_2);
    synth.speak(UtterThis);
}

function check_photo()
{
    img = document.getElementById("captured_img");
    classifier.classify(img , got_resulting);
}

function got_resulting(error, results)
{
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if (results[0].label == "happy"){
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }

        if (results[0].label == "sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }

        if (results[0].label == "angry"){
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }

        if (results[1].label == "happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }

        if (results[1].label == "sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }

        if (results[1].label == "angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128548;";
        }
    }
}