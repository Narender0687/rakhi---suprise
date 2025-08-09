
// Simple reveal and floating hearts animation
document.addEventListener('DOMContentLoaded', function(){
  const btn = document.getElementById('revealBtn');
  const surprise = document.getElementById('surprise');
  btn.addEventListener('click', () => {
    surprise.classList.remove('hidden');
    btn.style.display = 'none';
  });

  // hearts canvas
  const canvas = document.getElementById('hearts');
  const ctx = canvas.getContext('2d');
  let W, H; 
  function resize(){ W=canvas.width = innerWidth; H=canvas.height=innerHeight;}
  resize(); window.addEventListener('resize', resize);
  const hearts = [];
  function Heart(x,y,dx,dy,life,size){
    this.x=x; this.y=y; this.dx=dx; this.dy=dy; this.life=life; this.size=size;
  }
  Heart.prototype.step = function(){
    this.x += this.dx; this.y += this.dy; this.life -= 0.6; this.dy -= 0.02;
  }
  function spawn(){
    const x = Math.random()*W;
    const y = H + 20;
    const dx = (Math.random()-0.5)*1;
    const dy = - (2 + Math.random()*3);
    const life = 60 + Math.random()*40;
    const size = 8 + Math.random()*18;
    hearts.push(new Heart(x,y,dx,dy,life,size));
    if(hearts.length>120) hearts.splice(0, hearts.length-80);
  }
  function drawHeart(x,y,s){
    ctx.save();
    ctx.translate(x,y);
    ctx.beginPath();
    const topCurveHeight = s * 0.3;
    ctx.moveTo(0, topCurveHeight);
    ctx.bezierCurveTo(0, topCurveHeight - s/1.3, -s, topCurveHeight - s/1.3, -s, topCurveHeight);
    ctx.bezierCurveTo(-s, topCurveHeight + s/2, 0, topCurveHeight + s, 0, topCurveHeight + s*1.4);
    ctx.bezierCurveTo(0, topCurveHeight + s, s, topCurveHeight + s/2, s, topCurveHeight);
    ctx.bezierCurveTo(s, topCurveHeight - s/1.3, 0, topCurveHeight - s/1.3, 0, topCurveHeight);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,99,132,0.9)';
    ctx.fill();
    ctx.restore();
  }
  function loop(){
    ctx.clearRect(0,0,W,H);
    if(Math.random()<0.3) spawn();
    for(let i=0;i<hearts.length;i++){
      const h = hearts[i];
      h.step();
      drawHeart(h.x, h.y, h.size);
    }
    requestAnimationFrame(loop);
  }
  loop();
});
