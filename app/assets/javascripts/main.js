$(document).ready(function(){
  var dataRecord = [];
  var recording = false;
  var bufferSize = 256;
  var amplitude = document.getElementById('amplitude');
  var spectrum = document.getElementById('spectrum');
  var dot =  document.createElement("div");
  dot.style.position = 'absolute';
  dot.className = 'dot';
  
  function drawPoint(axitX,axitY){
    
  }
  function showAmpitude(arr,size,gain){
    for(var i=0; i<size; i++){
      dot.style.bottom = gain*arr[i].toString()+"px";
      dot.style.left = 2*i.toString()+"px";
      dot.style.height = '2px';
      dot.style.width = '2px';
      dot.style.backgroundColor = '#000';
      $(dot).clone().appendTo(amplitude);
    }
  }
  function showSpectrum(arr,size,gain){
    for(var i=0; i<size; i++){
      var a =gain*arr[i];
      if(a>400){
        a = 400;
      }
      dot.style.backgroundColor = '#0000FF';
      dot.style.bottom = "0px";
      dot.style.left = 10*i.toString()+"px";
      dot.style.width = "8px";
      dot.style.height = a.toString()+"px";
      $(dot).clone().appendTo(spectrum);
    }
  }
  function clearScreen(){
    $(".dot").remove();
  }
  
  var handleSuccess = function(stream) {
    var context = new AudioContext();
    var source = context.createMediaStreamSource(stream);
    var processor = context.createScriptProcessor(bufferSize, 1, 1);

    source.connect(processor);
    processor.connect(context.destination);

    processor.onaudioprocess = function(e) {
      if(recording){
        clearScreen();
        var sampleSnapshot = e.inputBuffer.getChannelData(0);
        //dataRecord.push(sampleSnapshot);
        showAmpitude(sampleSnapshot,bufferSize,100);
        showSpectrum(DFT(sampleSnapshot,1),bufferSize/5,10);
      }
    };
  };
  
  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess);
  
  $("#record").click(function(){
    if(recording){
      recording = false;
      $(this).text("Start Record");
    }else{
      recording = true;
      dataRecord = [];
      $(this).text("Stop Record");
    }
  });
  var pathvideo = document.getElementById('pathvideo');
  var video = document.getElementById('video');
  const change = function(e) {
      video.innerHTML = e.target.value;
    }
  pathvideo.addEventListener('input', change);
});