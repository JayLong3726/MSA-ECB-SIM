var ECB={wearers:[],battery:100,pendingSlot:null};

function renderBoard(){
  var board=document.getElementById("board");
  if(!board)return;
  var html="";
  for(var i=1;i<=6;i++){
    var w=null;
    for(var j=0;j<ECB.wearers.length;j++){if(ECB.wearers[j].slot===i)w=ECB.wearers[j];}
    if(!w){
      html+='<div class="slot empty"><div class="num">'+i+'</div><div class="label">Slot Available</div></div>';
      continue;
    }
    var teamHtml=w.team
      ? '<div class="team-name">'+escapeHtml(w.team)+'</div>'
      : '<div class="team-picker"><button class="new" type="button" onclick="newTeam('+i+')">NEW TEAM</button><button class="alpha" type="button" onclick="useAlpha('+i+')">ALPHA 1</button></div>';
    var alarmHtml=w.alarm
      ? '<div class="alarm">'+escapeHtml(w.alarm)+'<button type="button" onclick="confirmAlarm('+i+')">CONFIRM</button></div>'
      : '';
    html+='<div class="slot occupied">'+alarmHtml+
      '<div class="wearer"><div class="num">'+i+'</div><div class="data">'+
      '<div class="pressure">'+w.pressure+'<small>bar</small></div><div class="bar"></div>'+
      '<div class="meta"><span>TOW: '+w.tow+'</span><span>◉</span><span>▣</span></div>'+
      '</div><button class="evac" type="button" onclick="sendEvac('+i+')"><span class="runner">↪</span><span>EVACUATE</span></button></div>'+
      teamHtml+'</div>';
  }
  board.innerHTML=html;
}

function addTally(){
  if(ECB.wearers.length>=6){alert("All six ECB slots are occupied.");return;}
  var slot=1;
  while(ECB.wearers.some(function(w){return w.slot===slot;}))slot++;
  ECB.wearers.push({slot:slot,pressure:299,tow:"18:41",team:null,alarm:null});
  renderBoard();
  ECB.pendingSlot=slot;
  openModal();
}

function openModal(){
  var modal=document.getElementById("teamModal");
  var input=document.getElementById("teamInput");
  modal.classList.remove("hidden");
  input.value="";
  setTimeout(function(){input.focus();},50);
}

function closeModal(){
  document.getElementById("teamModal").classList.add("hidden");
  ECB.pendingSlot=null;
}

function saveTeam(){
  var input=document.getElementById("teamInput");
  var name=input.value.trim()||"ALPHA 1";
  var w=ECB.wearers.find(function(x){return x.slot===ECB.pendingSlot;});
  if(w)w.team=name;
  closeModal();
  renderBoard();
}

function newTeam(slot){ECB.pendingSlot=slot;openModal();}
function useAlpha(slot){
  var w=ECB.wearers.find(function(x){return x.slot===slot;});
  if(w)w.team="ALPHA 1";
  renderBoard();
}
function sendEvac(slot){
  var w=ECB.wearers.find(function(x){return x.slot===slot;});
  if(w){w.alarm="Evacuation Sent";renderBoard();}
}
function confirmAlarm(slot){
  var w=ECB.wearers.find(function(x){return x.slot===slot;});
  if(w){w.alarm="Evacuation Confirmed";renderBoard();}
}
function resetBoard(){ECB.wearers=[];ECB.battery=100;renderBoard();}
function openMenu(){alert("M1 menu will be implemented in the next stage.");}
function updateClock(){
  var el=document.getElementById("clock");
  if(el)el.textContent=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:false});
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,function(c){return({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"})[c];});}

document.addEventListener("DOMContentLoaded",function(){
  renderBoard();
  updateClock();
  setInterval(updateClock,1000);
});
