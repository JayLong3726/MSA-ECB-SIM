function renderController(){
  const app=document.getElementById('app');
  app.innerHTML=`<section class="controller">
    <h1>Instructor Controller</h1>
    <p>Starter controller — the full M1 simulator will be built here next.</p>
    <div class="controller-grid">
      <div class="control-card"><h3>Session</h3><button onclick="resetBoard()">RESET ECB</button></div>
      <div class="control-card"><h3>Simulation</h3><button onclick="addControlledWearer()">ADD WEARER</button></div>
    </div>
  </section>`;
}
function addControlledWearer(){ if(window.placeTally) window.placeTally(); }
if(location.search.includes('controller'))renderController();
