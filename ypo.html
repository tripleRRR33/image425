<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Générateur de Descriptions Physiques</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f0f2f5;
        }

        .container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        h1, h2 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 20px;
        }

        .description-container {
            margin: 20px 0;
            padding: 20px;
            border: 1px solid #e1e1e1;
            border-radius: 5px;
            background-color: #fafafa;
        }

        #description-output, #simple-description-output {
            white-space: pre-wrap;
            line-height: 1.6;
            margin-bottom: 20px;
        }

        .divider {
            border-top: 2px dashed #3498db;
            margin: 20px 0;
        }

        .button-container {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin: 20px 0;
        }

        button {
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .generate-button {
            background-color: #3498db;
        }

        .generate-button:hover {
            background-color: #2980b9;
        }

        .copy-button {
            background-color: #27ae60;
        }

        .copy-button:hover {
            background-color: #219a52;
        }

        .link-container {
            text-align: center;
            margin-top: 20px;
            padding: 10px;
            background-color: #f8f9fa;
            border-radius: 5px;
        }

        .link-container a {
            color: #3498db;
            text-decoration: none;
            font-weight: bold;
        }

        .link-container a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Générateur de Descriptions Physiques</h1>
        <div class="button-container">
            <button onclick="genererDescriptions()" class="generate-button">Générer nouvelles descriptions</button>
        </div>
        
        <div class="description-container">
            <h2>Description Détaillée</h2>
            <div id="description-output"></div>
            <button onclick="copierDescription('description-output')" class="copy-button">Copier la description détaillée</button>
        </div>

        <div class="divider"></div>

        <div class="description-container">
            <h2>Description Simplifiée (optimisée pour IA)</h2>
            <div id="simple-description-output"></div>
            <button onclick="copierDescription('simple-description-output')" class="copy-button">Copier la description simplifiée</button>
        </div>

        <div class="link-container">
            <p>🎨 Utilisez aussi le <a href="https://perchance.org/ai-text-to-image-generator" target="_blank">Générateur de Prompts IA</a> pour optimiser vos descriptions !</p>
        </div>
    </div>

    <script>
        const caracteristiques = {
            age: ["18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
            
            visage: {
                forme: ["ovale", "en forme de cœur", "rond", "anguleux", "allongé", "en diamant", "carré adouci", "triangulaire inversé"],
                teint: ["porcelaine", "hâlé", "olive", "pêche", "doré", "ivoire", "albâtre", "caramel", "miel", "bronze", "beige rosé"],
                traits: ["des pommettes hautes et saillantes", "une mâchoire délicate", "des traits fins et harmonieux", "un visage expressif", 
                        "des traits délicats et féminins", "une structure osseuse élégante", "des traits symétriques et raffinés",
                        "un profil gracieux", "des traits doux et harmonieux", "une expression naturellement douce"],
                nez: ["petit et délicat", "droit et raffiné", "légèrement retroussé", "fin et élégant", "parfaitement proportionné"],
                levres: ["pulpeuses et bien dessinées", "fines et élégantes", "naturellement rosées", "en forme d'arc de cupidon prononcé", 
                        "doucement colorées", "parfaitement symétriques", "délicatement ourlées"]
            },
            
            yeux: {
                couleur: ["bleu glacier", "vert émeraude", "noisette doré", "violet améthyste", "gris argenté", "bleu océan", "vert jade", 
                         "ambre", "brun profond", "bleu saphir", "vert forêt", "gris orage", "bleu céruléen", "vert mousse", 
                         "brun ambré", "turquoise", "indigo", "améthyste", "aigue-marine"],
                forme: ["en amande", "grands et expressifs", "légèrement bridés", "ronds et lumineux", "félinement étirés", 
                       "délicatement inclinés", "harmonieusement espacés", "profonds et envoûtants"],
                details: ["avec des reflets dorés", "parsemés de paillettes dorées", "avec un anneau doré autour de la pupille", 
                         "aux longs cils fournis", "soulignés de cils naturellement longs", "avec des reflets irisés", 
                         "mouchetés de points dorés", "avec un dégradé subtil", "bordés de cils épais et recourbés"]
            },
            
            cheveux: {
                longueur: ["très longs jusqu'aux hanches", "mi-longs effleurant les épaules", "courts et stylisés", 
                          "longs jusqu'au milieu du dos", "au niveau des omoplates", "coupés au carré net", 
                          "descendant en cascade jusqu'aux reins", "effleurant la taille"],
                couleur: ["blond platine", "noir de jais", "roux flamboyant", "châtain aux reflets dorés", "brun chocolat", 
                         "blanc argenté", "bleu nuit", "violet profond", "rose poudré", "lavande pastel", "bordeaux profond",
                         "caramel", "miel doré", "acajou", "cuivré", "auburn", "prune"],
                style: ["ondulés", "bouclés", "parfaitement lisses", "légèrement ondulés", "en boucles souples", 
                       "en vagues glamour", "en spirales définies", "en boucles romantiques", "en cascade ondoyante"],
                texture: ["soyeux", "épais et volumineux", "fins et légers", "brillants et sains", "doux comme de la soie", 
                         "luxuriants et abondants", "légers comme une plume", "resplendissants de santé"]
            },
            
            corps: {
                taille: ["petite (1m55-1m60)", "moyenne (1m65-1m70)", "grande (1m75-1m80)", "très grande (1m80+)"],
                silhouette: ["mince et élancée", "athlétique et tonique", "aux courbes harmonieuses", "svelte et gracieuse",
                            "fine et délicate", "athlétique et sculptée", "aux proportions parfaites", "élancée et souple"],
                details: ["une posture gracieuse", "une démarche élégante", "des mouvements fluides", 
                         "une présence naturellement élégante", "un maintien royal", "une grâce naturelle"]
            },

            style: {
                vetements: ["élégante", "sophistiquée", "décontractée chic", "avant-gardiste", "bohème chic", 
                           "minimaliste raffinée", "glamour", "romantique moderne"],
                accessoires: ["bijoux délicats en or", "accessoires raffinés en argent", "touches personnalisées subtiles",
                            "bijoux minimalistes", "accessoires vintage sélectionnés", "pièces artisanales uniques"],
                allure: ["une allure naturellement gracieuse", "un style distinctif", "une élégance innée",
                        "un charisme magnétique", "une présence captivante", "un magnétisme naturel"]
            }
        };

        function choixAleatoire(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

        function genererDescription() {
            const age = choixAleatoire(caracteristiques.age);
            
            const description = `Portrait détaillé d'une jeune femme de ${age} ans :

Apparence générale : ${choixAleatoire(caracteristiques.corps.taille)}, ${choixAleatoire(caracteristiques.corps.silhouette)}, dégageant ${choixAleatoire(caracteristiques.corps.details)}.

Visage : ${choixAleatoire(caracteristiques.visage.forme)}, au teint ${choixAleatoire(caracteristiques.visage.teint)}, avec ${choixAleatoire(caracteristiques.visage.traits)}. Son nez est ${choixAleatoire(caracteristiques.visage.nez)}, accompagné de lèvres ${choixAleatoire(caracteristiques.visage.levres)}.

Yeux : ${choixAleatoire(caracteristiques.yeux.couleur)}, ${choixAleatoire(caracteristiques.yeux.forme)}, ${choixAleatoire(caracteristiques.yeux.details)}.

Cheveux : ${choixAleatoire(caracteristiques.cheveux.longueur)}, ${choixAleatoire(caracteristiques.cheveux.couleur)}, ${choixAleatoire(caracteristiques.cheveux.style)} et ${choixAleatoire(caracteristiques.cheveux.texture)}.

Style : ${choixAleatoire(caracteristiques.style.vetements)}, portant des ${choixAleatoire(caracteristiques.style.accessoires)}, ${choixAleatoire(caracteristiques.style.allure)}.`;

            document.getElementById('description-output').textContent = description;
        }

        function genererDescriptionSimple() {
            const age = choixAleatoire(caracteristiques.age);
            return `beautiful young woman, ${age} years old, ${choixAleatoire(caracteristiques.corps.silhouette)}, ${choixAleatoire(caracteristiques.cheveux.longueur)} ${choixAleatoire(caracteristiques.cheveux.couleur)} ${choixAleatoire(caracteristiques.cheveux.style)} hair, ${choixAleatoire(caracteristiques.yeux.couleur)} ${choixAleatoire(caracteristiques.yeux.forme)} eyes, ${choixAleatoire(caracteristiques.visage.teint)} skin tone, ${choixAleatoire(caracteristiques.style.vetements)} style, high quality, detailed, realistic, 8k, masterpiece, perfect face`;
        }

        function genererDescriptions() {
            genererDescription();
            document.getElementById('simple-description-output').textContent = genererDescriptionSimple();
        }

        function copierDescription(elementId) {
            const texte = document.getElementById(elementId).textContent;
            navigator.clipboard.writeText(texte).then(() => {
                alert('Description copiée dans le presse-papiers !');
            });
        }

        // Générer les descriptions au chargement
        genererDescriptions();
    </script>
</body>
</html>
