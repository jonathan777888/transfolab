'use strict';

const STORAGE_KEY='transfolab-second-cerveau-v1';
const questionKeys=[
  ['what','WHAT — C’est quoi ?'],
  ['who','WHO — Qui est concerné ?'],
  ['where','WHERE — Où cela s’applique ?'],
  ['when','WHEN — Quand cela intervient ?'],
  ['why','WHY — Pourquoi c’est important ?'],
  ['how','HOW — Comment cela fonctionne ?'],
  ['whatIf','WHAT IF — Que se passe-t-il si… ?']
];

const topics=[
  {
    id:'transformation',icon:'⚙️',short:'Fil conducteur',title:'De la composition au contrôle qualité',
    intro:'Comprendre le sens général de la transformation alimentaire et la logique qui relie composition, procédé, mesures, interprétation et décision.',
    summary:'La transformation alimentaire consiste à modifier un aliment brut par un procédé afin de le rendre plus digestible, plus stable, plus sécuritaire, plus pratique ou de créer un nouveau produit.',
    source:'Guide Second Cerveau, pages 3 et 4 — fil conducteur de la transformation alimentaire.',
    answers:{
      what:'La transformation alimentaire consiste à modifier un aliment brut par un procédé afin de le rendre plus digestible, plus stable, plus sécuritaire, plus pratique ou de créer un nouveau produit.',
      who:'Le producteur, les employés de transformation, les responsables qualité et les consommateurs sont concernés.',
      where:'À la ferme, dans une cuisine de transformation, un laboratoire, une usine ou tout lieu où l’aliment passe du produit brut au produit fini.',
      when:'Dès qu’un aliment est lavé, coupé, chauffé, fermenté, salé, séché, pressé, mélangé, conservé ou conditionné.',
      why:'Parce qu’un procédé change les propriétés de l’aliment. Il faut comprendre ce qui change, vérifier la sécurité et la qualité, mesurer le rendement et décider si le produit est viable.',
      how:'On part de la composition de l’aliment, on choisit un procédé, on contrôle les paramètres importants, on mesure le résultat puis on interprète les données.',
      whatIf:'Si on suit seulement une recette sans mesurer ni contrôler, on ne peut pas prouver que le produit est constant, sécuritaire ou rentable.'
    },
    feynman:'Transformer un aliment, c’est prendre un aliment de départ, lui faire subir une série d’étapes et vérifier avec des mesures que le résultat obtenu est celui qu’on voulait.',
    example:'Pomme → broyage → pectinase ou témoin → pressage → °Brix, pH, clarté, rendement → décision sur l’intérêt du procédé. Analogie : comme en production végétale, on ne fait pas seulement une opération; on observe, on mesure et on ajuste.',
    practice:{q:'Pour un jus de pomme, remets dans l’ordre les étapes suivantes et explique ce qui doit être mesuré : décision, pressage, broyage, mesure du pH/°Brix/clarté/rendement, traitement témoin ou pectinase.',a:'Ordre : broyage → traitement témoin ou pectinase → pressage → mesures du pH, du °Brix, de la clarté et du rendement → interprétation et décision. Les mesures servent à vérifier si le procédé produit un résultat constant et utile.'},
    quiz:[
      {q:'Quel est le fil conducteur d’une transformation bien contrôlée ?',o:['Recette → vente','Composition → procédé → mesure → interprétation → décision','Prix → publicité'],a:1,w:'Le guide relie composition, procédé, contrôle, mesure, interprétation et décision.'},
      {q:'Pourquoi ne suffit-il pas de suivre une recette ?',o:['Parce que la recette est toujours fausse','Parce qu’il faut aussi mesurer et contrôler pour prouver la constance, la sécurité et la rentabilité','Parce qu’il faut seulement goûter'],a:1,w:'Le guide précise qu’une recette sans mesure ni contrôle ne permet pas de prouver le résultat.'},
      {q:'Lequel est un procédé de transformation ?',o:['Séchage','Choisir une couleur de logo','Écrire une publicité'],a:0,w:'Le séchage modifie l’aliment et sa disponibilité en eau.'}
    ]
  },
  {
    id:'nutriments',icon:'🥗',short:'Composition',title:'Les nutriments et la composition des aliments',
    intro:'Identifier les six familles du cours et comprendre pourquoi la composition influence le comportement de l’aliment pendant la transformation.',
    summary:'Les six familles de nutriments présentées dans le cours sont l’eau, les glucides, les protéines, les lipides, les minéraux et les vitamines.',
    source:'Guide Second Cerveau, pages 4 et 5 — composition des aliments.',
    answers:{
      what:'La composition d’un aliment regroupe notamment six familles de nutriments : eau, glucides, protéines, lipides, minéraux et vitamines.',
      who:'Les producteurs, les transformateurs, les responsables qualité et les consommateurs sont concernés par les changements de composition et de qualité.',
      where:'Dans tous les aliments et dans les procédés où l’eau, la chaleur, le sel, les enzymes, le séchage ou d’autres traitements modifient leurs propriétés.',
      when:'Avant, pendant et après la transformation, lorsqu’on veut prévoir ou vérifier les changements de texture, de stabilité, de qualité ou de valeur nutritive.',
      why:'Parce que la composition détermine comment l’aliment réagit à la chaleur, à l’eau, au sel, aux enzymes, au séchage et aux autres procédés.',
      how:'On identifie les constituants importants, on choisit les mesures adaptées et on observe comment le procédé modifie leurs propriétés.',
      whatIf:'Si on ne tient pas compte de la composition, on peut mal prévoir la texture, la stabilité, la conservation ou la valeur nutritive du produit.'
    },
    feynman:'Un aliment est un mélange de plusieurs familles de nutriments. Ces familles ne réagissent pas toutes de la même manière; il faut donc connaître la composition pour choisir et contrôler la transformation.',
    example:'L’eau influence la conservation; les glucides peuvent participer à la gélification ou au brunissement; les protéines peuvent mousser ou gélifier; les lipides peuvent rancir; certaines vitamines sont sensibles à la chaleur et à la lumière.',
    practice:{q:'Associe chaque exemple à une famille : albumine, amidon, huile, calcium, vitamine C, eau libre.',a:'Albumine → protéines. Amidon → glucides. Huile → lipides. Calcium → minéraux. Vitamine C → vitamines. Eau libre → eau.'},
    quiz:[
      {q:'Combien de grandes familles de nutriments sont présentées dans le cours ?',o:['4','6','9'],a:1,w:'Le cours présente eau, glucides, protéines, lipides, minéraux et vitamines.'},
      {q:'Pourquoi la composition est-elle importante ?',o:['Elle détermine comment l’aliment réagit aux procédés','Elle sert seulement à choisir le nom du produit','Elle remplace les mesures'],a:0,w:'La composition aide à prévoir les changements de texture, stabilité, qualité et valeur nutritive.'},
      {q:'La lécithine est reliée à quelle famille ?',o:['Lipides','Minéraux','Vitamines'],a:0,w:'La lécithine est un phospholipide.'}
    ]
  },
  {
    id:'water',icon:'💧',short:'Conservation',title:'L’eau libre, l’eau liée et l’activité de l’eau',
    intro:'Distinguer la quantité totale d’eau de l’eau réellement disponible pour les réactions et les microorganismes.',
    summary:'L’eau libre est plus disponible. L’eau liée est fortement associée aux macromolécules. L’activité de l’eau (aw) représente la disponibilité de l’eau pour les microorganismes.',
    source:'Guide Second Cerveau, pages 5 et 6 — eau et conservation.',
    answers:{
      what:'L’eau libre est faiblement retenue et disponible pour les réactions et les microorganismes. L’eau liée est fortement associée aux macromolécules et moins disponible. L’aw représente la disponibilité de l’eau.',
      who:'Les microorganismes, les cellules végétales et toute personne qui cherche à conserver un aliment sont concernés.',
      where:'Dans les aliments frais, séchés, salés et pendant l’entreposage.',
      when:'Lorsqu’on cherche à prévoir la stabilité microbiologique ou à utiliser le séchage et le sel comme moyens de conservation.',
      why:'Parce que la quantité totale d’eau ne dit pas à elle seule combien d’eau est réellement utilisable par les microorganismes.',
      how:'Le séchage élimine surtout l’eau libre. Le sel capte une partie de l’eau libre et crée un effet osmotique qui fait sortir de l’eau des cellules microbiennes. Une aw plus faible signifie moins d’eau disponible.',
      whatIf:'Si un produit reste trop humide ou conserve trop d’eau disponible, les moisissures et d’autres microorganismes peuvent se développer plus facilement.'
    },
    feynman:'Un aliment peut encore contenir de l’eau, mais si cette eau est fortement liée ou peu disponible, les microbes ont plus de difficulté à l’utiliser.',
    example:'Sel aux herbes : 67 g d’herbes + 53 g de sel = 120 g avant séchage; 66 g après; perte de 54 g, soit 45 % selon la formule du laboratoire. Analogie : l’eau libre ressemble à de l’argent disponible, l’eau liée à de l’argent bloqué.',
    practice:{q:'Explique pourquoi deux aliments contenant la même quantité totale d’eau peuvent ne pas avoir la même stabilité microbiologique.',a:'La quantité totale ne précise pas quelle fraction est disponible. Un aliment peut avoir davantage d’eau liée et une aw plus faible; les microorganismes y trouvent alors moins d’eau utilisable.'},
    quiz:[
      {q:'Quelle eau est principalement retirée par le séchage ?',o:['L’eau libre','Seulement l’eau liée','Aucune eau'],a:0,w:'Le laboratoire indique que le séchage retire surtout l’eau libre.'},
      {q:'Que représente l’aw ?',o:['Le poids total de l’aliment','La disponibilité de l’eau','La quantité de sel seulement'],a:1,w:'L’aw sert à raisonner sur l’eau réellement disponible.'},
      {q:'Comment le sel freine-t-il les microbes ?',o:['Il ajoute de l’eau','Il réduit l’eau disponible et exerce un effet osmotique','Il augmente toujours le pH'],a:1,w:'Le sel attire l’eau et rend la multiplication microbienne plus difficile.'}
    ]
  },
  {
    id:'proteins',icon:'🥚',short:'Protéines',title:'Les protéines et leurs propriétés fonctionnelles',
    intro:'Comprendre que la structure d’une chaîne d’acides aminés influence les fonctions biologiques et les propriétés de texture.',
    summary:'Les protéines sont des chaînes d’acides aminés. Leur structure influence leurs propriétés fonctionnelles et leur relation avec l’eau.',
    source:'Guide Second Cerveau, pages 6 et 7 — protéines.',
    answers:{
      what:'Les protéines sont des chaînes d’acides aminés. Leur structure influence leurs propriétés fonctionnelles et leur relation avec l’eau.',
      who:'Tous les êtres vivants et les aliments contenant des protéines sont concernés. Le cours indique 20 acides aminés de base et 9 acides aminés essentiels à fournir par l’alimentation.',
      where:'Dans les cellules et dans les aliments comme la viande, le poisson, le lait, les œufs, le fromage ou les végétaux.',
      when:'Pendant la cuisson, le mélange, le foisonnement, la gélification et d’autres procédés où leur structure influence la texture.',
      why:'Parce qu’elles participent à de nombreuses fonctions biologiques et déterminent aussi des propriétés de texture importantes en transformation.',
      how:'Certaines protéines peuvent former un gel et emprisonner beaucoup d’eau; d’autres stabilisent une mousse. Le cours cite la gélatine et l’albumine.',
      whatIf:'Si un procédé modifie fortement la structure d’une protéine, ses propriétés fonctionnelles ou la disponibilité de certains acides aminés peuvent changer.'
    },
    feynman:'Une protéine est une longue chaîne d’acides aminés pliée d’une certaine façon. Sa forme influence ce qu’elle peut faire dans l’aliment.',
    example:'Le gluten donne une texture viscoélastique à la pâte; l’albumine du blanc d’œuf permet de créer et stabiliser une mousse; la gélatine forme un gel.',
    practice:{q:'Explique pourquoi l’albumine et la gélatine, qui sont toutes deux des protéines, n’ont pas exactement la même fonction en transformation.',a:'La structure de chaque protéine influence sa propriété fonctionnelle. L’albumine est utilisée comme exemple de pouvoir moussant, tandis que la gélatine est utilisée comme exemple de pouvoir gélifiant.'},
    quiz:[
      {q:'De quoi les protéines sont-elles constituées ?',o:['Acides aminés','Minéraux seulement','Acides gras'],a:0,w:'Les protéines sont des chaînes d’acides aminés.'},
      {q:'Quel exemple illustre le pouvoir moussant ?',o:['Albumine','Pectine','Calcium'],a:0,w:'Le cours cite l’albumine du blanc d’œuf.'},
      {q:'Pourquoi la structure est-elle importante ?',o:['Elle influence les propriétés fonctionnelles','Elle détermine seulement la couleur','Elle n’a aucun effet'],a:0,w:'La structure influence notamment hydrophilie, hydrophobie, gélification et mousse.'}
    ]
  },
  {
    id:'carbs',icon:'🍎',short:'Glucides',title:'Glucides, amidon, cellulose et pectine',
    intro:'Classer les glucides et relier l’amidon à la maturation, la cellulose au soutien végétal et la pectine à la structure et à la gélification.',
    summary:'Monosaccharides : glucose, fructose, galactose. Disaccharides : saccharose, lactose. Polysaccharides : amidon, cellulose, hémicellulose et pectine.',
    source:'Guide Second Cerveau, pages 7 à 9 — glucides, amidon, cellulose et pectine.',
    answers:{
      what:'Les glucides comprennent des sucres simples, des disaccharides et des polysaccharides. L’amidon est une réserve, la cellulose un soutien et la pectine un polysaccharide des parois cellulaires pouvant former un gel.',
      who:'Les plantes produisent et utilisent ces glucides; les producteurs et transformateurs les observent pour la maturité, la texture, la gélification et le rendement.',
      where:'Dans les fruits, les racines, les grains et les parois des cellules végétales.',
      when:'Pendant la maturation, l’hydrolyse, la cuisson, la gélification, le pressage ou l’évaluation d’un fruit.',
      why:'Parce que les différents glucides n’ont pas les mêmes rôles ni les mêmes propriétés de solubilité, de soutien, de réserve ou de gélification.',
      how:'L’amidon peut être hydrolysé en sucres simples; la cellulose possède des liaisons beta plus difficiles à rompre; la pectine peut cimenter les cellules, retenir le jus et former un gel.',
      whatIf:'Si on confond amidon, cellulose et pectine, on peut mal expliquer la maturité, la texture, l’extraction du jus ou la gélification.'
    },
    feynman:'Les glucides ne sont pas seulement du sucre. Certains servent de réserve, d’autres renforcent la plante et d’autres aident à tenir les cellules ensemble ou à former un gel.',
    example:'Pendant la maturation de la pomme, l’amidon diminue et devient des sucres solubles. Dans le jus, la pectine peut retenir une partie du liquide et contribuer au trouble.',
    practice:{q:'Compare l’amidon, la cellulose et la pectine en donnant pour chacun un rôle ou une propriété et un exemple lié au cours.',a:'Amidon : polysaccharide de réserve, testé à l’iode dans la pomme. Cellulose : polysaccharide de soutien, insoluble et avec des liaisons beta plus difficiles à rompre. Pectine : polysaccharide des parois cellulaires, très soluble, pouvant former un gel et retenir du jus.'},
    quiz:[
      {q:'Quel glucide est une réserve des plantes ?',o:['Amidon','Cellulose','Lécithine'],a:0,w:'L’amidon est un polysaccharide de réserve.'},
      {q:'Quel composé peut former un gel dans les confitures ?',o:['Pectine','Fer','Albumine uniquement'],a:0,w:'La pectine possède un pouvoir gélifiant en présence des conditions adaptées.'},
      {q:'Quelle structure est surtout liée au soutien végétal ?',o:['Cellulose','Saccharose','Lactose'],a:0,w:'La cellulose fait partie des tissus de soutien.'}
    ]
  },
  {
    id:'reactions',icon:'🔥',short:'Réactions',title:'Maillard, hydrolyse et caramélisation',
    intro:'Distinguer trois mécanismes qui sont souvent confondus et reconnaître leurs conditions et leurs résultats.',
    summary:'Maillard = certains sucres + acides aminés/protéines. Caramélisation = sucre chauffé à haute température en absence d’eau. Hydrolyse = coupure d’une molécule complexe en unités plus simples.',
    source:'Guide Second Cerveau, page 10 — réaction de Maillard, hydrolyse et caramélisation.',
    answers:{
      what:'La réaction de Maillard, la caramélisation et l’hydrolyse sont trois réactions différentes. Maillard associe certains sucres et acides aminés; la caramélisation concerne le sucre chauffé; l’hydrolyse coupe des glucides complexes.',
      who:'Les personnes qui cuisent, transforment ou contrôlent la qualité des aliments sont concernées.',
      where:'Dans les aliments chauffés ou dans les procédés utilisant des enzymes ou un acide pour modifier des glucides.',
      when:'Maillard est favorisée par la chaleur; le cours indique environ 120–140 °C. La caramélisation débute vers 160–180 °C en absence d’eau. L’hydrolyse intervient avec des enzymes ou un acide.',
      why:'Parce que ces réactions changent la couleur, les arômes, la fluidité, le pouvoir sucrant ou la valeur nutritive.',
      how:'Maillard produit un brunissement et des arômes; la caramélisation transforme les sucres chauffés; l’hydrolyse rompt des liaisons et produit des unités plus simples.',
      whatIf:'Si on les confond, on explique mal le brunissement ou la transformation des glucides et on peut choisir de mauvaises conditions de procédé.'
    },
    feynman:'Maillard mélange sucre et protéines sous l’effet de la chaleur. La caramélisation chauffe le sucre seul. L’hydrolyse coupe une grosse molécule en morceaux plus simples.',
    example:'Croûte de pain ou café rôti : Maillard. Caramel : caramélisation. Amidon coupé en sucres par une enzyme : hydrolyse.',
    practice:{q:'Un produit brunit pendant une cuisson. Donne les questions à poser pour distinguer Maillard de la caramélisation.',a:'Vérifier ce qui réagit : présence de sucres et d’acides aminés/protéines pour Maillard, ou surtout sucre chauffé pour caramélisation. Vérifier aussi les conditions : Maillard vers 120–140 °C selon le cours; caramélisation vers 160–180 °C et en absence d’eau.'},
    quiz:[
      {q:'Maillard implique quoi ?',o:['Sucre + acides aminés/protéines','Seulement de l’eau','Seulement du sel'],a:0,w:'Le guide distingue clairement Maillard du sucre chauffé seul.'},
      {q:'L’hydrolyse fait quoi ?',o:['Forme toujours une mousse','Coupe une molécule complexe en unités plus simples','Ajoute un minéral'],a:1,w:'L’hydrolyse est l’inverse de la synthèse.'},
      {q:'La caramélisation concerne principalement quoi ?',o:['Le sucre chauffé','Le calcium','La cellulose froide'],a:0,w:'Le guide présente la caramélisation des mono- ou disaccharides chauffés.'}
    ]
  },
  {
    id:'lipids',icon:'🫒',short:'Lipides',title:'Les lipides, la rancidité et la lécithine',
    intro:'Relier saturation, insaturation, oxydation et émulsification aux propriétés des graisses et des huiles.',
    summary:'Les lipides sont insolubles dans l’eau. Les graisses sont solides à température ordinaire et les huiles sont liquides. Plus un lipide est insaturé, plus il peut être sensible à l’oxydation.',
    source:'Guide Second Cerveau, pages 10 à 12 — lipides et lécithine.',
    answers:{
      what:'Les triglycérides sont constitués de glycérol lié à trois acides gras. Les acides gras saturés ont des liaisons carbone simples; les insaturés ont une ou plusieurs doubles liaisons. La lécithine est un phospholipide émulsifiant.',
      who:'Les aliments contenant des graisses et huiles, les transformateurs et les consommateurs sont concernés.',
      where:'Dans les huiles, les graisses, les membranes cellulaires et les émulsions contenant une phase aqueuse et une phase grasse.',
      when:'Pendant la conservation, la cuisson, l’exposition à l’air, à la lumière ou à la chaleur, et lorsqu’on veut stabiliser une émulsion.',
      why:'Parce que le degré d’insaturation influence le point de fusion, la stabilité et la conservation; la lécithine aide l’eau et le gras à rester dispersés.',
      how:'Les doubles liaisons rendent les lipides plus sensibles à certaines réactions d’oxydation. La lécithine possède une tête hydrophile et deux queues hydrophobes qui s’orientent entre l’eau et l’huile.',
      whatIf:'Une huile très insaturée mal protégée peut rancir. Sans émulsifiant, certaines préparations contenant beaucoup d’eau et de gras peuvent se séparer.'
    },
    feynman:'Une huile peut s’oxyder plus facilement selon sa structure. La lécithine a une partie qui aime l’eau et une autre qui aime le gras; elle fait le lien entre les deux.',
    example:'Le cours cite la lécithine des œufs comme agent émulsifiant. Analogie : une personne bilingue qui aide deux groupes différents à communiquer.',
    practice:{q:'Explique pourquoi une huile très insaturée et une émulsion eau-huile posent deux problèmes différents en transformation.',a:'L’huile très insaturée pose surtout un problème de stabilité à l’oxydation et de rancidité. L’émulsion eau-huile pose un problème de séparation des phases; un émulsifiant comme la lécithine aide à les maintenir dispersées.'},
    quiz:[
      {q:'Un acide gras insaturé possède quoi ?',o:['Au moins une double liaison carbone','Seulement des minéraux','Aucune chaîne carbonée'],a:0,w:'L’insaturation vient d’une ou plusieurs doubles liaisons.'},
      {q:'Qu’est-ce que la rancidité oxydative ?',o:['Une mousse stable','La formation de composés indésirables par oxydation des graisses','Une hydrolyse de l’amidon'],a:1,w:'Le guide relie l’oxydation à des composés amers et à la rancidité.'},
      {q:'À quoi sert la lécithine ?',o:['À stabiliser une émulsion','À mesurer le pH','À remplacer l’eau'],a:0,w:'Sa partie hydrophile et ses parties hydrophobes lui permettent d’agir à l’interface.'}
    ]
  },
  {
    id:'micronutrients',icon:'🌞',short:'Micronutriments',title:'Les minéraux et les vitamines',
    intro:'Comprendre leur place en nutrition et les effets possibles de la transformation sur certaines réactions et sur la stabilité des vitamines.',
    summary:'Les minéraux sont des nutriments inorganiques requis en petites quantités. Les vitamines sont des substances organiques essentielles souvent sensibles à la lumière, à la chaleur ou à l’oxydation.',
    source:'Guide Second Cerveau, page 12 — minéraux et vitamines.',
    answers:{
      what:'Les minéraux sont des nutriments inorganiques généralement requis en petites quantités. Les vitamines sont des substances organiques essentielles, nécessaires en petites quantités.',
      who:'Les organismes vivants, les consommateurs et les personnes qui transforment les aliments sont concernés.',
      where:'Dans les aliments et dans les procédés où chaleur, lumière, oxydation ou interactions minérales influencent la qualité.',
      when:'Pendant la transformation, la conservation, l’enrichissement ou lorsqu’on veut protéger la valeur nutritive.',
      why:'Parce que certains minéraux influencent des réactions ou des textures et que certaines vitamines peuvent être perdues pendant la transformation.',
      how:'Le fer peut catalyser l’oxydation des graisses; le calcium participe à la coagulation du lait et à la texture. Certaines vitamines sont sensibles aux agents physiques.',
      whatIf:'Un traitement trop intense ou une mauvaise protection peut réduire la teneur en certaines vitamines; un excès de certains minéraux peut être nocif.'
    },
    feynman:'Les minéraux et vitamines sont nécessaires en petites quantités, mais ils peuvent influencer la transformation ou être modifiés par elle.',
    example:'Fer : catalyse de l’oxydation des graisses. Calcium : coagulation du lait. Vitamine C : antioxydant. Vitamines A, D, E et K : liposolubles.',
    practice:{q:'Donne deux exemples montrant que les minéraux et les vitamines ne sont pas seulement des éléments nutritionnels passifs.',a:'Le fer peut accélérer l’oxydation des graisses et le calcium peut influencer la coagulation du lait et la texture du yogourt. Des vitamines peuvent aussi être détruites ou réduites par la chaleur, la lumière ou l’oxydation.'},
    quiz:[
      {q:'Les minéraux sont principalement décrits comme quoi ?',o:['Nutriments inorganiques','Glucides simples','Enzymes'],a:0,w:'Le cours les décrit comme des nutriments inorganiques requis en petites quantités.'},
      {q:'Quel minéral peut catalyser l’oxydation des graisses ?',o:['Fer','Calcium seulement','Choline'],a:0,w:'Le guide cite le fer.'},
      {q:'Quelles vitamines sont liposolubles selon le cours ?',o:['A, D, E et K','C et tout le complexe B','Seulement C'],a:0,w:'Le classement du cours donne A, D, E et K.'}
    ]
  },
  {
    id:'starch-lab',icon:'🧪',short:'Labo amidon',title:'Maturité des pommes par le test à l’iode',
    intro:'Comprendre le principe chimique, suivre le protocole et reconnaître les limites des données réellement disponibles.',
    summary:'L’iode forme une coloration bleu-noir avec l’amidon résiduel. Comme l’amidon diminue pendant la maturation, la coloration diminue aussi.',
    source:'Guide Second Cerveau, pages 8 et 13 — test de l’amidon. Les cotes des trois variétés ne sont pas remplies dans le document source.',
    answers:{
      what:'Le test à l’iode est une méthode permettant d’estimer la maturité d’une pomme à partir de l’amidon résiduel dans la chair.',
      who:'Les producteurs de pommes et les responsables de récolte, d’entreposage et de transformation sont concernés.',
      where:'Sur une coupe transversale de la pomme, avec une solution d’iode et une charte adaptée au cultivar.',
      when:'Avant la récolte ou pendant l’entreposage, pour estimer le stade de maturité.',
      why:'Parce que la maturité influence le goût, les sucres, la conservation et la qualité du produit fini.',
      how:'Couper la pomme, appliquer l’iode, attendre la coloration, comparer le patron avec la charte propre à la variété, attribuer une cote et calculer une moyenne.',
      whatIf:'Si on utilise la même interprétation pour tous les cultivars, on peut tirer une mauvaise conclusion. Les résultats réels des trois variétés ne peuvent pas être comparés ici, car les cotes ne sont pas remplies.'
    },
    feynman:'Plus la pomme mûrit, moins il reste d’amidon. Donc l’iode colore moins la chair.',
    example:'Une pomme très colorée en bleu-noir contient encore beaucoup d’amidon. Une pomme moins colorée en contient moins. Chaque variété doit être comparée à sa propre charte.',
    practice:{q:'Un élève affirme que les trois variétés du laboratoire avaient la même maturité. Peux-tu accepter cette conclusion avec les documents disponibles ? Justifie.',a:'Non. Les cotes des fruits et les moyennes des trois variétés ne sont pas remplies. Il faut disposer de ces résultats et utiliser la charte propre à chaque cultivar avant de comparer.'},
    quiz:[
      {q:'Pourquoi la coloration diminue-t-elle quand la pomme mûrit ?',o:['L’amidon diminue et devient des sucres simples','L’iode disparaît toujours','La cellulose augmente'],a:0,w:'Moins d’amidon résiduel signifie moins de complexe bleu-noir.'},
      {q:'Peut-on comparer toutes les variétés avec une seule charte ?',o:['Oui, toujours','Non, chaque cultivar a son patron','Seulement si la pomme est rouge'],a:1,w:'Le document insiste sur la charte propre à la variété.'},
      {q:'Les résultats réels des trois variétés sont-ils disponibles ?',o:['Oui, tous remplis','Non, ils ne sont pas remplis dans le document fourni','Ils sont remplacés par le pH'],a:1,w:'Le guide signale explicitement cette donnée manquante.'}
    ]
  },
  {
    id:'pectinase-lab',icon:'🍏',short:'Labo pectinase',title:'Jus de pomme et pectinase',
    intro:'Interpréter les rendements, la clarté, le °Brix, le pH et l’analyse technico-économique sans inventer les données manquantes.',
    summary:'Le rendement moyen est de 65,4 % sans pectinase et de 69,9 % avec pectinase. Le gain est de 4,5 points, soit environ 6,9 % de gain relatif.',
    source:'Guide Second Cerveau, pages 14 et 15 — laboratoire jus de pomme et pectinase.',
    answers:{
      what:'La pectinase est une préparation enzymatique qui dégrade la pectine. Le laboratoire compare un lot témoin et un lot traité.',
      who:'Les transformateurs de jus et les personnes qui contrôlent le rendement, la clarté et le coût du procédé sont concernés.',
      where:'Dans le moût de pomme avant le pressage et pendant l’analyse du jus obtenu.',
      when:'Avant le pressage, selon les conditions de la fiche technique, puis pendant les mesures de rendement, °Brix, pH et clarté.',
      why:'Parce que la pectine peut retenir du jus, augmenter la viscosité et contribuer au trouble.',
      how:'La pectinase dégrade la pectine, libère plus facilement le jus et favorise l’agglomération et la sédimentation de particules. Dans l’essai, le rendement et la clarté ont été améliorés.',
      whatIf:'Sans pectinase, le jus peut être moins abondant et plus trouble. Le pH du témoin n’étant pas noté, on ne peut pas comparer les deux pH. Un mauvais dosage peut aussi réduire l’effet attendu.'
    },
    feynman:'La pectine retient une partie du jus comme un filet. La pectinase coupe ce filet : le jus sort plus facilement et peut devenir plus clair.',
    example:'Lot témoin : 508 g de jus, rendement moyen 65,4 %. Lot pectinase : 544 g, rendement moyen 69,9 %. °Brix : 12,8 dans les deux lots. pH : seulement 3,4 noté pour le lot pectinase à l’essai 2.',
    practice:{q:'Montre le calcul du gain moyen en points et du gain relatif à partir de 65,4 % et 69,9 %, puis interprète le résultat.',a:'Gain en points = 69,9 − 65,4 = 4,5 points. Gain relatif = 4,5 ÷ 65,4 × 100 ≈ 6,9 %. Le traitement a donné environ 7 % plus de rendement relativement au témoin.'},
    quiz:[
      {q:'Quel est le gain moyen en points ?',o:['4,5 points','69,9 points','0,08 point'],a:0,w:'69,9 − 65,4 = 4,5 points.'},
      {q:'Peut-on comparer les deux pH ?',o:['Oui, ils sont tous les deux notés','Non, le pH témoin manque','Oui, avec le °Brix'],a:1,w:'Le guide indique que le pH témoin n’a pas été noté.'},
      {q:'Quelle est la marge nette présentée après correction de la coquille ?',o:['0,12 $','20 $','2,50 $'],a:0,w:'La logique est 0,20 − 0,08 = 0,12 $.'}
    ]
  },
  {
    id:'herbs-lab',icon:'🌿',short:'Labo herbes',title:'Sel aux herbes : déshydratation et conservation',
    intro:'Calculer la perte de masse et relier salage, osmose, eau disponible et entreposage.',
    summary:'Le mélange passe de 120 g à 66 g. La perte est de 54 g, soit 45 % de la masse totale du mélange utilisée comme dénominateur dans le calcul.',
    source:'Guide Second Cerveau, pages 16 et 17 — laboratoire sel aux herbes.',
    answers:{
      what:'Le laboratoire combine le salage et la déshydratation pour réduire l’eau disponible et améliorer la conservation du sel aux herbes.',
      who:'Les personnes qui transforment les herbes et les microorganismes sensibles à la diminution de l’eau disponible sont concernés.',
      where:'Dans le mélange d’herbes et de sel, pendant la macération, le séchage et l’entreposage.',
      when:'Après la préparation des herbes, pendant la macération, pendant 10 h de séchage à 110 °F selon le protocole, puis pendant la conservation.',
      why:'Parce que le séchage enlève de l’eau et que le sel réduit la disponibilité de l’eau restante.',
      how:'Le mélange initial de 67 g d’herbes et 53 g de sel pèse 120 g. Après séchage, il pèse 66 g. La perte de 54 g représente 45 % du mélange initial.',
      whatIf:'Si le produit reste trop humide, des moisissures ou d’autres microorganismes peuvent se développer. Il faut aussi éviter de dire que 45 % représente uniquement la masse des herbes : le dénominateur utilisé est 120 g de mélange.'
    },
    feynman:'Le séchage enlève surtout de l’eau libre. Le sel rend aussi l’eau restante moins disponible. Ensemble, ils rendent le milieu moins favorable aux microbes.',
    example:'[(67 + 53) − 66] ÷ (67 + 53) × 100 = 45 %. Conserver ensuite dans un contenant propre, sec et fermé, à l’abri de l’humidité et de la lumière directe.',
    practice:{q:'Calcule la perte en grammes et en pourcentage, puis explique précisément ce que représente le 45 %.',a:'Perte = 120 − 66 = 54 g. Pourcentage = 54 ÷ 120 × 100 = 45 %. Ce 45 % est calculé sur la masse totale du mélange avant séchage, pas uniquement sur les 67 g d’herbes.'},
    quiz:[
      {q:'Quelle masse a été perdue ?',o:['54 g','45 g','66 g'],a:0,w:'120 − 66 = 54 g.'},
      {q:'Le 45 % est calculé sur quoi ?',o:['La masse totale de 120 g','Seulement 67 g d’herbes','Seulement 53 g de sel'],a:0,w:'Le dénominateur de la formule est la masse totale avant séchage.'},
      {q:'Quelle température est cohérente avec le protocole écrit ?',o:['110 °F','110 °C sans vérification','0 °F'],a:0,w:'Le document demande de vérifier l’unité et indique 110 °F; 110 °C serait très élevé pour les herbes.'}
    ]
  },
  {
    id:'onions',icon:'🧅',short:'Travail oignons',title:'Transformation des oignons : coût et viabilité',
    intro:'Passer d’une recette à un produit mesurable en conservant les données du travail et en signalant ses incohérences.',
    summary:'Le coût total est de 3,8535 $ pour 4 portions, soit environ 0,96 $ par portion. Au prix de 2 $, la marge brute simple est d’environ 1,04 $ par portion.',
    source:'Guide Second Cerveau, pages 17 et 18 — fiche de transformation des oignons.',
    answers:{
      what:'Le travail documente un produit appelé « Oignons fris » dans la source : ingrédients, provenance, rendement, temps, coût de revient, prix et viabilité.',
      who:'L’équipe de transformation, une petite entreprise et le grand public visé par le produit sont concernés.',
      where:'Dans une petite activité de transformation alimentaire utilisant des oignons et des ingrédients d’appoint.',
      when:'Pendant la préparation de la recette, le calcul du coût, la fixation du prix et l’analyse de la viabilité.',
      why:'Parce qu’une recette doit être transformée en produit mesurable et reproductible avant de décider si elle peut soutenir une activité commerciale.',
      how:'Coût par portion = coût total ÷ nombre de portions. Avec 3,8535 $ et 4 portions, le coût est environ 0,96 $. La main-d’œuvre n’est pas incluse.',
      whatIf:'Le tableau indique 2 oignons tandis que les étapes parlent de 1,5 oignon. La marge écrite de 2 à 3 $ ne correspond pas au calcul simple de 1,04 $ au prix de 2 $. Il faut clarifier avant standardisation.'
    },
    feynman:'Une recette devient un vrai produit quand ses quantités, son rendement, son temps, ses coûts et son prix sont assez précis pour être reproduits et évalués.',
    example:'Coût total 3,8535 $ ÷ 4 portions ≈ 0,96 $ par portion. Prix de vente 2,00 $ − coût 0,96 $ ≈ 1,04 $ de marge brute avant main-d’œuvre et autres charges.',
    practice:{q:'Calcule le coût et la marge simple par portion, puis nomme deux éléments à clarifier avant de standardiser la recette.',a:'Coût = 3,8535 ÷ 4 ≈ 0,96 $. Marge simple = 2,00 − 0,96 ≈ 1,04 $. À clarifier : 2 oignons dans le tableau contre 1,5 dans les étapes; marge annoncée de 2 à 3 $ contre 1,04 $ calculable.'},
    quiz:[
      {q:'Quel est le coût par portion ?',o:['Environ 0,96 $','3,85 $','2,96 $'],a:0,w:'3,8535 ÷ 4 ≈ 0,96 $.'},
      {q:'La main-d’œuvre est-elle incluse ?',o:['Oui, complètement','Non, elle n’est pas incluse dans le calcul de base','Seulement dans le prix des oignons'],a:1,w:'La fiche le précise.'},
      {q:'Le produit est présenté comme quoi dans la réflexion ?',o:['Potentiellement rentable mais difficile comme activité principale','Toujours impossible à vendre','Déjà une entreprise complète'],a:0,w:'La réflexion distingue rentabilité possible et viabilité comme activité principale.'}
    ]
  },
  {
    id:'calculations',icon:'📊',short:'Calculs',title:'Calculs et raisonnements à maîtriser',
    intro:'Maîtriser les formules des travaux et surtout interpréter ce que le résultat signifie.',
    summary:'Rendement, gain en points, gain relatif, perte au séchage, coût par portion, marge, marge nette et ratio bénéfice/coût.',
    source:'Guide Second Cerveau, pages 18 et 19 — calculs et méthode de réponse.',
    answers:{
      what:'Les calculs du cours servent à quantifier un rendement, une perte, un gain, un coût ou une marge.',
      who:'Les responsables de production, de qualité, de gestion et toute personne qui doit expliquer les résultats sont concernés.',
      where:'Dans les laboratoires, les fiches de transformation et les analyses de projet.',
      when:'Après avoir mesuré les masses, volumes, coûts, portions ou prix nécessaires.',
      why:'Parce qu’un chiffre sans formule ni interprétation ne permet pas de comprendre la performance du procédé.',
      how:'On écrit la formule, remplace par les données, calcule avec les unités et interprète le résultat dans le contexte du procédé.',
      whatIf:'Si on confond points de pourcentage et gain relatif, ou si on utilise un mauvais dénominateur, l’interprétation devient fausse.'
    },
    feynman:'Un calcul de transformation compare ce qu’on obtient à ce qu’on avait au départ. Il faut montrer la formule, les nombres, le résultat et ce que ce résultat veut dire.',
    example:'Rendement = quantité obtenue ÷ quantité initiale × 100. Coût par portion = coût total ÷ portions. Marge nette pectinase = 0,20 − 0,08 = 0,12 $. Ratio = 0,20 ÷ 0,08 = 2,5.',
    practice:{q:'À partir d’un rendement témoin de 65,4 % et d’un rendement traité de 69,9 %, calcule le gain en points et le gain relatif. Explique la différence entre les deux.',a:'Gain en points = 4,5 points. Gain relatif = 4,5 ÷ 65,4 × 100 ≈ 6,9 %. Les points sont une différence directe entre deux pourcentages; le gain relatif compare cette différence au rendement témoin.'},
    quiz:[
      {q:'Formule du rendement ?',o:['Quantité obtenue ÷ quantité initiale × 100','Quantité initiale ÷ obtenue','Prix + coût'],a:0,w:'C’est la formule utilisée dans le laboratoire.'},
      {q:'Formule du coût par portion ?',o:['Coût total ÷ portions','Portions ÷ coût total','Prix × temps'],a:0,w:'Le coût total est réparti sur le nombre de portions.'},
      {q:'Que faut-il faire après le calcul ?',o:['Interpréter le résultat','Supprimer les unités','Ne rien expliquer'],a:0,w:'La méthode du guide finit par l’interprétation.'}
    ]
  },
  {
    id:'employee-guide',icon:'👩‍🍳',short:'Projet de session',title:'Cahier des employés et deux cuisines',
    intro:'Comprendre les exigences du nouveau travail sans inventer les informations qui ne sont pas encore disponibles.',
    summary:'Le travail demande un produit transformé destiné à la vente à la ferme, une recette standardisée, des protocoles, des contrôles qualité, des registres et une comparaison petite échelle / cuisine commerciale.',
    source:'Guide Second Cerveau, pages 19 et 20 — nouveau travail de session.',
    answers:{
      what:'Un dossier pouvant être présenté à un conseiller agricole ou à un prêteur avant un investissement, comprenant un cahier des employés et deux scénarios de cuisine.',
      who:'L’équipe du projet, les futurs employés, le gestionnaire, le conseiller agricole ou le prêteur sont concernés.',
      where:'Dans le futur lieu de transformation à petite échelle et dans le scénario de cuisine commerciale. Les lieux précis ne sont pas encore définis dans le document.',
      when:'Après approbation du plan et pendant la conception, les productions réelles, l’analyse des équipements, des coûts et la préparation de la présentation.',
      why:'Parce qu’une personne sans expérience doit pouvoir reproduire le produit de façon constante et sécuritaire, et que l’investissement doit être justifié.',
      how:'Définir le produit, standardiser la recette, écrire les protocoles, fixer les contrôles et limites, créer les registres, planifier achats et conservation, vérifier normes et comparer les deux échelles.',
      whatIf:'Le produit, les lieux, fournisseurs, prix, limites critiques et permis ne sont pas encore fournis. Ces éléments ne doivent pas être inventés; ils devront venir de données réelles et de sources officielles.'
    },
    feynman:'Le cahier des employés transforme le savoir de l’équipe en instructions assez précises pour qu’une autre personne puisse produire le même produit, le contrôler et laisser une trace de ce qui a été fait.',
    example:'Une fiche doit préciser ingrédients, quantités, rendement, étapes, points de contrôle, actions en cas de non-conformité, nettoyage, registres, entreposage et responsabilités.',
    practice:{q:'Classe ces éléments entre « déjà exigé par le travail » et « encore inconnu » : recette standardisée, produit choisi, registre de production, prix réels des équipements, contrôle du pH, lieu précis de transformation.',a:'Déjà exigé : recette standardisée, registre de production, contrôles adaptés comme le pH selon le produit. Encore inconnu dans les documents : produit choisi, prix réels des équipements, lieu précis de transformation. Les limites exactes de pH dépendent aussi du produit.'},
    quiz:[
      {q:'À quoi sert une recette standardisée ?',o:['À produire un résultat constant d’un lot à l’autre','À remplacer les registres','À éviter les mesures'],a:0,w:'Elle doit permettre à une personne sans expérience de reproduire le produit.'},
      {q:'Que doit montrer la traçabilité ?',o:['Qui a fait quoi, quand, avec quel lot et quel résultat','Seulement le logo','Seulement le prix'],a:0,w:'Le guide relie les registres aux opérations, lots et résultats.'},
      {q:'Peut-on inventer les fournisseurs et limites critiques ?',o:['Oui, pour remplir plus vite','Non, ils doivent venir de données réelles et de sources officielles','Seulement dans la conclusion'],a:1,w:'Le guide signale explicitement les éléments qui ne peuvent pas encore être remplis honnêtement.'}
    ]
  }
];

