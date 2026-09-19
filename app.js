const labels={apple:"Jus de pomme",herbs:"Sel aux herbes",onion:"Transformation d'oignons"};
let lastCalculation=null;

function todayISO(){
  const d=new Date();
  const local=new Date(d.getTime()-d.getTimezoneOffset()*60000);
  return local.toISOString().slice(0,10);
}
document.getElementById("date").value=todayISO();

document.querySelectorAll("nav button").forEach(btn=>{
  btn.addEventListener("click",()=>openView(btn.dataset.view));
});

function openView(id){
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("active",b.dataset.view===id));
  if(id==="lots") renderLots();
  window.scrollTo({top:0,behavior:"smooth"});
}

function selectProcess(p){
  document.getElementById("process").value=p;
  renderProcess();
  openView("transform");
}

function renderProcess(){
  const p=document.getElementById("process").value;
  document.getElementById("processBadge").textContent=labels[p];
  const box=document.getElementById("dynamicFields");
  document.getElementById("result").classList.remove("show");
  lastCalculation=null;

  if(p==="apple"){
    box.innerHTML='<div class="form-grid">'+
      '<div class="field"><label>Masse initiale de pommes (kg)</label><input id="a_mass" type="number" min="0" step="0.01"></div>'+
      '<div class="field"><label>Jus obtenu (L ou kg)</label><input id="a_juice" type="number" min="0" step="0.01"></div>'+
      '<div class="field"><label>Traitement</label><select id="a_pect"><option value="non">Sans pectinase</option><option value="oui">Avec pectinase</option></select></div>'+
      '<div class="field"><label>°Brix</label><input id="a_brix" type="number" min="0" step="0.1"></div>'+
      '<div class="field"><label>pH</label><input id="a_ph" type="number" min="0" max="14" step="0.01"></div>'+
      '<div class="field"><label>Clarté (%)</label><input id="a_clear" type="number" min="0" max="100" step="0.1"></div>'+
    '</div>';
  } else if(p==="herbs"){
    box.innerHTML='<div class="form-grid">'+
      '<div class="field"><label>Poids des herbes fraîches (g)</label><input id="h_herbs" type="number" min="0" step="0.1"></div>'+
      '<div class="field"><label>Poids du sel (g)</label><input id="h_salt" type="number" min="0" step="0.1"></div>'+
      '<div class="field"><label>Poids total après séchage (g)</label><input id="h_after" type="number" min="0" step="0.1"></div>'+
      '<div class="field"><label>Durée de séchage (h)</label><input id="h_hours" type="number" min="0" step="0.1"></div>'+
    '</div>';
  } else {
    box.innerHTML='<div class="form-grid">'+
      '<div class="field"><label>Produit transformé</label><input id="o_product" placeholder="Ex. poudre d\'oignon"></div>'+
      '<div class="field"><label>Coût total de la recette ($)</label><input id="o_cost" type="number" min="0" step="0.01"></div>'+
      '<div class="field"><label>Nombre de portions / contenants</label><input id="o_portions" type="number" min="1" step="1"></div>'+
      '<div class="field"><label>Prix de vente prévu par portion ($)</label><input id="o_price" type="number" min="0" step="0.01"></div>'+
      '<div class="field"><label>Temps de préparation actif (h)</label><input id="o_active" type="number" min="0" step="0.1"></div>'+
      '<div class="field"><label>Temps total du procédé (h)</label><input id="o_total" type="number" min="0" step="0.1"></div>'+
    '</div>';
  }
}

function num(id){
  const el=document.getElementById(id);
  if(!el||el.value==="") return null;
  const v=Number(el.value);
  return Number.isFinite(v)?v:null;
}

function metric(label,value,sub=""){
  return '<div class="metric"><small>'+label+'</small><b>'+value+'</b><small>'+sub+'</small></div>';
}

