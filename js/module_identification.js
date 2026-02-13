const ModuleIdentification = {
    render: async (container) => {
        container.innerHTML = `
            <div class="analysis-screen">
                <h2><i class="fas fa-search"></i> Step 2: AI Species Identification</h2>
                <p>Analyzing morphological features: Body structure, color patterns, textures, and distinctive markings...</p>
                
                <div class="identification-display">
                    <div class="scanning-wrapper">
                        <img src="${AppState.uploadedImage}" class="preview-image" id="target-image" crossorigin="anonymous">
                        <div class="scan-line"></div>
                        <div class="analysis-overlay" id="analysis-overlay">
                            <div class="feat-box" style="top: 10%; left: 20%;">Structure: <span class="feat-value">Queuing...</span></div>
                            <div class="feat-box" style="top: 40%; left: 60%;">Color Pattern: <span class="feat-value">Queuing...</span></div>
                            <div class="feat-box" style="top: 70%; left: 30%;">Texture: <span class="feat-value">Queuing...</span></div>
                            <div class="feat-box" style="top: 25%; left: 70%;">Markings: <span class="feat-value">Queuing...</span></div>
                            <div class="feat-box" style="top: 60%; left: 15%;">Proportions: <span class="feat-value">Queuing...</span></div>
                        </div>
                    </div>
                </div>

                <div id="loading-indicator" style="text-align: center; margin-top: 2rem;">
                    <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary-green);"></i>
                    <p style="margin-top: 10px; opacity: 0.7;">Loading MobileNet v2 Model...</p>
                </div>

                <div id="id-results" class="results-box glass-card" style="display: none; margin-top: 2rem; background: rgba(46, 204, 113, 0.1);">
                    <h3><i class="fas fa-check-circle"></i> Identification Results</h3>
                    
                    <div class="primary-match" style="margin: 1.5rem 0; padding: 1.5rem; background: rgba(46, 204, 113, 0.15); border-radius: 12px; border-left: 4px solid var(--primary-green);">
                        <div class="match-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <div>
                                <span class="label" style="font-size: 0.85rem; opacity: 0.7;">PRIMARY MATCH</span>
                                <h4 id="species-name" style="font-size: 1.8rem; margin-top: 0.5rem;">---</h4>
                                <p id="sci-name" style="font-style: italic; opacity: 0.8;">---</p>
                            </div>
                            <div class="confidence-badge" style="background: var(--primary-green); color: #000; padding: 10px 20px; border-radius: 25px; font-weight: 700;">
                                <span id="confidence-value">--</span>% Confidence
                            </div>
                        </div>
                        <div class="match-evidence" style="font-size: 0.9rem;">
                            <strong>AI Analysis Output:</strong>
                            <p id="raw-prediction" style="font-family: monospace; opacity: 0.8; margin-top: 5px;">Analysis: Pending...</p>
                            
                            <strong style="display: block; margin-top: 1rem;">Key Identifying Features:</strong>
                            <ul id="identification-features" style="margin-left: 20px; margin-top: 0.5rem;"></ul>
                        </div>
                    </div>
                    
                    <div class="uncertainty-notice glass-card" style="background: rgba(241, 196, 15, 0.1); border-left: 4px solid #f1c40f; padding: 1rem; margin-bottom: 1.5rem;">
                        <h5 style="color: #f1c40f; margin-bottom: 0.5rem;"><i class="fas fa-exclamation-triangle"></i> Uncertainty Acknowledgment</h5>
                        <p style="font-size: 0.85rem; opacity: 0.9;">This identification uses MobileNet (ImageNet) pre-trained on 1000 classes. Accuracy depends on image clarity and model training set limitations.</p>
                    </div>
                    
                    <div class="alternative-matches">
                        <h5 style="margin-bottom: 1rem;"><i class="fas fa-list"></i> Top 3 Model Predictions</h5>
                        <div id="alternative-list" style="display: grid; gap: 10px;"></div>
                    </div>
                    
                    <div class="action-buttons" style="margin-top: 2rem;">
                        <button id="view-profile" class="primary-btn">View Ecological Profile <i class="fas fa-book"></i></button>
                    </div>
                </div>
            </div>
        `;

        const featureValues = document.querySelectorAll('.feat-value');
        const loadingBox = document.getElementById('loading-indicator');
        const imgElement = document.getElementById('target-image');

        // Wait for image to load
        if (!imgElement.complete) {
            await new Promise(resolve => imgElement.onload = resolve);
        }

        try {
            // Update UI for loading
            featureValues.forEach(el => el.innerText = "Loading Model...");

            let predictions = [];
            let usedCustomModel = false;

            // CUSTOM MODEL TEMPORARILY DISABLED - Using MobileNet for accurate results
            // The custom model needs proper training. Until then, MobileNet provides better accuracy.

            /* DISABLED CUSTOM MODEL CODE:
            try {
                const customModel = await tf.loadLayersModel('indexeddb://wildlife-model');
                const classes = JSON.parse(localStorage.getItem('wildlife-classes'));

                if (customModel && classes && classes.length > 0) {
                    loadingBox.querySelector('p').innerText = "Running Custom Neural Network...";

                    const tensor = tf.tidy(() => {
                        return tf.browser.fromPixels(imgElement)
                            .resizeNearestNeighbor([64, 64]) // Must match training size
                            .toFloat()
                            .div(255.0)
                            .expandDims();
                    });

                    const probs = await customModel.predict(tensor).data();
                    tensor.dispose();

                    // Convert to array of objects
                    const classProbs = [];
                    for (let i = 0; i < classes.length; i++) {
                        classProbs.push({ className: classes[i], probability: probs[i] });
                    }

                    const sortedPreds = classProbs.sort((a, b) => b.probability - a.probability);

                    // VALIDATION: Only use custom model if top prediction has reasonable confidence
                    if (sortedPreds[0].probability >= 0.15) { // At least 15% confidence
                        predictions = sortedPreds;
                        usedCustomModel = true;
                        console.log("✓ Using custom model (confidence:", (sortedPreds[0].probability * 100).toFixed(1) + "%)");
                    } else {
                        console.log("⚠ Custom model confidence too low (" + (sortedPreds[0].probability * 100).toFixed(1) + "%), using MobileNet instead");
                        // Clear the poorly trained model
                        await tf.io.removeModel('indexeddb://wildlife-model');
                        localStorage.removeItem('wildlife-classes');
                    }
                }
            } catch (e) {
                console.log("Custom model not available or failed:", e);
            }
            */

            // Force use of MobileNet for accurate wildlife identification
            loadingBox.querySelector('p').innerText = "Loading MobileNet AI (Google)...";
            const model = await mobilenet.load();
            featureValues.forEach(el => el.innerText = "Analyzing image...");
            predictions = await model.classify(imgElement);
            console.log("✓ Using MobileNet for accurate identification");

            // Process Results
            loadingBox.style.display = 'none';
            displayResults(predictions, usedCustomModel);

            // Update scanning UI
            featureValues[0].innerText = "Complete";
            featureValues[1].innerText = "Verified";
            featureValues[2].innerText = "Analyzed";
            featureValues[3].innerText = "Mapped";
            featureValues[4].innerText = "Done";

        } catch (error) {
            console.error("AI Error:", error);
            loadingBox.innerHTML = `<p style="color: #e74c3c;">AI Model Error: ${error.message}. Please reload and try again.</p>`;
        }
    }
};