const $=id=>document.getElementById(id);
let state=loadState();
let currentTopicId=state.currentTopic&&topics.some(t=>t.id===state.currentTopic)?state.currentTopic:topics[0].id;
let currentPhase='understand';

function blankTopicState(){return{answers:{},feynman:'',example:'',practice:'',error:'',cause:'',correction:'',cornell:{keywords:'',notes:'',summary:''},quizScore:null,completed:false,startedAt:new Date().toISOString(),reviews:{}}}
function loadState(){try{const raw=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');if(raw&&typeof raw==='object')return{currentTopic:raw.currentTopic||topics[0].id,topics:raw.topics||{}}}catch(_err){}return{currentTopic:topics[0].id,topics:{}}}
function saveState(){state.currentTopic=currentTopicId;try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}catch(_err){}renderProgress()}
function currentTopic(){return topics.find(t=>t.id===currentTopicId)||topics[0]}
function currentWork(){if(!state.topics[currentTopicId])state.topics[currentTopicId]=blankTopicState();return state.topics[currentTopicId]}
function escapeHtml(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]))}
function toast(message){const el=$('toast');el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2300)}

function renderTopics(filter=''){
  const query=filter.trim().toLocaleLowerCase('fr');
  const list=topics.filter(t=>!query||[t.title,t.short,t.intro].join(' ').toLocaleLowerCase('fr').includes(query));
  $('topicList').innerHTML=list.map((t,index)=>{
    const work=state.topics[t.id]||{};
    return `<button type="button" class="topic-button ${t.id===currentTopicId?'active':''} ${work.completed?'complete':''}" data-topic="${t.id}" role="listitem"><span class="topic-icon">${t.icon}</span><span><span class="topic-title">${escapeHtml(t.title)}</span><span class="topic-sub">Notion ${topics.indexOf(t)+1} · ${escapeHtml(t.short)}</span></span><span class="topic-state">${work.completed?'Maîtrisée':'À faire'}</span></button>`
  }).join('')||'<p class="topic-sub">Aucune notion trouvée.</p>';
  document.querySelectorAll('[data-topic]').forEach(button=>button.addEventListener('click',()=>loadTopic(button.dataset.topic)));
}