function calculate(){
  const p=document.getElementById("process").value;
  let metrics="",note="",data={};

  if(p==="apple"){
    const mass=num("a_mass"),juice=num("a_juice"),brix=num("a_brix"),ph=num("a_ph"),clear=num("a_clear");
    if(!(mass>0)||!(juice>=0)) return toast("Entre la masse de pommes et la quantité de jus.");
    const yieldPct=juice/mass*100;
    metrics+=metric("Rendement simplifié",yieldPct.toFixed(1)+" %","jus obtenu ÷ masse initiale × 100");
    metrics+=metric("°Brix",brix==null?"—":brix.toFixed(1),"mesure saisie");
    metrics+=metric("pH",ph==null?"—":ph.toFixed(2),"mesure saisie");
    if(clear!=null) metrics+=metric("Clarté",clear.toFixed(1)+" %","mesure saisie");
    note="Compare les valeurs avec un lot témoin ou un lot traité dans les mêmes conditions.";
    data={mass,juice,brix,ph,clear,pectinase:document.getElementById("a_pect").value,yieldPct};
  } else if(p==="herbs"){
    const herbs=num("h_herbs"),salt=num("h_salt"),after=num("h_after"),hours=num("h_hours");
    if(!(herbs>=0)||!(salt>=0)||!(after>=0)||herbs+salt<=0) return toast("Entre les masses nécessaires au calcul.");
    const before=herbs+salt,loss=before-after,lossPct=loss/before*100;
    metrics+=metric("Poids avant séchage",before.toFixed(1)+" g");
    metrics+=metric("Perte de poids",loss.toFixed(1)+" g");
    metrics+=metric("Perte relative",lossPct.toFixed(1)+" %","(avant − après) ÷ avant × 100");
    note="Le calcul correspond à la logique pédagogique de la fiche de laboratoire.";
    data={herbs,salt,after,hours,before,loss,lossPct};
  } else {
    const cost=num("o_cost"),portions=num("o_portions"),price=num("o_price"),active=num("o_active"),total=num("o_total");
    const product=document.getElementById("o_product").value.trim();
    if(!(cost>=0)||!(portions>0)) return toast("Entre le coût total et le nombre de portions.");
    const unit=cost/portions,margin=price==null?null:price-unit;
    metrics+=metric("Coût de revient",unit.toFixed(2)+" $","par portion");
    metrics+=metric("Rendement",portions.toFixed(0),"portions / contenants");
    metrics+=metric("Marge brute unitaire",margin==null?"—":margin.toFixed(2)+" $","prix − coût de revient");
    note="Le calcul de base ne comprend pas automatiquement la main-d'œuvre.";
    data={product,cost,portions,price,active,total,unit,margin};
  }

  document.getElementById("resultMetrics").innerHTML=metrics;
  document.getElementById("resultNote").textContent=note;
  document.getElementById("result").classList.add("show");

  lastCalculation={
    id:(crypto.randomUUID?crypto.randomUUID():String(Date.now())),
    createdAt:new Date().toISOString(),
    process:p,
    processLabel:labels[p],
    lotName:document.getElementById("lotName").value.trim()||"Lot sans nom",
    date:document.getElementById("date").value||todayISO(),
    variety:document.getElementById("variety").value.trim(),
    data
  };
}

function saveLot(){
  if(!lastCalculation) return toast("Calcule d'abord le lot.");
  const lots=JSON.parse(localStorage.getItem("transfolab_lots")||"[]");
  lots.unshift(lastCalculation);
  localStorage.setItem("transfolab_lots",JSON.stringify(lots));
  toast("Lot enregistré.");
  openView("lots");
}

function renderLots(){
  const lots=JSON.parse(localStorage.getItem("transfolab_lots")||"[]");
  const c=document.getElementById("lotsContainer");
  if(!lots.length){
    c.innerHTML='<div class="card empty"><h3>Aucun lot enregistré</h3><p>Commence une transformation puis enregistre le résultat.</p><button class="btn btn-primary" onclick="openView(\'transform\')">Créer un lot</button></div>';
    return;
  }
  const rows=lots.map(l=>{
    let summary="";
    if(l.process==="apple") summary="Rendement "+(l.data.yieldPct??0).toFixed(1)+" %";
    if(l.process==="herbs") summary="Perte "+(l.data.lossPct??0).toFixed(1)+" %";
    if(l.process==="onion") summary="Coût/portion "+(l.data.unit??0).toFixed(2)+" $";
    return '<tr><td><b>'+escapeHtml(l.lotName)+'</b><br><small>'+escapeHtml(l.variety||"—")+'</small></td><td>'+escapeHtml(l.date)+'</td><td>'+escapeHtml(l.processLabel)+'</td><td>'+summary+'</td><td><button class="btn btn-danger" onclick="deleteLot(\''+l.id+'\')">Supprimer</button></td></tr>';
  }).join("");
  c.innerHTML='<div class="table-wrap"><table><thead><tr><th>Lot</th><th>Date</th><th>Procédé</th><th>Résultat clé</th><th></th></tr></thead><tbody>'+rows+'</tbody></table></div>';
}

function deleteLot(id){
  const lots=JSON.parse(localStorage.getItem("transfolab_lots")||"[]").filter(x=>x.id!==id);
  localStorage.setItem("transfolab_lots",JSON.stringify(lots));
  renderLots();
}

function clearLots(){
  if(!confirm("Effacer tous les lots enregistrés sur cet appareil ?")) return;
  localStorage.removeItem("transfolab_lots");
  renderLots();
}

function exportCSV(){
  const lots=JSON.parse(localStorage.getItem("transfolab_lots")||"[]");
  if(!lots.length) return toast("Aucun lot à exporter.");
  const rows=[["Lot","Date","Procédé","Variété","Données"]];
  lots.forEach(l=>rows.push([l.lotName,l.date,l.processLabel,l.variety||"",JSON.stringify(l.data)]));
  const csv=rows.map(r=>r.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(",")).join("\n");
  const blob=new Blob([csv],{type:"text/csv;charset=utf-8"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="transfolab-lots.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}

function resetForm(){
  document.getElementById("lotName").value="";
  document.getElementById("variety").value="";
  document.getElementById("date").value=todayISO();
  renderProcess();
}

function escapeHtml(v){
  return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}

function toast(msg){
  const t=document.getElementById("toast");
  t.textContent=msg;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),2200);
}

renderProcess();