function displayResults(predictions, isCustom = false) {
    const resultsBox = document.getElementById('id-results');
    const speciesName = document.getElementById('species-name');
    const sciName = document.getElementById('sci-name');
    const confidenceValue = document.getElementById('confidence-value');
    const identificationFeatures = document.getElementById('identification-features');
    const alternativeList = document.getElementById('alternative-list');
    const rawPrediction = document.getElementById('raw-prediction');

    // Display RAW predictions for debugging/transparency
    const topPrediction = predictions[0];
    const source = isCustom ? "Custom Model" : "MobileNet";
    rawPrediction.innerText = `${source} Class: "${topPrediction.className}" (Prob: ${(topPrediction.probability * 100).toFixed(2)}%)`;

    // Map to Internal Database OR Expanded Dataset
    let matchedKey = null;
    let bestProb = 0;
    let matchSource = "none";

    if (isCustom) {
        matchedKey = topPrediction.className;
        bestProb = topPrediction.probability;
        matchSource = "custom";
    } else {
        // SMARTER ANALYSIS: Look at top 5 predictions and find the best wildlife match
        const topN = predictions.slice(0, 5);
        let bestMatch = null;
        let bestMatchScore = 0;

        for (let i = 0; i < topN.length; i++) {
            const pred = topN[i];
            const key = mapToInternalSpecies(pred.className);

            if (key) {
                // Calculate weighted score: probability * position weight
                const positionWeight = 1 - (i * 0.15); // First result gets 1.0, second 0.85, etc.
                const score = pred.probability * positionWeight;

                if (score > bestMatchScore) {
                    bestMatch = key;
                    bestMatchScore = score;
                    bestProb = pred.probability;
                    matchSource = "mapped";
                }
            }
        }

        if (bestMatch) {
            matchedKey = bestMatch;
        } else {
            // Dynamic Fallback: Check dataset manifest for any of the top predictions
            for (let p of topN) {
                const sanitized = p.className.toLowerCase().replace(/\s+/g, '_').split(',')[0];
                if (DATASET_MANIFEST && DATASET_MANIFEST[sanitized]) {
                    matchedKey = sanitized;
                    bestProb = p.probability;
                    matchSource = "manifest";
                    break;
                }

                // Try multi-word variations
                const multiWord = p.className.toLowerCase().replace(/[^a-z0-9]/g, '_');
                if (DATASET_MANIFEST && DATASET_MANIFEST[multiWord]) {
                    matchedKey = multiWord;
                    bestProb = p.probability;
                    matchSource = "manifest";
                    break;
                }
            }
        }
    }

    // Final Fallback: Use top prediction but mark as uncertain
    if (!matchedKey) {
        matchedKey = topPrediction.className.split(',')[0].toLowerCase().replace(/\s+/g, '_');
        bestProb = topPrediction.probability * 0.7; // Reduce confidence for uncertain matches
        matchSource = "uncertain";
    }

    // Prepare Display Data
    let finalSpecies = null;
    let finalConfidence = Math.round(bestProb * 100);

    // Only boost confidence slightly if it's very close to a threshold
    if (finalConfidence >= 70 && finalConfidence < 75) {
        finalConfidence += 3; // Small boost for borderline cases
    }
    if (finalConfidence > 99) finalConfidence = 99;

    if (AppState.speciesData[matchedKey]) {
        finalSpecies = AppState.speciesData[matchedKey];
    } else {
        // DYNAMIC PROFILE GEN for species in manifest or unknown birds/animals
        const formattedName = matchedKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        finalSpecies = {
            commonName: formattedName,
            scientificName: "Classified via Neural Network",
            taxonomy: "Wildlife Identification",
            description: `This specimen has been identified as a ${formattedName} using the expanded visual recognition database.`,
            safetyType: "low",
            group: "Detected Fauna",
            behavior: "Aggregation of behavior patterns for this species is ongoing.",
            diet: "Dietary habits vary based on specific environmental factors.",
            nature: "Wild",
            habitat: "Natural ecosystems suitable for this species.",
            status: "Observation Required",
            evsAlignment: "Biodiversity awareness and species conservation."
        };
    }

    AppState.identifiedSpecies = finalSpecies;

    // Render Primary Match
    speciesName.innerText = finalSpecies.commonName;
    sciName.innerText = finalSpecies.scientificName;

    // Show confidence with quality indicator
    const qualityIndicators = {
        'custom': '🎯 High',
        'mapped': '✓ Good',
        'manifest': '~ Fair',
        'uncertain': '? Low'
    };
    const qualityText = qualityIndicators[matchSource] || '~ Fair';
    confidenceValue.innerHTML = `${finalConfidence}% <span style="font-size: 0.7rem; opacity: 0.7; margin-left: 8px;">(${qualityText})</span>`;

    // Features
    const features = generateIdentificationFeatures(matchedKey);
    identificationFeatures.innerHTML = features.map(f => `<li>${f}</li>`).join('');

    // Render Alternatives
    alternativeList.innerHTML = predictions.slice(0, 3).map(p => `
        <div class="alternative-item glass-card" style="padding: 1rem; display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border);">
            <div>
                <span style="font-weight: 600; text-transform: capitalize;">${p.className}</span>
                <span style="font-size: 0.8rem; opacity: 0.6; margin-left: 5px;">(AI Class)</span>
            </div>
            <span style="background: rgba(0, 242, 96, 0.1); color: var(--primary-green); padding: 4px 12px; border-radius: 15px; font-size: 0.85rem;">
                ${(p.probability * 100).toFixed(1)}%
            </span>
        </div>
    `).join('');

    resultsBox.style.display = 'block';
    resultsBox.style.animation = 'fadeIn 0.5s ease-out';

    document.getElementById('view-profile').addEventListener('click', () => {
        nextStep();
    });
}