function loadTopic(id){
  if(!topics.some(t=>t.id===id))return;
  currentTopicId=id;currentWork();saveState();
  const topic=currentTopic(),work=currentWork();
  $('topicNumber').textContent=`Notion ${topics.indexOf(topic)+1} sur ${topics.length} · ${topic.short}`;
  $('topicTitle').textContent=topic.title;
  $('topicIntro').textContent=topic.intro;
  $('topicStatus').textContent=work.completed?'Maîtrisée':'À commencer';
  $('topicStatus').classList.toggle('complete',work.completed);
  $('markComplete').textContent=work.completed?'Retirer « maîtrisée »':'Marquer comme maîtrisée';
  $('referenceSummary').innerHTML=`<strong>Idée générale</strong><p>${escapeHtml(topic.summary)}</p><small>${escapeHtml(topic.source)}</small>`;
  $('referenceGrid').innerHTML=questionKeys.map(([key,label])=>`<article class="reference-item"><b>${escapeHtml(label)}</b><p>${escapeHtml(topic.answers[key])}</p></article>`).join('');
  $('feynmanReference').textContent=topic.feynman;
  $('exampleReference').textContent=topic.example;
  $('reconstructQuestions').innerHTML=questionKeys.map(([key,label])=>`<article class="reconstruct-item"><h4>${escapeHtml(label)}</h4><textarea id="reconstruct-${key}" rows="4" placeholder="Réponds de mémoire avec tes mots…">${escapeHtml(work.answers[key]||'')}</textarea></article>`).join('');
  $('feynmanInput').value=work.feynman||'';
  $('exampleInput').value=work.example||'';
  $('practiceQuestion').textContent=topic.practice.q;
  $('practiceInput').value=work.practice||'';
  $('practiceAnswer').hidden=true;
  $('practiceAnswer').innerHTML='';
  $('comparisonBlock').hidden=true;
  $('comparisonBlock').innerHTML='';
  $('feynmanCompare').hidden=true;
  $('quizResult').hidden=true;
  $('quizResult').innerHTML='';
  $('errorInput').value=work.error||'';
  $('causeInput').value=work.cause||'';
  $('correctionInput').value=work.correction||'';
  $('cornellKeywords').value=work.cornell?.keywords||'';
  $('cornellNotes').value=work.cornell?.notes||'';
  $('cornellSummary').value=work.cornell?.summary||'';
  renderQuiz();renderReviews();renderTopics($('topicSearch').value);switchPhase(currentPhase,false);
}

