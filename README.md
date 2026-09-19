# TransfoLab

TransfoLab est une application web distincte d'AgriPilot, centrée sur la **transformation alimentaire**.

## Objectif

Aider à documenter un procédé de transformation depuis la matière première jusqu'au produit fini :

- identifier l'aliment et le lot;
- saisir les mesures de transformation;
- calculer des rendements ou pertes;
- suivre des paramètres de qualité;
- enregistrer un historique local des lots;
- consulter des notions scientifiques liées au procédé.

## MVP actuel

Le prototype contient trois modules de départ :

1. **Jus de pomme** — masse initiale, jus obtenu, pH, °Brix, clarté, pectinase et rendement d'extraction.
2. **Sel aux herbes** — masse des herbes, masse de sel, masse après séchage et pourcentage de perte.
3. **Transformation d'oignons** — produit, coût total, nombre de portions, coût de revient et prix prévu.

Les lots sont stockés dans le navigateur avec `localStorage`. Aucune donnée n'est envoyée à un serveur.

## Lancer le site

Ouvre simplement `index.html` dans un navigateur.

## Structure

- `index.html` — interface
- `styles.css` — design responsive
- `app.js` — logique, calculs, historique et export CSV

## Important

TransfoLab est un prototype pédagogique. Les paramètres critiques de sécurité alimentaire, les procédés de conservation et les exigences réglementaires doivent être validés avec les références officielles applicables au produit et au lieu de production.
