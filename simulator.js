const state={battery:100,wearers:[]};
let pendingSlot=null;

function render(){
  const board=document.getElementById("board");
  board.innerHTML="";
  for(let i=1;i<=6;i++){
    const w=state.wearers.find(x=>x.slot===i);
    if(!w){
      board.insertAdjacentHTML("beforeend",`<div class="slot"><div class="slot-number">${i}</div><div class="slot-content">Slot Available</div></div>`);
      continue;
    }
    board.insertAdjacentHTML("beforeend",`
      <div class="slot occupied">
        <div class="occupied-main">
          <div class="slot-number">${i}</div>
          <div class="wearer-data">
            <div class="pressure">${w.pressure}<span>bar</span></div>
            <div class="pressure-line"></div>
            <div class="tow">TOW: ${w.tow || "--:--"} <span class="radio">◉</span></div>
          </div>
          <button class="evac" title="Evacuate"><span class="man">↪</span><span>EVACUATE</span></button>
        </div>
        ${!w.team ? `<div class="team-actions"><button class="new-team" onclick="newTeam(${i})">NEW TEAM</button><button class="team-choice" onclick="chooseTeam(${i})">ALPHA 1</button></div>` : ""}
      </div>`);
  }
}

function addTally(){
  if(state.wearers.length>=6)return;
  const slot=state.wearers.length+1;
  state.wearers.push({slot,pressure:299,team:null,tow:"18:41"});
  render();
  pendingSlot=slot;
  openTeamModal();
}
function openTeamModal(){document.getElementById("teamModal").classList.remove("hidden");document.getElementById("teamName").focus()}
function closeTeamModal(){document.getElementById("teamModal").classList.add("hidden");pendingSlot=null}
function saveTeam(){
  const name=document.getElementById("teamName").value.trim()||"ALPHA 1";
  const w=state.wearers.find(x=>x.slot===pendingSlot);
  if(w)w.team=name;
  document.getElementById("teamName").value="";
  closeTeamModal();render();
}
function newTeam(slot){pendingSlot=slot;openTeamModal()}
function chooseTeam(slot){const w=state.wearers.find(x=>x.slot===slot);if(w)w.team="ALPHA 1";render()}
function resetBoard(){state.wearers=[];state.battery=100;render()}
function updateClock(){document.getElementById("clock").textContent=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:false})}

document.getElementById("tallyBtn").onclick=addTally;
document.getElementById("resetBtn").onclick=resetBoard;
document.getElementById("cancelTeam").onclick=closeTeamModal;
document.getElementById("saveTeam").onclick=saveTeam;
document.getElementById("teamModal").addEventListener("click",e=>{if(e.target.id==="teamModal")closeTeamModal()});
document.getElementById("teamName").addEventListener("keydown",e=>{if(e.key==="Enter")saveTeam();if(e.key==="Escape")closeTeamModal()});
render();updateClock();setInterval(updateClock,1000);