function switchPhase(phase,scroll=true){
  currentPhase=phase;
  document.querySelectorAll('[data-phase]').forEach(btn=>btn.classList.toggle('active',btn.dataset.phase===phase));
  document.querySelectorAll('[data-phase-panel]').forEach(panel=>panel.classList.toggle('active',panel.dataset.phasePanel===phase));
  if(scroll)$('phase-'+phase)?.scrollIntoView({behavior:'smooth',block:'start'});
}

function saveReconstruction(){const work=currentWork();questionKeys.forEach(([key])=>work.answers[key]=$('reconstruct-'+key).value.trim());saveState();toast('Réponses de mémoire enregistrées.')}
function compareAnswers(){saveReconstruction();const topic=currentTopic(),work=currentWork();$('comparisonBlock').innerHTML='<strong>Comparaison avec la réponse de référence</strong>'+questionKeys.map(([key,label])=>`<div class="compare-row"><div><h4>Ma réponse — ${escapeHtml(label)}</h4><p>${escapeHtml(work.answers[key]||'Aucune réponse écrite.')}</p></div><div><h4>Réponse de référence</h4><p>${escapeHtml(topic.answers[key])}</p></div></div>`).join('');$('comparisonBlock').hidden=false;$('comparisonBlock').scrollIntoView({behavior:'smooth',block:'nearest'})}
function saveExplanation(){const work=currentWork();work.feynman=$('feynmanInput').value.trim();work.example=$('exampleInput').value.trim();saveState();toast('Explication et exemple enregistrés.')}
function showFeynman(){const topic=currentTopic();$('feynmanCompare').innerHTML=`<strong>Explication de référence</strong><p>${escapeHtml(topic.feynman)}</p><strong>Exemple / analogie</strong><p>${escapeHtml(topic.example)}</p>`;$('feynmanCompare').hidden=false}
function savePractice(){currentWork().practice=$('practiceInput').value.trim();saveState();toast('Exercice enregistré.')}
function showPracticeAnswer(){savePractice();$('practiceAnswer').innerHTML=`<strong>Réponse de référence</strong><p>${escapeHtml(currentTopic().practice.a)}</p>`;$('practiceAnswer').hidden=false}

