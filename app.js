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
    id:(window.crypto?.randomUUID ? window.crypto.randomUUID() : String(Date.now())),
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

const courseLessons={
  composition:{
    number:1,
    icon:"🥗",
    title:"Composition des aliments",
    intro:"Le cours commence par la composition d'un aliment. L'objectif est de comprendre de quoi l'aliment est constitué, puis de relier cette composition à la conservation, à la transformation et au contrôle de qualité.",
    points:[
      "Les six familles de nutriments présentées dans le cours sont : eau, glucides, protéines, lipides, minéraux et vitamines.",
      "Le cours distingue aussi les composés secondaires, les contaminants et les additifs.",
      "Une transformation peut modifier les propriétés d'un aliment : il faut donc observer ce qui change avant, pendant et après le procédé."
    ],
    lab:"Dans TransfoLab, les mesures de pH, °Brix, masse, rendement et clarté servent à relier la composition de l'aliment au résultat de la transformation.",
    source:"Notes de cours — Sciences et Qualité des Aliments, Composition des aliments.",
    quiz:[
      {q:"Laquelle de ces réponses correspond à une famille de nutriments présentée dans le cours ?",options:["Eau","Emballage","Étiquette"],answer:0,why:"L'eau fait partie des six familles de nutriments listées dans les notes."},
      {q:"Le cours cherche notamment à comprendre quoi ?",options:["Seulement le prix des aliments","L'impact de la transformation sur les propriétés de l'aliment","Seulement la commercialisation"],answer:1,why:"La cible de formation relie composition, conservation, transformation et contrôle de qualité."},
      {q:"Quel élément fait partie du contrôle d'un procédé dans TransfoLab ?",options:["pH","Couleur du logo","Nom du navigateur"],answer:0,why:"Le pH est un paramètre mesurable lié à la qualité du produit."}
    ]
  },
  water:{
    number:2,
    icon:"💧",
    title:"Eau et conservation",
    intro:"Pour comprendre la conservation, il ne suffit pas de connaître la quantité totale d'eau. Il faut surtout comprendre quelle fraction de cette eau reste disponible.",
    points:[
      "L'eau libre est faiblement retenue et est plus facilement disponible pour les réactions chimiques et microbiennes.",
      "L'eau liée est fortement associée aux macromolécules et est plus difficile à éliminer par un simple séchage.",
      "L'activité de l'eau (aw) décrit la disponibilité de l'eau : une aw plus faible signifie moins d'eau disponible pour les microorganismes.",
      "Le sel capte une partie de l'eau libre et exerce aussi un effet osmotique sur les cellules microbiennes.",
      "Salage et déshydratation peuvent être combinés : ce sont deux obstacles agissant sur la disponibilité de l'eau."
    ],
    lab:"Labo sel aux herbes : peser avant et après séchage permet de calculer la perte de masse attribuée principalement à l'eau évaporée, puis d'interpréter le résultat avec les notions d'eau libre, d'eau liée et d'aw.",
    source:"Rapport de laboratoire — Sel aux herbes.",
    quiz:[
      {q:"Quel indicateur est présenté comme déterminant pour la stabilité microbiologique ?",options:["L'activité de l'eau (aw)","Le poids du contenant","La couleur de l'étiquette"],answer:0,why:"Le document précise que l'aw, et non seulement la teneur totale en eau, détermine la disponibilité de l'eau pour les microorganismes."},
      {q:"Quelle eau s'élimine le plus facilement lors du séchage ?",options:["L'eau libre","L'eau liée","Aucune"],answer:0,why:"L'eau libre est faiblement retenue et s'évapore plus facilement."},
      {q:"Pourquoi combiner salage et déshydratation ?",options:["Pour appliquer deux freins à la disponibilité de l'eau","Pour augmenter l'aw","Pour ajouter seulement du goût"],answer:0,why:"Le labo présente cette combinaison comme un exemple d'obstacles combinés."}
    ]
  },
  starch:{
    number:3,
    icon:"🍎",
    title:"Amidon et maturité de la pomme",
    intro:"Le test à l'iode permet de visualiser l'amidon encore présent dans la pomme et d'interpréter l'évolution de la maturité.",
    points:[
      "L'iode forme un complexe très coloré lorsqu'il entre en contact avec l'amidon.",
      "Quand l'amidon est brisé en sucres solubles, cette fixation de l'iode n'est plus possible.",
      "Pendant la maturation, l'amidon se transforme progressivement en sucres solubles : la coloration foncée diminue.",
      "La régression de l'amidon n'est pas identique pour toutes les variétés de pommes."
    ],
    lab:"Si une zone de chair devient moins foncée au test à l'iode, cela indique qu'une partie de l'amidon a déjà été transformée en sucres solubles. L'interprétation doit ensuite être comparée à une charte de maturité adaptée.",
    source:"CRAAQ — Évaluer la maturité des pommes : test de l'amidon.",
    quiz:[
      {q:"Une coloration foncée importante après ajout d'iode indique généralement…",options:["Beaucoup d'amidon","Aucun amidon","Beaucoup de sel"],answer:0,why:"Plus la chair contient d'amidon, plus elle prend une coloration foncée avec l'iode."},
      {q:"Pendant la maturation, l'amidon devient principalement…",options:["Des sucres solubles","Des protéines","Du sel"],answer:0,why:"Le document explique que l'amidon est progressivement transformé en sucres solubles."},
      {q:"Tous les cultivars présentent-ils exactement le même patron de régression ?",options:["Oui","Non"],answer:1,why:"Le CRAAQ précise que les patrons de coloration varient selon les variétés."}
    ]
  },
  pectin:{
    number:4,
    icon:"🧪",
    title:"Pectine et pectinase",
    intro:"La pectine participe à la structure de la pomme. Pendant le pressage, elle peut retenir une partie du jus et contribuer à la viscosité du moût.",
    points:[
      "La pectine est un polysaccharide structural présent dans les parois et la lamelle mitoyenne des cellules végétales.",
      "Dans le moût de pomme, elle peut retenir de l'eau et du jus et limiter l'efficacité du pressage.",
      "La pectinase dégrade les chaînes pectiques en fragments plus courts et plus solubles.",
      "Cette dégradation peut réduire la viscosité, libérer davantage de jus et faciliter la clarification.",
      "Le labo compare un témoin et un traitement à la pectinase avec le rendement d'extraction, le °Brix, le pH et la clarté."
    ],
    lab:"Dans le module Jus de pomme, saisis les valeurs du témoin puis celles du lot traité. L'intérêt du labo vient de la comparaison des résultats, pas d'une valeur isolée. Pour la dose, la température et le temps exacts d'une pectinase commerciale, il faut suivre la fiche technique du produit utilisé.",
    source:"Rapport de laboratoire — Jus de pomme et pectinase.",
    quiz:[
      {q:"Pourquoi la pectine peut-elle réduire le rendement d'extraction ?",options:["Elle peut retenir du jus dans la matrice cellulaire","Elle transforme le jus en sel","Elle augmente automatiquement le °Brix"],answer:0,why:"Le labo décrit la pectine comme un élément qui retient une partie du jus et augmente la viscosité."},
      {q:"Que fait la pectinase ?",options:["Elle dégrade les chaînes pectiques","Elle ajoute de l'amidon","Elle mesure le pH"],answer:0,why:"La pectinase regroupe des activités enzymatiques qui dégradent la chaîne pectique."},
      {q:"Quelles mesures sont comparées entre témoin et traitement ?",options:["Rendement, °Brix, pH et clarté","Seulement la masse du contenant","Seulement le prix"],answer:0,why:"Ce sont les quatre critères explicitement demandés dans les objectifs du laboratoire."}
    ]
  },
  onion:{
    number:5,
    icon:"🧅",
    title:"Du procédé au produit fini",
    intro:"Une transformation alimentaire ne s'arrête pas à la recette : il faut aussi décrire les étapes, mesurer le rendement et relier les résultats au coût de revient.",
    points:[
      "La fiche oignon demande d'identifier le produit, la recette, les ingrédients, les quantités, la provenance et le rendement obtenu.",
      "Le temps est séparé entre préparation active, transformation, repos ou séchage et temps total.",
      "Le coût de revient par portion se calcule en divisant le coût total de la recette par le nombre de portions produites.",
      "Le calcul de base ne comprend pas automatiquement le coût de la main-d'œuvre.",
      "La réflexion finale porte aussi sur la conservation, la mise en marché, la réglementation et le volume d'oignons requis."
    ],
    lab:"Le module Transformation d'oignons de TransfoLab reprend le calcul coût total ÷ portions. Utilise-le après avoir noté les étapes et le rendement réel de ton produit.",
    source:"Fiche de transformation — Projet Transformation des oignons.",
    quiz:[
      {q:"Formule du coût de revient par portion ?",options:["Coût total ÷ nombre de portions","Nombre de portions ÷ coût total","Prix de vente × temps"],answer:0,why:"C'est la formule donnée dans la fiche de transformation."},
      {q:"Le calcul de base inclut-il automatiquement la main-d'œuvre ?",options:["Oui","Non"],answer:1,why:"La fiche précise que la main-d'œuvre n'est pas incluse dans le calcul de base."},
      {q:"Le rendement de la recette peut être exprimé par…",options:["Le nombre de portions ou contenants obtenus","La couleur du produit uniquement","Le nom de l'étudiant"],answer:0,why:"La fiche demande explicitement le nombre de portions ou de contenants produits."}
    ]
  }
};

