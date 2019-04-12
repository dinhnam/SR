function DFT(data,gain){
  var x = new Array();
  var N =data.length;
  var k = 0;
  for(var k=0;k<N/5;k++){
    var v = Complex(0);
    for(var n=0;n<N;n++){
      var wn = Complex(Math.cos(k*n*2*Math.PI/N),-Math.sin(k*n*2*Math.PI/N));
      v =  wn.mul(gain*data[n]).add(v);
    }
    x[k] = v.abs();
  }
  return x;
}