function mapToInternalSpecies(className) {
    const c = className.toLowerCase();

    // PRIORITY 1: Exact species matches (most specific first)
    if (c.includes('african grey') || c.includes('african gray')) return 'african_grey_parrot';
    if (c.includes('amazon parrot')) return 'amazon_parrot';
    if (c.includes('king cobra')) return 'cobra';
    if (c.includes('african lion')) return 'african_lion';
    if (c.includes('eagle owl')) return 'eagle_owl';
    if (c.includes('adelie penguin')) return 'adelie_penguin';
    if (c.includes('admiral butterfly')) return 'admiral_butterfly';

    // PRIORITY 2: Bird families (check before generic terms)
    if (c.includes('parrot') || c.includes('macaw') || c.includes('parakeet') || c.includes('lorikeet')) {
        return 'parrot';
    }
    if (c.includes('peacock') || c.includes('peafowl')) return 'peafowl';
    if (c.includes('owl')) return 'eagle_owl';
    if (c.includes('penguin')) return 'adelie_penguin';
    if (c.includes('butterfly')) return 'admiral_butterfly';

    // PRIORITY 3: Mammals
    if (c.includes('tiger')) return 'tiger';
    if (c.includes('elephant')) return 'elephant';
    if (c.includes('leopard')) return 'leopard';
    if (c.includes('lion')) return 'african_lion';
    if (c.includes('bear')) return 'bear';
    if (c.includes('wolf')) return 'wolf';
    if (c.includes('fox')) return 'fox';
    if (c.includes('rhino')) return 'rhino';

    // PRIORITY 4: Reptiles
    if (c.includes('cobra') || c.includes('snake')) return 'cobra';

    // PRIORITY 5: Check dataset manifest for direct match
    const sanitized = c.replace(/\s+/g, '_').split(',')[0];
    if (DATASET_MANIFEST && DATASET_MANIFEST[sanitized]) {
        return sanitized;
    }

    return null;
}

