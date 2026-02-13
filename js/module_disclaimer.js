const ModuleDisclaimer = {
    render: (container) => {
        container.innerHTML = `
            <div class="disclaimer-screen animated fadeIn" style="text-align: center;">
                <div class="glass-card" style="padding: 2rem; border-top: 5px solid var(--risk-high); text-align: left; max-width: 900px; margin: 0 auto;">
                    <h2 style="text-align: center; border-bottom: 2px solid var(--glass-border); padding-bottom: 1rem; margin-bottom: 2rem;">
                        <i class="fas fa-file-contract"></i> Step 6: Disclaimer & Awareness Notice<br>
                        ════════════════════════════════
                    </h2>

                    <div class="disclaimer-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div class="disc-section">
                            <h4>📚 EDUCATIONAL PURPOSE ONLY</h4>
                            <p style="font-size: 0.85rem; opacity: 0.9;">This system is designed exclusively for environmental education and wildlife awareness. All information provided is intended to support learning, observation, and informed decision-making—NOT to replace professional wildlife management, veterinary, or legal services.</p>
                        </div>
                        <div class="disc-section">
                            <h4>⚠️ NOT A DIAGNOSTIC OR TREATMENT SYSTEM</h4>
                            <p style="font-size: 0.85rem; opacity: 0.9;">This AI does NOT diagnose diseases, prescribe treatments, or provide medical advice for animals. The 'Health Awareness Module' maps observable symptoms to general awareness categories ONLY, helping users recognize when professional evaluation is needed. Only licensed wildlife veterinarians can diagnose and treat animal health conditions.</p>
                        </div>
                        <div class="disc-section">
                            <h4>👨‍⚕️ PROFESSIONAL CONSULTATION REQUIRED</h4>
                            <p style="font-size: 0.85rem; opacity: 0.9;">For any animal showing signs of injury, illness, or distress: Contact licensed wildlife rehabilitators immediately, consult wildlife veterinarians, reach out to Forest Department, or call wildlife emergency hotlines. This system provides interim guidance ONLY while you await professional help.</p>
                        </div>
                        <div class="disc-section">
                            <h4>🔍 IDENTIFICATION ACCURACY LIMITATIONS</h4>
                            <p style="font-size: 0.85rem; opacity: 0.9;">Species identification is based on visible image features and may not be 100% accurate due to image quality, lighting, angle limitations, similar-looking species, or partial visibility. Always cross-reference identifications when accuracy is critical.</p>
                        </div>
                        <div class="disc-section">
                            <h4>🛡️ USER SAFETY RESPONSIBILITY</h4>
                            <p style="font-size: 0.85rem; opacity: 0.9;">Interacting with wild animals carries inherent risks including physical injury, disease transmission, and legal consequences. Users assume full responsibility for their safety and legal compliance. When in doubt, maintain distance and contact professionals.</p>
                        </div>
                        <div class="disc-section">
                            <h4>⚖️ WILDLIFE PROTECTION LAWS</h4>
                            <p style="font-size: 0.85rem; opacity: 0.9;">Many species are legally protected. Unauthorized handling or harm is illegal. This system does not provide legal advice—consult Forest Department or legal experts regarding wildlife law compliance.</p>
                        </div>
                        <div class="disc-section">
                            <h4>⚠️ NO GUARANTEES OR WARRANTIES</h4>
                            <p style="font-size: 0.85rem; opacity: 0.9;">This system makes NO GUARANTEES regarding identification accuracy, outcomes of following guidance, or animal survival. Information is provided "AS IS" for educational awareness.</p>
                        </div>
                        <div class="disc-section">
                            <h4>🌍 ETHICAL WILDLIFE INTERACTION</h4>
                            <p style="font-size: 0.85rem; opacity: 0.9;">This system promotes respectful observation, non-invasive appreciation, and conservation. We discourage harassment, illegal capture, habitat destruction, and exploitation. Use this knowledge to foster environmental stewardship.</p>
                        </div>
                    </div>

                    <div class="final-info" style="margin-top: 2rem; padding-top: 2rem; border-top: 2px solid var(--glass-border); text-align: center;">
                        <p>📧 QUESTIONS OR CONCERNS? | [Academic Project Team Contact]</p>
                        <p style="font-size: 0.8rem; opacity: 0.6; margin-top: 0.5rem;">Academic EVS Project | © 2026 AI Wildlife Awareness System</p>
                        <p style="font-size: 1.2rem; font-weight: 700; margin-top: 2rem; color: var(--primary-green);">════════════════════════════════</p>
                    </div>

                    <div class="action-buttons" style="margin-top: 2rem; text-align: center;">
                        <button onclick="location.reload()" class="primary-btn"><i class="fas fa-redo"></i> Finalize & Reset Analysis Session</button>
                    </div>
                </div>
            </div>
        `;
    }
};