function renderQuiz(){
  const topic=currentTopic();
  $('quizForm').innerHTML=topic.quiz.map((q,index)=>`<fieldset class="quiz-card"><legend class="visually-hidden">Question ${index+1}</legend><p>${index+1}. ${escapeHtml(q.q)}</p>${q.o.map((option,optionIndex)=>`<label class="quiz-choice"><input type="radio" name="quiz-${index}" value="${optionIndex}"><span>${escapeHtml(option)}</span></label>`).join('')}</fieldset>`).join('');
}
function gradeQuiz(event){
  event.preventDefault();const topic=currentTopic();let score=0,answered=0;const details=[];
  topic.quiz.forEach((q,index)=>{const picked=document.querySelector(`input[name="quiz-${index}"]:checked`);if(picked){answered++;if(Number(picked.value)===q.a)score++}details.push(`<li><strong>Question ${index+1} :</strong> ${escapeHtml(q.w)}</li>`)});
  const result=$('quizResult');result.hidden=false;result.className='quiz-result '+(score===topic.quiz.length?'success':'retry');
  result.innerHTML=`<strong>Résultat : ${score} / ${topic.quiz.length}</strong><p>${answered<topic.quiz.length?'Certaines questions sont restées sans réponse. ':''}${score===topic.quiz.length?'La notion est bien rappelée. Passe à la correction de tes erreurs anciennes et programme la révision.':'Relis seulement les points faibles, puis refais un rappel actif sans regarder.'}</p><ul>${details.join('')}</ul>`;
  currentWork().quizScore=score;saveState();result.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function saveCorrection(){const work=currentWork();work.error=$('errorInput').value.trim();work.cause=$('causeInput').value.trim();work.correction=$('correctionInput').value.trim();saveState();toast('Journal des erreurs enregistré.')}

function reviewOffsets(){return[1,3,7,14,30]}
function addDays(date,days){const next=new Date(date);next.setDate(next.getDate()+days);return next}
function formatDate(date){return new Intl.DateTimeFormat('fr-CA',{day:'numeric',month:'long',year:'numeric'}).format(date)}
function renderReviews(){
  const work=currentWork();const start=new Date(work.startedAt||new Date().toISOString());
  $('reviewSchedule').innerHTML=reviewOffsets().map(days=>{const key='d'+days,date=addDays(start,days);return `<article class="review-item"><label><input type="checkbox" data-review="${key}" ${work.reviews?.[key]?'checked':''}><span><strong>J+${days}</strong> — rappel actif avant de relire</span></label><span>${formatDate(date)}</span></article>`}).join('');
  document.querySelectorAll('[data-review]').forEach(box=>box.addEventListener('change',()=>{currentWork().reviews[box.dataset.review]=box.checked;saveState();toast(box.checked?'Révision enregistrée.':'Révision remise à faire.')}));
}
function saveCornell(){const work=currentWork();work.cornell={keywords:$('cornellKeywords').value.trim(),notes:$('cornellNotes').value.trim(),summary:$('cornellSummary').value.trim()};saveState();toast('Fiche Cornell enregistrée.')}
function toggleComplete(){const work=currentWork();work.completed=!work.completed;saveState();loadTopic(currentTopicId);toast(work.completed?'Notion marquée comme maîtrisée.':'Notion remise en apprentissage.')}
function renderProgress(){const done=topics.filter(t=>state.topics[t.id]?.completed).length;$('globalProgressText').textContent=`${done} / ${topics.length} notions`;$('globalProgressBar').style.width=`${Math.round(done/topics.length*100)}%`}
function firstIncomplete(){return topics.find(t=>!state.topics[t.id]?.completed)?.id||topics[0].id}
function exportLearning(){const payload={exportedAt:new Date().toISOString(),method:'WHAT → WHO → WHERE → WHEN → WHY → HOW → WHAT IF → EXPLAIN → PRACTICE → TEST → CORRECT → REVIEW',source:'Guide complet de révision TransfoLab — Second Cerveau',data:state};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='transfolab-second-cerveau-progression.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1500)}
function resetLearning(){if(!confirm('Effacer toutes tes réponses, corrections, fiches Cornell et révisions du mode Second Cerveau ?'))return;localStorage.removeItem(STORAGE_KEY);state={currentTopic:topics[0].id,topics:{}};currentTopicId=topics[0].id;loadTopic(currentTopicId);toast('Progression effacée.')}

$('topicSearch').addEventListener('input',event=>renderTopics(event.target.value));
document.querySelectorAll('[data-phase]').forEach(button=>button.addEventListener('click',()=>switchPhase(button.dataset.phase)));
$('saveReconstruction').addEventListener('click',saveReconstruction);
$('compareAnswers').addEventListener('click',compareAnswers);
$('saveExplanation').addEventListener('click',saveExplanation);
$('showFeynman').addEventListener('click',showFeynman);
$('savePractice').addEventListener('click',savePractice);
$('showPracticeAnswer').addEventListener('click',showPracticeAnswer);
$('quizForm').addEventListener('submit',gradeQuiz);
$('saveCorrection').addEventListener('click',saveCorrection);
$('saveCornell').addEventListener('click',saveCornell);
$('markComplete').addEventListener('click',toggleComplete);
$('exportLearning').addEventListener('click',exportLearning);
$('resetLearning').addEventListener('click',resetLearning);
$('toggleReference').addEventListener('click',()=>{const block=$('referenceBlock');block.hidden=!block.hidden;$('toggleReference').textContent=block.hidden?'Afficher la référence':'Masquer la référence'});
$('startButton').addEventListener('click',()=>{loadTopic(firstIncomplete());$('workspace').scrollIntoView({behavior:'smooth'})});
$('resumeButton').addEventListener('click',()=>{$('workspace').scrollIntoView({behavior:'smooth'});loadTopic(state.currentTopic||topics[0].id)});

renderProgress();loadTopic(currentTopicId);
