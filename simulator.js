const state={battery:100};

function renderSlots(){
  const target=document.getElementById("slots");
  target.innerHTML="";
  for(let i=1;i<=6;i++){
    const row=document.createElement("div");
    row.className="slot";
    row.innerHTML =
      '<div class="slot-number">'+i+'</div>'+
      '<div class="slot-label">Slot Available</div>';
    target.appendChild(row);
  }
}

function updateClock(){
  const el=document.getElementById("clock");
  if(!el)return;
  el.textContent=new Date().toLocaleTimeString([],{
    hour:"2-digit",minute:"2-digit",hour12:false
  });
}
renderSlots();
updateClock();
setInterval(updateClock,1000);
