const ModuleHealth = {
    render: (container) => {
        container.innerHTML = `
            <div class="health-screen animated fadeIn">
                <h2><i class="fas fa-heartbeat"></i> Step 4: Health Awareness Module</h2>
                <div class="disclaimer-mini glass-card" style="border-left: 4px solid var(--risk-high); margin-bottom: 1.5rem; padding: 1rem; font-size: 0.85rem;">
                    <strong>CRITICAL DISCLAIMER:</strong> THIS MODULE DOES NOT DIAGNOSE OR TREAT. IT RAISES AWARENESS AND DIRECTS TO PROFESSIONALS FOR EDUCATIONAL PURPOSES.
                </div>
                
                <p>Select observable symptoms from the checklist below to generate a comprehensive health awareness assessment with differential diagnoses.</p>

                <div class="symptom-checklist glass-card" id="symptom-form">
                    <div class="symptom-grid">
                        <div class="symptom-group">
                            <h4><i class="fas fa-cut"></i> Physical Injuries</h4>
                            <label class="check-item"><input type="checkbox" value="wounds"> Visible wounds or cuts</label>
                            <label class="check-item"><input type="checkbox" value="bleeding"> Bleeding</label>
                            <label class="check-item"><input type="checkbox" value="broken_limbs"> Broken or damaged limbs</label>
                            <label class="check-item"><input type="checkbox" value="wing_damage"> Wing damage (birds)</label>
                            <label class="check-item"><input type="checkbox" value="swelling"> Swelling or bumps</label>
                            <label class="check-item"><input type="checkbox" value="lacerations"> Deep lacerations</label>
                        </div>
                        <div class="symptom-group">
                            <h4><i class="fas fa-running"></i> Movement & Mobility</h4>
                            <label class="check-item"><input type="checkbox" value="limping"> Limping or favoring leg</label>
                            <label class="check-item"><input type="checkbox" value="immobility"> Inability to stand/walk</label>
                            <label class="check-item"><input type="checkbox" value="difficulty_flying"> Difficulty flying</label>
                            <label class="check-item"><input type="checkbox" value="abnormal_gait"> Abnormal gait or posture</label>
                            <label class="check-item"><input type="checkbox" value="circling"> Circling behavior</label>
                            <label class="check-item"><input type="checkbox" value="tremors"> Muscle tremors</label>
                        </div>
                        <div class="symptom-group">
                            <h4><i class="fas fa-allergies"></i> Skin & Coat Conditions</h4>
                            <label class="check-item"><input type="checkbox" value="hair_loss"> Hair loss or bald patches</label>
                            <label class="check-item"><input type="checkbox" value="lesions"> Skin lesions or sores</label>
                            <label class="check-item"><input type="checkbox" value="scratching"> Excessive scratching</label>
                            <label class="check-item"><input type="checkbox" value="matted_fur"> Matted fur/feathers</label>
                            <label class="check-item"><input type="checkbox" value="parasites"> Visible parasites (ticks/mites)</label>
                            <label class="check-item"><input type="checkbox" value="rashes"> Rashes or discoloration</label>
                        </div>
                        <div class="symptom-group">
                            <h4><i class="fas fa-brain"></i> Behavioral Changes</h4>
                            <label class="check-item"><input type="checkbox" value="lethargy"> Lethargy or weakness</label>
                            <label class="check-item"><input type="checkbox" value="aggression"> Unusual aggression/fear</label>
                            <label class="check-item"><input type="checkbox" value="disorientation"> Disorientation / Confusion</label>
                            <label class="check-item"><input type="checkbox" value="no_response"> Lack of response to stimuli</label>
                            <label class="check-item"><input type="checkbox" value="vocalizations"> Abnormal vocalizations</label>
                            <label class="check-item"><input type="checkbox" value="isolation"> Social isolation</label>
                        </div>
                        <div class="symptom-group">
                            <h4><i class="fas fa-user-injured"></i> Physical Appearance</h4>
                            <label class="check-item"><input type="checkbox" value="emaciation"> Emaciation (visible ribs)</label>
                            <label class="check-item"><input type="checkbox" value="discharge"> Discharge (eyes/nose)</label>
                            <label class="check-item"><input type="checkbox" value="labored_breathing"> Labored breathing</label>
                            <label class="check-item"><input type="checkbox" value="cloudy_eyes"> Cloudy or swollen eyes</label>
                            <label class="check-item"><input type="checkbox" value="abnormal_posture"> Abnormal body posture</label>
                            <label class="check-item"><input type="checkbox" value="dehydration"> Sunken eyes (dehydration)</label>
                        </div>
                        <div class="symptom-group">
                            <h4><i class="fas fa-thermometer-half"></i> Environmental Indicators</h4>
                            <label class="check-item"><input type="checkbox" value="hypothermia"> Cold to touch</label>
                            <label class="check-item"><input type="checkbox" value="hyperthermia"> Overheating indicators</label>
                            <label class="check-item"><input type="checkbox" value="odor"> Foul odor</label>
                            <label class="check-item"><input type="checkbox" value="feather_plucking"> Feather plucking</label>
                            <label class="check-item"><input type="checkbox" value="crop_issues"> Crop problems (birds)</label>
                            <label class="check-item"><input type="checkbox" value="egg_binding"> Egg binding signs</label>
                        </div>
                    </div>

                    <div class="action-buttons" style="margin-top: 2rem; border-top: 1px solid var(--glass-border); padding-top: 1.5rem;">
                        <button id="analyze-health" class="primary-btn">Generate Health Awareness Assessment <i class="fas fa-stethoscope"></i></button>
                    </div>
                </div>

                <div id="health-results" class="results-box glass-card" style="display: none; margin-top: 2rem;">
                    <!-- Results populated dynamically -->
                </div>
            </div>
        `;

        const analyzeBtn = document.getElementById('analyze-health');
        analyzeBtn.addEventListener('click', () => {
            const checked = Array.from(document.querySelectorAll('#symptom-form input:checked')).map(i => i.value);
            if (checked.length === 0) {
                alert("Please select at least one symptom for analysis.");
                return;
            }

            const assessment = performAssessment(checked);
            AppState.riskAssessment = assessment;
            AppState.selectedSymptoms = checked;

            renderHealthResults(document.getElementById('health-results'), assessment);
        });

        function performAssessment(values) {
            // Comprehensive differential diagnosis database with detailed reasoning
            const differentialDiagnoses = {
                trauma: {
                    conditions: [
                        { name: "Physical Trauma/Injury", probability: 85, reasoning: "Multiple physical symptoms (wounds, bleeding, limping) suggest external injury from collision, fall, or predator attack" },
                        { name: "Fracture or Bone Damage", probability: 65, reasoning: "Limping combined with swelling and abnormal gait indicates possible fracture or joint damage" },
                        { name: "Soft Tissue Damage", probability: 70, reasoning: "Swelling, wounds, and bruising suggest soft tissue injury (contusion, sprain, or laceration)" },
                        { name: "Burn or Thermal Injury", probability: 45, reasoning: "Skin lesions or discoloration may indicate exposure to heat, chemicals, or fire" }
                    ],
                    category: "Physical Trauma or Injury"
                },
                infection: {
                    conditions: [
                        { name: "Bacterial Infection", probability: 72, reasoning: "Lesions, discharge, and swelling suggest bacterial involvement, possibly from wound contamination" },
                        { name: "Fungal Infection", probability: 55, reasoning: "Skin lesions, hair loss, and crusty areas may indicate fungal disease (such as ringworm or aspergillosis)" },
                        { name: "Viral Disease", probability: 45, reasoning: "Multiple systemic symptoms (lethargy, disorientation, respiratory issues) could indicate viral illness" },
                        { name: "Septicemia", probability: 35, reasoning: "Severe lethargy with fever signs may indicate blood infection (sepsis) from untreated wounds" }
                    ],
                    category: "Possible Infection or Disease"
                },
                neurological: {
                    conditions: [
                        { name: "Head Trauma", probability: 60, reasoning: "Circling, disorientation, and abnormal posture suggest neurological involvement from head injury" },
                        { name: "Poisoning/Toxin Exposure", probability: 50, reasoning: "Neurological symptoms (tremors, seizures, disorientation) can indicate toxin ingestion (pesticides, heavy metals, or toxic plants)" },
                        { name: "Encephalitis/Meningitis", probability: 40, reasoning: "Brain or spinal cord inflammation can cause disorientation, lethargy, and neurological deficits" },
                        { name: "Lead Poisoning", probability: 30, reasoning: "Common in birds near areas with lead exposure (paint, fishing weights, ammunition)" }
                    ],
                    category: "Neurological or Behavioral Indicators"
                },
                metabolic: {
                    conditions: [
                        { name: "Severe Malnutrition", probability: 75, reasoning: "Emaciation, weakness, and visible ribs indicate significant nutritional deficiency" },
                        { name: "Metabolic Bone Disease", probability: 55, reasoning: "Common in captive birds/reptiles with calcium or vitamin D3 deficiency, causing bone weakness" },
                        { name: "Organ Failure (Liver/Kidney)", probability: 45, reasoning: "Chronic illness or toxin exposure can cause organ failure, resulting in emaciation and lethargy" },
                        { name: "Hypoglycemia", probability: 40, reasoning: "Low blood sugar can cause weakness, disorientation, and trembling" }
                    ],
                    category: "Nutritional or Metabolic Concerns"
                },
                parasitic: {
                    conditions: [
                        { name: "External Parasite Infestation", probability: 80, reasoning: "Visible parasites (ticks, fleas) and scratching confirm infestation" },
                        { name: "Internal Parasite Load", probability: 60, reasoning: "Weight loss despite feeding, lethargy, and diarrhea suggest internal parasites (worms, protozoa)" },
                        { name: "Mite/Lice Infestation", probability: 70, reasoning: "Common cause of feather/hair loss, skin irritation, and scratching" },
                        { name: "Tick-Borne Disease", probability: 45, reasoning: "Ticks can transmit various diseases (Lyme disease, ehrlichiosis, babesiosis)" }
                    ],
                    category: "Parasitic Infestation"
                },
                respiratory: {
                    conditions: [
                        { name: "Respiratory Infection", probability: 78, reasoning: "Labored breathing and discharge indicate respiratory issue (bacterial, viral, or fungal)" },
                        { name: "Pneumonia", probability: 55, reasoning: "Severe breathing difficulty, cough, and discharge may indicate lung infection" },
                        { name: "Air Sac Disease (Birds)", probability: 50, reasoning: "Specific to avian species, causing respiratory distress and air sac inflammation" },
                        { name: "Aspergillosis (Fungal)", probability: 40, reasoning: "Common fungal respiratory disease in birds, affecting air sacs and lungs" }
                    ],
                    category: "Respiratory Condition"
                },
                environmental: {
                    conditions: [
                        { name: "Hypothermia", probability: 65, reasoning: "Cold to touch with lethargy suggests exposure to extreme cold temperatures" },
                        { name: "Heat Stroke", probability: 50, reasoning: "Overheating can cause disorientation, lethargy, and neurological symptoms" },
                        { name: "Dehydration", probability: 75, reasoning: "Sunken eyes, lethargy, and dry mucous membranes indicate dehydration" },
                        { name: "Capture Myopathy", probability: 45, reasoning: "Stress-induced muscle damage from handling or capture, causing weakness and immobility" }
                    ],
                    category: "Environmental Stress Factors"
                },
                reproductive: {
                    conditions: [
                        { name: "Egg Binding", probability: 60, reasoning: "Abnormal posture, lethargy, and straining in female birds suggest egg binding" },
                        { name: "Reproductive Tumor", probability: 45, reasoning: "Swelling, lethargy, and abnormal behavior may indicate reproductive system tumor" },
                        { name: "Mating-Related Injury", probability: 50, reasoning: "Wounds or trauma in genital area suggest injury during mating" }
                    ],
                    category: "Reproductive System Concerns"
                },
                dermatological: {
                    conditions: [
                        { name: "Allergic Reaction", probability: 55, reasoning: "Rashes, itching, and skin inflammation may indicate allergic reaction to food, environment, or parasites" },
                        { name: "Skin Cancer", probability: 35, reasoning: "Persistent skin lesions, especially in sun-exposed areas, may indicate skin cancer" },
                        { name: "Autoimmune Skin Disease", probability: 40, reasoning: "Chronic skin lesions, hair loss, and inflammation may indicate autoimmune condition" }
                    ],
                    category: "Dermatological Conditions"
                }
            };

            // Map symptoms to categories
            const categories = [];
            const symptomCategoryMap = {
                'wounds': 'trauma', 'bleeding': 'trauma', 'broken_limbs': 'trauma',
                'wing_damage': 'trauma', 'swelling': 'trauma', 'lacerations': 'trauma',
                'limping': 'trauma', 'immobility': 'trauma', 'abnormal_gait': 'trauma',
                'lesions': 'infection', 'discharge': 'infection', 'scratching': 'parasitic',
                'hair_loss': 'parasitic', 'fever': 'infection',
                'circling': 'neurological', 'disorientation': 'neurological',
                'no_response': 'neurological', 'tremors': 'neurological',
                'emaciation': 'metabolic', 'lethargy': 'metabolic', 'weakness': 'metabolic',
                'labored_breathing': 'respiratory',
                'parasites': 'parasitic',
                'hypothermia': 'environmental', 'hyperthermia': 'environmental',
                'dehydration': 'environmental',
                'egg_binding': 'reproductive', 'crop_issues': 'reproductive',
                'rashes': 'dermatological', 'feather_plucking': 'dermatological'
            };

            // Identify relevant categories based on symptoms
            const activeCategories = new Set();
            values.forEach(symptom => {
                if (symptomCategoryMap[symptom]) {
                    activeCategories.add(symptomCategoryMap[symptom]);
                }
            });

            // Build assessment results
            const assessedCategories = [];
            activeCategories.forEach(cat => {
                if (differentialDiagnoses[cat]) {
                    // Sort conditions by probability
                    const sortedConditions = differentialDiagnoses[cat].conditions
                        .sort((a, b) => b.probability - a.probability);

                    assessedCategories.push({
                        category: differentialDiagnoses[cat].category,
                        conditions: sortedConditions.slice(0, 3), // Top 3 conditions
                        symptomCount: values.filter(s => symptomCategoryMap[s] === cat).length
                    });
                }
            });

            // Default categories if no specific mapping
            if (assessedCategories.length === 0) {
                if (values.some(v => ['wounds', 'bleeding', 'limping', 'broken_limbs', 'swelling'].includes(v))) {
                    assessedCategories.push({
                        category: "Physical Trauma or Injury",
                        conditions: differentialDiagnoses.trauma.conditions,
                        symptomCount: 3
                    });
                }
                if (values.some(v => ['lesions', 'discharge', 'swelling', 'hair_loss', 'lethargy'].includes(v))) {
                    assessedCategories.push({
                        category: "Possible Infection or Disease",
                        conditions: differentialDiagnoses.infection.conditions,
                        symptomCount: 3
                    });
                }
            }

            // Risk assessment
            const highRisk = ['bleeding', 'broken_limbs', 'immobility', 'difficulty_flying',
                'disorientation', 'circling', 'labored_breathing', 'no_response',
                'hypothermia', 'severe_bleeding'];
            const modRisk = ['wounds', 'swelling', 'limping', 'abnormal_gait', 'hair_loss',
                'lesions', 'emaciation', 'discharge', 'lethargy', 'dehydration'];

            let hasHigh = values.some(v => highRisk.includes(v));
            let hasMod = values.some(v => modRisk.includes(v));

            let risk = {
                level: 'LOW',
                color: '#2ecc71',
                icon: 'fa-check-circle',
                msg: "The observed symptoms suggest minor concerns that should be monitored. If symptoms persist or worsen, consult a wildlife professional."
            };

            if (hasHigh) {
                risk = {
                    level: 'HIGH',
                    color: '#e74c3c',
                    icon: 'fa-exclamation-triangle',
                    msg: "URGENT: The observed symptoms suggest the animal requires immediate professional intervention. Contact a wildlife emergency hotline or veterinarian immediately."
                };
            } else if (hasMod) {
                risk = {
                    level: 'MODERATE',
                    color: '#f1c40f',
                    icon: 'fa-exclamation-circle',
                    msg: "The combination of symptoms indicates the animal may require professional evaluation. Contact a wildlife veterinarian or rehabilitation center within 24-48 hours."
                };
            }

            return {
                categories: assessedCategories,
                risk,
                symptomCount: values.length,
                timestamp: new Date().toISOString()
            };
        }

        function renderHealthResults(box, assessment) {
            box.innerHTML = `
                <div class="assessment-container">
                    <h3><i class="fas fa-notes-medical"></i> HEALTH AWARENESS ASSESSMENT</h3>
                    
                    <div class="risk-indicator" style="background: ${assessment.risk.color}22; border-left: 5px solid ${assessment.risk.color}; padding: 1rem; margin: 1rem 0;">
                        <h4 style="color: ${assessment.risk.color};"><i class="fas ${assessment.risk.icon}"></i> RISK LEVEL: ${assessment.risk.level}</h4>
                        <p>${assessment.risk.msg}</p>
                    </div>

                    <div class="symptom-summary" style="margin: 1rem 0; padding: 0.5rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
                        <span style="font-size: 0.85rem;"><i class="fas fa-clipboard-list"></i> Symptoms Analyzed: ${assessment.symptomCount}</span>
                    </div>

                    <div class="differential-diagnoses">
                        <h4 style="margin-bottom: 1rem;"><i class="fas fa-list-ol"></i> Differential Diagnoses (Ranked by Probability)</h4>
                        ${assessment.categories.length > 0 ? assessment.categories.map(cat => `
                            <div class="diagnosis-category glass-card" style="margin-bottom: 1.5rem; padding: 1rem; background: rgba(255,255,255,0.03);">
                                <h5 style="color: var(--primary-green); margin-bottom: 1rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.5rem;">
                                    ${cat.category} (${cat.symptomCount} matching symptoms)
                                </h5>
                                <div class="conditions-list">
                                    ${cat.conditions.map((condition, idx) => `
                                        <div class="condition-item" style="display: flex; align-items: flex-start; margin-bottom: 0.8rem; padding: 0.5rem; background: rgba(255,255,255,0.02); border-radius: 6px;">
                                            <span style="background: ${getProbabilityColor(condition.probability)}; color: #000; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 700; min-width: 45px; text-align: center; margin-right: 10px; margin-top: 2px;">
                                                ${idx + 1}. ${condition.probability}%
                                            </span>
                                            <div>
                                                <strong>${condition.name}</strong>
                                                <p style="font-size: 0.8rem; opacity: 0.8; margin-top: 2px;">${condition.reasoning}</p>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('') : `
                            <div class="glass-card" style="padding: 1rem; text-align: center; opacity: 0.7;">
                                <p>No specific condition patterns identified. General observation recommended.</p>
                            </div>
                        `}
                    </div>

                    <div class="environmental-factors glass-card" style="margin-top: 1.5rem; padding: 1rem; background: rgba(52, 152, 219, 0.1); border-left: 4px solid #3498db;">
                        <h5 style="color: #3498db; margin-bottom: 0.5rem;"><i class="fas fa-leaf"></i> Environmental Context</h5>
                        <p style="font-size: 0.85rem; opacity: 0.9;">Consider environmental factors: Weather conditions, presence of predators, human activity, food/water availability, and recent disturbances in the area may influence the animal's condition.</p>
                    </div>

                    <div class="disclaimer-academic" style="font-size: 0.75rem; opacity: 0.7; border-top: 1px solid var(--glass-border); padding-top: 1rem; margin-top: 1rem;">
                        ⚠️ <strong>MEDICAL DISCLAIMER:</strong> This information is for awareness purposes only and does NOT constitute veterinary diagnosis or treatment. Only licensed wildlife professionals can accurately diagnose and treat animal health conditions. The probability rankings are estimates based on symptom combinations and should not be used as definitive diagnoses.
                    </div>

                    <div class="action-buttons" style="margin-top: 2rem; border-top: 1px solid var(--glass-border); padding-top: 1.5rem;">
                        <button id="go-safety" class="primary-btn">Get Management & Safety Guidance <i class="fas fa-shield-alt"></i></button>
                    </div>
                </div>
            `;
            box.style.display = 'block';
            box.scrollIntoView({ behavior: 'smooth' });

            document.getElementById('go-safety').addEventListener('click', () => {
                nextStep();
            });
        }

        function getProbabilityColor(probability) {
            if (probability >= 70) return '#2ecc71'; // Green - High probability
            if (probability >= 50) return '#f1c40f';  // Yellow - Moderate
            return '#e67e22';                         // Orange - Lower
        }
    }
};