function getCourseProgress(){
  try{return JSON.parse(localStorage.getItem("transfolab_course_progress")||"{}")}catch(e){return {}}
}

function setCourseProgress(progress){
  localStorage.setItem("transfolab_course_progress",JSON.stringify(progress));
  updateCourseProgress();
}

function updateCourseProgress(){
  const progress=getCourseProgress();
  const total=Object.keys(courseLessons).length;
  const done=Object.keys(courseLessons).filter(k=>progress[k]===true).length;
  const text=document.getElementById("courseProgressText");
  const bar=document.getElementById("courseProgressBar");
  if(text) text.textContent=done+" / "+total+" leçons";
  if(bar) bar.style.width=(done/total*100)+"%";
  document.querySelectorAll(".lesson-tab").forEach(btn=>{
    const id=btn.dataset.lesson;
    const old=btn.querySelector(".lesson-complete");
    if(old) old.remove();
    if(progress[id]===true){
      const badge=document.createElement("span");
      badge.className="lesson-complete";
      badge.textContent="✓";
      btn.appendChild(badge);
    }
  });
}

function openLesson(id){
  const lesson=courseLessons[id]||courseLessons.composition;
  document.querySelectorAll(".lesson-tab").forEach(b=>b.classList.toggle("active",b.dataset.lesson===id));
  const progress=getCourseProgress();
  const completed=progress[id]===true?'<span class="lesson-complete">✓ Réussie</span>':'';
  const points=lesson.points.map(x=>"<li>"+x+"</li>").join("");
  const quiz=lesson.quiz.map((q,i)=>{
    const opts=q.options.map((o,j)=>'<label class="choice"><input type="radio" name="quiz_'+id+'_'+i+'" value="'+j+'"><span>'+o+'</span></label>').join("");
    return '<div class="quiz-question"><p>'+(i+1)+'. '+q.q+'</p>'+opts+'</div>';
  }).join("");
  document.getElementById("lessonPanel").innerHTML=
    '<div class="lesson-kicker">Leçon '+lesson.number+' sur 5</div>'+
    '<h2>'+lesson.icon+' '+lesson.title+completed+'</h2>'+
    '<p class="lesson-intro">'+lesson.intro+'</p>'+
    '<div class="lesson-block"><h3>À retenir</h3><ul>'+points+'</ul></div>'+
    '<div class="lesson-block lab-link"><h3>🔬 Lien avec ton laboratoire</h3><p>'+lesson.lab+'</p></div>'+
    '<div class="quiz"><h3>Mini-quiz</h3><p>Réponds aux 3 questions pour vérifier ta compréhension.</p>'+quiz+
      '<button class="btn btn-course" onclick="checkLessonQuiz(\''+id+'\')">Vérifier mes réponses</button>'+
      '<div id="quizFeedback" class="quiz-feedback" style="display:none"></div>'+
    '</div>'+
    '<div class="source-note">Source utilisée : '+lesson.source+'</div>';
  updateCourseProgress();
  window.scrollTo({top:0,behavior:"smooth"});
}

function checkLessonQuiz(id){
  const lesson=courseLessons[id];
  let score=0;
  let feedback=[];
  lesson.quiz.forEach((q,i)=>{
    const selected=document.querySelector('input[name="quiz_'+id+'_'+i+'"]:checked');
    const value=selected?Number(selected.value):-1;
    if(value===q.answer) score++;
    else feedback.push("Question "+(i+1)+" : "+q.why);
  });
  const box=document.getElementById("quizFeedback");
  box.style.display="block";
  if(score===lesson.quiz.length){
    box.className="quiz-feedback success";
    box.innerHTML="<b>3 / 3 — Bravo.</b> Tu as réussi cette leçon.";
    const progress=getCourseProgress();
    progress[id]=true;
    setCourseProgress(progress);
  }else{
    box.className="quiz-feedback retry";
    box.innerHTML="<b>"+score+" / "+lesson.quiz.length+"</b><br>"+feedback.join("<br>");
  }
}

function resetCourseProgress(){
  if(!confirm("Réinitialiser la progression du Mode cours ?")) return;
  localStorage.removeItem("transfolab_course_progress");
  updateCourseProgress();
  openLesson("composition");
  toast("Progression réinitialisée.");
}


openLesson("composition");
updateCourseProgress();
