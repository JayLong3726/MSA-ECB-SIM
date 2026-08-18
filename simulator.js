const state={battery:100,wearers:[]};

function renderECB(){
  const app=document.getElementById('app');
  if(!app)return;
  let slots='';
  for(let i=1;i<=6;i++){
    const w=state.wearers.find(x=>x.slot===i);
    slots+=w
      ? `<div class="slot occupied"><div class="slot-num">${i}</div><div class="slot-text"><strong>${w.pressure} bar</strong><br><small>TOW: --</small></div></div>`
      : `<div class="slot"><div class="slot-num">${i}</div><div class="slot-text">Slot Available</div></div>`;
  }
  app.innerHTML=`<div class="sim-wrap"><section class="ecb">
    <div class="screen">
      <div class="screen-head"><span class="menu">☰</span><span class="title">ECP ALPHA</span><span class="clock" id="clock"></span><span class="bat">BAT ${state.battery}%</span></div>
      <div class="slots">${slots}</div>
    </div>
    <div class="controls"><button onclick="placeTally()">PLACE TALLY</button><button onclick="resetBoard()">RESET</button></div>
  </section></div>`;
  tickClock();
}

function placeTally(){
  if(state.wearers.length>=6)return;
  const slot=state.wearers.length+1;
  state.wearers.push({slot,pressure:300,team:null});
  renderECB();
}

function resetBoard(){state.wearers=[];state.battery=100;renderECB()}

function tickClock(){
  const el=document.getElementById('clock');
  if(el)el.textContent=new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
}
window.placeTally=placeTally;
window.resetBoard=resetBoard;
if(!location.search.includes('controller'))renderECB();
setInterval(tickClock,1000);
