
let universalScore;

try{

  firebase.database().ref("score/universalScore").on('value', function(snapshot) {

    universalScore = snapshot.val();

    document.getElementById("ScoreBoard").textContent = universalScore;

  });

  function addToScore(amount) {
    firebase.database().ref("score").set({
      universalScore: universalScore + amount
    });
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