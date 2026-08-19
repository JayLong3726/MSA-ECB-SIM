const state={wearers:[],battery:100};let pending=null;
function render(){
 const b=document.getElementById("board");b.innerHTML="";
 for(let i=1;i<=6;i++){
  const w=state.wearers.find(x=>x.slot===i);
  if(!w){b.insertAdjacentHTML("beforeend",`<div class="slot empty"><div class="num">${i}</div><div class="label">Slot Available</div></div>`);continue}
  let alarm=w.alarm?`<div class="alarm">${w.alarm}<button onclick="confirmAlarm(${i})">CONFIRM</button></div>`:"";
  let team=w.team?`<div class="team-name">${w.team}</div>`:`<div class="team-picker"><button class="new" onclick="newTeam(${i})">NEW TEAM</button><button class="alpha" onclick="useAlpha(${i})">ALPHA 1</button></div>`;
  b.insertAdjacentHTML("beforeend",`<div class="slot occupied">${alarm}<div class="wearer"><div class="num">${i}</div><div class="data"><div class="pressure">${w.pressure}<small>bar</small></div><div class="bar"></div><div class="meta"><span>TOW: ${w.tow}</span><span>◉</span><span>▣</span></div></div><button class="evac" onclick="sendEvac(${i})"><span class="runner">↪</span><span>EVACUATE</span></button></div>${team}</div>`);
 }
}
function add(){if(state.wearers.length>=6)return;let slot=state.wearers.length+1;state.wearers.push({slot,pressure:299,tow:"18:41",team:null,alarm:null});render();pending=slot;openModal()}
function openModal(){document.getElementById("teamModal").classList.remove("hidden");document.getElementById("teamInput").focus()}
function closeModal(){document.getElementById("teamModal").classList.add("hidden");pending=null}
function save(){let name=document.getElementById("teamInput").value.trim()||"ALPHA 1";let w=state.wearers.find(x=>x.slot===pending);if(w)w.team=name;document.getElementById("teamInput").value="";closeModal();render()}
function newTeam(slot){pending=slot;openModal()}
function useAlpha(slot){let w=state.wearers.find(x=>x.slot===slot);if(w)w.team="ALPHA 1";render()}
function sendEvac(slot){let w=state.wearers.find(x=>x.slot===slot);if(w)w.alarm="Evacuation Sent";render()}
function confirmAlarm(slot){let w=state.wearers.find(x=>x.slot===slot);if(w)w.alarm="Evacuation Confirmed";render()}
function reset(){state.wearers=[];state.battery=100;render()}
function clock(){document.getElementById("clock").textContent=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:false})}
document.getElementById("tallyBtn").onclick=add;document.getElementById("resetBtn").onclick=reset;document.getElementById("cancelTeam").onclick=closeModal;document.getElementById("saveTeam").onclick=save;document.getElementById("teamInput").onkeydown=e=>{if(e.key==="Enter")save();if(e.key==="Escape")closeModal()};render();clock();setInterval(clock,1000);
