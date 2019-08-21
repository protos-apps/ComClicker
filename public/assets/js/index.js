
//Swirly Brackets belong on the same line as the if statment

var settingsButtonRotation = 0;

window.onload = function(){

  firebase.auth().signInAnonymously().catch(function(error) {

    var errorCode = error.code;

    var errorMessage = error.message;

    console.log(errorCode);

    console.log(errorMessage);

  });

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    document.getElementById("LoadingAnimation").style.display = "none";

    document.getElementById("Main").style.display = "block";

  } else {

    //Couldn't sign in

  }

});

}

var universalScore;

try{

  firebase.database().ref("score/universalScore").on('value', function(snapshot) {

    universalScore = snapshot.val();

    document.getElementById("ScoreBoard").innerHTML = "World Score : <br/>" + numberWithCommas(universalScore);

  });

  function addToScore(amount) {

    if(universalScore != undefined){

      firebase.database().ref("score").set({

        universalScore: universalScore + amount

      });

    }

    else{

      document.getElementById("ScoreBoard").textContent = "Loading the score";

    }

  }

  function increment(){

    addToScore(1);

  }

}

catch(e){

  document.getElementById("ScoreBoard").textContent = "Unable to load the score";

}

function pxToInt(pixelForm){

  return parseInt(pixelForm.substring(0, pixelForm.indexOf("px")))

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Disables double tap to zoom

(function($) {
  $.fn.nodoubletapzoom = function() {
      $(this).bind('touchstart', function preventZoom(e) {
        var t2 = e.timeStamp
          , t1 = $(this).data('lastTouch') || t2
          , dt = t2 - t1
          , fingers = e.originalEvent.touches.length;
        $(this).data('lastTouch', t2);
        if (!dt || dt > 500 || fingers > 1) return; // not double-tap

        e.preventDefault(); // double tap - prevent the zoom
        // also synthesize click events we just swallowed up
        $(this).trigger('click').trigger('click');
      });
  };
})(jQuery);

//Spin Animation

function spin(ele){

  settingsButtonRotation += 180;

  document.getElementById("SettingsButton").style.transform = 'rotate(' + settingsButtonRotation + 'deg)';

}

//Opens Settings Tab

function toggleSettings(){

  $(document).ready(function(){

    $("#Settings").slideToggle(500);

  });

}

//Settings Button Side

function updateButtonSide(ele){

  if(ele.value == "right"){

    document.getElementById("SettingsButton").style.left = "auto";
    document.getElementById("SettingsButton").style.right = "20px";

    localStorage.setItem("settingsButtonSide", "right");

  }

  else{

    document.getElementById("SettingsButton").style.right = "auto";
    document.getElementById("SettingsButton").style.left = "20px";

    localStorage.setItem("settingsButtonSide", "left");

  }

}

//Sets button side onload

window.addEventListener("load", function(){

  if(localStorage.getItem("settingsButtonSide") == "right"){

    document.getElementById("SettingsButton").style.left = "auto";
    document.getElementById("SettingsButton").style.right = "20px";

    document.getElementsByClassName("SettingsSelect buttonSide")[0].getElementsByTagName('option')[0].selected = "selected";
    document.getElementsByClassName("SettingsSelect buttonSide")[0].getElementsByTagName('option')[1].selected = "";

  }

  else{

    document.getElementById("SettingsButton").style.right = "auto";
    document.getElementById("SettingsButton").style.left = "20px";

    document.getElementsByClassName("SettingsSelect buttonSide")[0].getElementsByTagName('option')[0].selected = "";
    document.getElementsByClassName("SettingsSelect buttonSide")[0].getElementsByTagName('option')[1].selected = "selected";

  }

});
