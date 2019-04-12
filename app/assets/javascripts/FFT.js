var x = [];
function FFT(s){
  var N =s.length;
  if(N==1){
    return;
  }
  var s_odd= [];
  var s_even= [];
  for(var i=0;i<N/2;i++){
     s_odd.push(s[2*i]);
     s_even.push(s[2*i+1]);
  }
  FFT(s_even);
  FFT(s_odd);
  for(var k=0;k<N/2;k++){
    var wn = Complex(Math.cos(k*2*Math.PI/N),Math.sin(k*2*Math.PI/N));
    x[k] =  wn.mul(s_odd[k]).add(s_even[k]);
    x[k + N/2] =  wn.mul(s_odd[k]).mul(-1).add(s_even[k]);
  }
}