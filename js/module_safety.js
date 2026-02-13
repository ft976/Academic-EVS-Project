const ModuleSafety = {
    render: (container) => {
        const assessment = AppState.riskAssessment;
        const species = AppState.identifiedSpecies;

        container.innerHTML = `
            <div class="safety-screen animated fadeIn" style="text-align: left;">
                <h2><i class="fas fa-shield-alt"></i> Step 5: Management & Safety Guidance</h2>
                
                <div class="urgency-banner" style="background: ${assessment.risk.color}; color: #000; padding: 15px 20px; border-radius: 8px; font-weight: 700; margin-bottom: 2rem; border: 2px solid rgba(0,0,0,0.1);">
                    URGENCY LEVEL: ${assessment.risk.level} - ${assessment.risk.level === 'HIGH' ? 'Immediate Professional Contact Required' : 'Contact Professional for Evaluation'}
                </div>

                <div class="guidance-grid" style="display: grid; grid-template-columns: 1fr; gap: 20px;">
                    
                    <!-- Handling Guidance -->
                    <section class="glass-card" style="padding: 1.5rem; background: rgba(255,255,255,0.05);">
                        <h3><i class="fas fa-hand-holding-heart"></i> Safe Handling Instructions</h3>
                        <p style="color: var(--risk-high); font-weight: 600;">⚠️ DEFAULT: Do not handle wild animals unless directed by wildlife professionals.</p>
                        
                        <div class="species-protocol" style="margin-top: 1rem; padding: 1rem; background: rgba(255,255,255,0.03); border-radius: 8px;">
                            <strong>Species Type: ${species.group || 'Wild Animal'}</strong>
                            <ul style="margin-left: 20px; margin-top: 5px; font-size: 0.9rem;">
                                <li><strong>Technique:</strong> ${getHandlingTechnique(species.group)}</li>
                                <li><strong>Safety Gear:</strong> ${getSafetyGear(species.group)}</li>
                                <li><strong>Warning:</strong> ${getHandlingWarning(species.group)}</li>
                            </ul>
                        </div>

                        <div class="universal-rules" style="margin-top: 1.5rem;">
                            <strong>Universal Safety Rules:</strong>
                            <ul style="margin-left: 20px; font-size: 0.85rem; display: grid; grid-template-columns: 1fr 1fr; gap: 5px; margin-top: 5px;">
                                <li>• Assume animals carry disease</li>
                                <li>• Never handle with bare hands</li>
                                <li>• Minimize handling time</li>
                                <li>• Keep face away from head</li>
                                <li>• Work in well-ventilated area</li>
                                <li>• Wash hands thoroughly after</li>
                            </ul>
                        </div>
                    </section>

                    <!-- Temporary Care -->
                    <section class="glass-card" style="padding: 1.5rem; background: rgba(255,255,255,0.05);">
                        <h3><i class="fas fa-hospital"></i> Temporary Care & Environment</h3>
                        <p style="font-size: 0.8rem; opacity: 0.8; margin-bottom: 1rem;">Interim care (2-4 hours) while awaiting professional rescue.</p>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 0.85rem;">
                            <div>
                                <strong>Containment:</strong>
                                <p>Ventilated box slightly larger than the animal with soft towel bedding (avoid terry cloth).</p>
                            </div>
                            <div>
                                <strong>Environment:</strong>
                                <p>Quiet, dark, warm (75-80°F) location away from pets and humans.</p>
                            </div>
                            <div>
                                <strong>Hydration (Conscious Only):</strong>
                                <p>Provide shallow dish of water. NEVER force-feed or force-water (aspiration risk).</p>
                            </div>
                            <div>
                                <strong>Stress Reduction:</strong>
                                <p>Minimize noise, lights, and handling. Avoid photos with flash or frequent checking.</p>
                            </div>
                        </div>
                    </section>

                    <!-- Do Nots -->
                    <section class="glass-card" style="padding: 1.5rem; background: rgba(231, 76, 60, 0.1); border: 1px solid rgba(231, 76, 60, 0.2);">
                        <h3 style="color: var(--risk-high);"><i class="fas fa-times-circle"></i> CRITICAL DO NOT's</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; font-size: 0.85rem; gap: 10px;">
                            <span>❌ Do NOT feed the animal</span>
                            <span>❌ No water for unconscious ones</span>
                            <span>❌ No medications or bandages</span>
                            <span>❌ Do NOT splint broken bones</span>
                            <span>❌ No parasite removal</span>
                            <span>❌ No release without clearance</span>
                            <span>❌ No photos with flash</span>
                            <span>❌ Do NOT house with pets</span>
                        </div>
                    </section>

                    <!-- Contact Tiers -->
                    <section class="glass-card" style="padding: 1.5rem; border-left: 4px solid #3498db;">
                        <h3><i class="fas fa-phone-alt"></i> Contact Experts Protocol</h3>
                        <div class="contact-tiers" style="font-size: 0.9rem;">
                            <div style="margin-bottom: 0.8rem;">
                                <strong style="color: #e74c3c;">Tier 1: Immediate (Severe/Unconscious)</strong>
                                <p>Call Wildlife SOS: +91-9871963535 or Emergency Vet Clinic</p>
                            </div>
                            <div style="margin-bottom: 0.8rem;">
                                <strong style="color: #f1c40f;">Tier 2: Urgent (Injured but Stable)</strong>
                                <p>Contact local Forest Dept or Wildlife Rehab Center (Same day)</p>
                            </div>
                            <div>
                                <strong style="color: #3498db;">Tier 3: Routine (Inquiries)</strong>
                                <p>Contact local Wildlife NGO or Warden (24-48 hours)</p>
                            </div>
                        </div>
                    </section>

                    <!-- Species Warnings -->
                    <section class="glass-card" style="padding: 1.5rem; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);">
                        <h3><i class="fas fa-exclamation-triangle"></i> Species-Specific Warning</h3>
                        <p style="font-size: 0.9rem;">${getSpeciesWarning(species.safetyType, species.commonName)}</p>
                    </section>
                </div>

                <div class="action-buttons" style="margin-top: 2.5rem; text-align: center;">
                    <button id="finish-report" class="primary-btn">Complete Analysis & View Final Disclaimer <i class="fas fa-file-contract"></i></button>
                </div>
            </div>
        `;

        function getHandlingTechnique(group) {
            const protocols = {
                "Small Mammals": "Gently scoop from underneath using towel or cloth, support entire body.",
                "Birds": "Approach slowly from behind, cover with light towel, secure wings against body gently.",
                "Reptiles": "NEVER handle venomous species. For non-venomous: Support body fully, never grab tail.",
                "Large Mammals": "NOT SAFE FOR PUBLIC HANDLING - DO NOT APPROACH."
            };
            return protocols[group] || "Do not handle. Maintain distance.";
        }

        function getSafetyGear(group) {
            const gear = {
                "Small Mammals": "Thick gloves, long sleeves, eye protection",
                "Birds": "Gloves, towel constant containment",
                "Reptiles": "Snake hook (for snakes), thick gloves",
                "Large Mammals": "NONE (Do Not Approach)"
            };
            return gear[group] || "Thick gloves, protective clothing.";
        }

        function getHandlingWarning(group) {
            const warnings = {
                "Small Mammals": "Risk of bites/scratches, potential rabies carrier, stress fatal.",
                "Birds": "Fragile bones, stress-induced shock common, beak/talon injury risk.",
                "Reptiles": "Venomous risk, bites risk infection, misidentification dangerous.",
                "Large Mammals": "Severe injury risk from kicks, tusks, or charging."
            };
            return warnings[group] || "Personal safety is priority.";
        }

        function getSpeciesWarning(type, name) {
            if (type === 'aggressive') return `🚨 <strong>LEGAL/SAFETY ALERT:</strong> Interacting with ${name} is dangerous and may have legal implications under the Wildlife Protection Act. Contact Forest Department immediately.`;
            if (type === 'shy') return `🍃 <strong>NATURE:</strong> ${name} is extremely stress-prone. Maintain maximum silence and distance to prevent capture-myopathy.`;
            return `🐾 <strong>GENERAL:</strong> Be aware that ${name} can react unpredictably when injured. Always prioritize your safety.`;
        }

        document.getElementById('finish-report').addEventListener('click', () => {
            nextStep();
        });
    }
};