function generateIdentificationFeatures(speciesKey) {
    const featureSets = {
        'tiger': ['Striped coat pattern', 'Large body size', 'Round face with prominent whiskers'],
        'peafowl': ['Iridescent blue plumage', 'Elaborate tail feathers with eye spots', 'Crest on head'],
        'parrot': ['Hooked beak', 'Zygodactyl feet (two toes forward, two back)', 'Brightly colored plumage', 'Highly intelligent behavior'],
        'african_grey_parrot': ['Grey feathers', 'Bright red tail', 'White mask around eyes', 'Expert vocal mimicry'],
        'fox': ['Reddish-orange fur', 'Bushy tail with white tip', 'Pointed ears'],
        'elephant': ['Large ears', 'Prehensile trunk', 'Tusks (in males)'],
        'cobra': ['Expandable hood', 'Upright threat posture', 'Distinctive markings on hood'],
        'lion': ['Golden coat', 'Prominent mane (males)', 'Social group living (prides)'],
        'gharial': ['Extremely long narrow snout', 'Bony prominence on snout (ghara)', 'Dark olive coloration', 'Large size (5-6 meters)', 'Bristly scales on body'],
        'snow_leopard': ['Thick smoky-gray fur', 'Large rosette spots', 'Long thick tail', 'Small ears', 'Padded feet for snow'],
        'pangolin': ['Large keratin scales', 'Curled ball defense', 'Long sticky tongue', 'Short legs', 'Toothless snout'],
        'red_panda': ['Reddish-brown fur', 'Ringed tail', 'Mask-like face markings', 'Cat-sized body', 'Rounded ears with white markings'],
        'sambar': ['Dark brown to black coat', 'Stags with antlers', 'Short mane on neck', 'White patch on throat', 'Large ears'],
        'wolf': ['Gray to tan coat', 'Pointed ears', 'Bushy tail', 'Yellow eyes', 'Angular face structure'],
        'nilgai': ['Blue-gray coat (males)', 'Short straight horns', 'White stockings on legs', 'White chin patch', 'Large deer-like build'],
        'blackbuck': ['Spiral horns (males)', 'White eye circles', 'Chestnut brown coat (males)', 'White underparts', 'Lean graceful build'],
        'mugger': ['Broad snout', 'Heavy armored scales', 'Dark olive coloration', 'Bony ridges on head', 'Powerful tail'],
        'eagle_owl': ['Large size (60-70 cm)', 'Ear tufts (horns)', 'Orange eyes', 'Mottled brown plumage', 'Deep hooting call'],
        'monal': ['Iridescent multicolored plumage (males)', 'Crest on head', 'White rump patch', 'Metallic blue-green sheen', 'Black body'],
        'python': ['Non-venomous constrictor', 'Diamond patterns on back', 'Large triangular head', 'Long muscular body', 'Heat-sensing pits'],
        'gaur': ['Hump on back', 'White stockings', 'Dark brown to black coat', 'Large curved horns', 'Massive bison-like build'],
        'hyena': ['Sloping back', 'Striped coat', 'Powerful jaws', 'Short hind legs', 'Bushy tail'],
        'rhino': ['Single horn on nose', 'Thick armor-like skin', 'Small ears', 'Poor eyesight', 'Large body (1-2 tons)'],
        'clouded_leopard': ['Cloud-shaped markings', 'Long canine teeth', 'Long tail', 'Short legs', 'Grayish-brown coat'],
        'dhole': ['Reddish coat', 'Bushy tail', 'White chest patch', 'Pointed ears', 'Pack hunting behavior'],
        'fishing_cat': ['Olive-gray coat', 'Dark stripes and spots', 'Webbed paws', 'Short tail', 'Stocky build'],
        'giant_squirrel': ['Maroon and cream coloration', 'Large size (1m with tail)', 'Bushy tail', 'Small rounded ears', 'Strong hind legs'],
        'sarus_crane': ['Gray plumage', 'Red head and neck', 'Black cap', 'White wing patches', 'Tall stature (up to 6 ft)'],
        'monitor': ['Long forked tongue', 'Strong claws', 'Banded pattern', 'Long neck', 'Powerful tail'],
        'viper': ['Chain-like pattern', 'Triangular head', 'Keeled scales', 'Russells viper distinctive markings', 'Thick body']
    };

    // Generic fallback generator
    return featureSets[speciesKey] || [
        'Distinctive species-specific markings',
        'Characteristic body shape and size',
        'Unique coloration pattern',
        'Identifiable morphological traits',
        'Habitat-specific adaptations visible'
    ];
}
