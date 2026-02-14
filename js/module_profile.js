const ModuleProfile = {
    render: (container) => {
        const species = AppState.identifiedSpecies;

        // Generate seasonal variations HTML if available
        const seasonalHTML = species.seasonalVariations ? `
            <div class="seasonal-variations glass-card" style="margin-top: 1.5rem; padding: 1.5rem; background: rgba(155, 89, 182, 0.1); border-left: 4px solid #9b59b6;">
                <h3><i class="fas fa-cloud-sun"></i> Seasonal Variations & Adaptations</h3>
                <div class="seasonal-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 1rem;">
                    ${Object.entries(species.seasonalVariations).map(([season, description]) => `
                        <div class="season-item" style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px;">
                            <strong style="color: #9b59b6; text-transform: capitalize;">${season}</strong>
                            <p style="font-size: 0.85rem; margin-top: 0.5rem; opacity: 0.9;">${description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '';

        container.innerHTML = `
            <div class="profile-screen animated fadeIn">
                <div class="profile-header" style="text-align: center; margin-bottom: 2rem;">
                    <h2><i class="fas fa-paw"></i> Step 3: Animal Profile & Ecological Role</h2>
                    <div class="species-badge" style="display: inline-block; padding: 10px 20px; background: rgba(46,204,113,0.2); border-radius: 15px; margin-top: 1rem;">
                        <h1 style="color: var(--primary-green); margin: 0;">${species.commonName}</h1>
                        <p style="font-style: italic; opacity: 0.7; margin: 0;">${species.scientificName}</p>
                    </div>
                    
                    ${species.taxonomy && typeof species.taxonomy === 'object' ? `
                    <div class="taxonomy-info glass-card" style="margin-top: 1.5rem; padding: 1rem; background: rgba(52, 152, 219, 0.1); border-left: 4px solid #3498db; display: inline-block;">
                        <h4 style="color: #3498db; margin-bottom: 0.5rem;"><i class="fas fa-book"></i> Taxonomic Classification</h4>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; font-size: 0.85rem;">
                            <div><strong>Kingdom:</strong> ${species.taxonomy.kingdom}</div>
                            <div><strong>Phylum:</strong> ${species.taxonomy.phylum}</div>
                            <div><strong>Class:</strong> ${species.taxonomy.class}</div>
                            <div><strong>Order:</strong> ${species.taxonomy.order}</div>
                            <div><strong>Family:</strong> ${species.taxonomy.family}</div>
                            <div><strong>Genus:</strong> ${species.taxonomy.genus}</div>
                            <div style="grid-column: span 2;"><strong>Species:</strong> ${species.taxonomy.species}</div>
                            ${species.taxonomy.subspecies ? `<div style="grid-column: span 2;"><strong>Subspecies:</strong> ${species.taxonomy.subspecies}</div>` : ''}
                        </div>
                    </div>
                    ` : `<div class="taxonomy-info glass-card" style="margin-top: 1.5rem; padding: 1rem; background: rgba(52, 152, 219, 0.1); border-left: 4px solid #3498db; display: inline-block;">
                        <h4 style="color: #3498db; margin-bottom: 0.5rem;"><i class="fas fa-book"></i> Taxonomic Classification</h4>
                        <p style="font-size: 0.85rem;">${species.taxonomy}</p>
                    </div>`}
                </div>

                <div class="profile-grid">
                    <div class="grid-item">
                        <h3><i class="fas fa-users"></i> Habits & Behavior</h3>
                        <p>${species.behavior}</p>
                    </div>
                    
                    <div class="grid-item">
                        <h3><i class="fas fa-utensils"></i> Diet & Feeding</h3>
                        <p>${species.diet}</p>
                    </div>

                    ${species.biometrics ? `
                    <div class="grid-item tech-dossier" style="background: rgba(52, 152, 219, 0.1); border: 1px solid rgba(52, 152, 219, 0.3);">
                        <h3><i class="fas fa-microscope"></i> Scientific Biometrics</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 5px;">
                            <div><strong>Mass:</strong> ${species.biometrics.massRange}</div>
                            <div><strong>Lifespan:</strong> ${species.biometrics.lifespan}</div>
                            <div style="grid-column: span 2;"><strong>Dimensions:</strong> ${species.biometrics.dimensions}</div>
                            <div style="grid-column: span 2;"><strong>Trophic Level:</strong> <span style="color: #3498db; font-weight: bold;">${species.trophicLevel || 'Not Classified'}</span></div>
                        </div>
                    </div>
                    ` : ''}

                    ${species.threatDossier ? `
                    <div class="grid-item threat-map" style="background: rgba(231, 76, 60, 0.1); border: 1px solid rgba(231, 76, 60, 0.3);">
                        <h3><i class="fas fa-biohazard"></i> Conservation Threat Dossier</h3>
                        <p><strong>Security Status:</strong> <span style="color: #e74c3c;">${species.threatDossier.status}</span></p>
                        <p style="font-size: 0.8rem; margin-top: 5px; color: #e74c3c;">Primary Risks: ${species.threatDossier.primaryThreats.join(', ')}</p>
                        <p style="font-size: 0.8rem; margin-top: 5px; opacity: 0.8;">Protocol: ${species.threatDossier.protectionLevel}</p>
                    </div>
                    ` : `
                    <div class="grid-item">
                        <h3><i class="fas fa-tree"></i> Habitat & Ecosystem</h3>
                        <p>${species.habitat}</p>
                        <div class="status-tag">Status: ${species.status}</div>
                    </div>
                    `}
                </div>

                ${seasonalHTML}

                <div class="evs-box glass-card" style="margin-top: 2rem; border-left: 4px solid var(--primary-green);">
                    <h4><i class="fas fa-graduation-cap"></i> EVS Curriculum Alignment</h4>
                    <p style="font-size: 0.9rem; opacity: 0.8;">Connects to: ${species.evsAlignment || 'Biodiversity Studies'}</p>
                </div>

                ${species.status && species.status.includes('Endangered') || species.status.includes('Vulnerable') || species.status.includes('Critically') ? `
                <div class="conservation-box glass-card" style="margin-top: 2rem; border-left: 4px solid #e74c3c;">
                    <h4><i class="fas fa-shield-alt"></i> Conservation Status & Actions</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 1rem;">
                        <div>
                            <strong>Current Status:</strong>
                            <p style="color: #e74c3c; font-size: 1.1rem;">${species.status}</p>
                        </div>
                        <div>
                            <strong>Protection Level:</strong>
                            <p style="font-size: 0.9rem;">${species.threatDossier ? species.threatDossier.protectionLevel : 'High Priority'}</p>
                        </div>
                    </div>
                    ${species.threatDossier ? `
                    <div style="margin-top: 1rem;">
                        <strong>Primary Threats:</strong>
                        <ul style="margin-top: 0.5rem; font-size: 0.9rem;">
                            ${species.threatDossier.primaryThreats.map(threat => `<li>${threat}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    <div style="margin-top: 1rem; padding: 1rem; background: rgba(231, 76, 60, 0.1); border-radius: 8px;">
                        <strong>Conservation Recommendations:</strong>
                        <ul style="margin-top: 0.5rem; font-size: 0.9rem;">
                            <li>Support habitat protection initiatives</li>
                            <li>Avoid buying products made from endangered species</li>
                            <li>Report illegal wildlife trade</li>
                            <li>Participate in conservation awareness programs</li>
                            <li>Support organizations working to protect this species</li>
                        </ul>
                    </div>
                </div>
                ` : `
                <div class="conservation-box glass-card" style="margin-top: 2rem; border-left: 4px solid var(--primary-green);">
                    <h4><i class="fas fa-check-circle"></i> Conservation Status & Actions</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 1rem;">
                        <div>
                            <strong>Current Status:</strong>
                            <p style="color: var(--primary-green); font-size: 1.1rem;">${species.status}</p>
                        </div>
                        <div>
                            <strong>Protection Level:</strong>
                            <p style="font-size: 0.9rem;">Least Concern</p>
                        </div>
                    </div>
                    <div style="margin-top: 1rem; padding: 1rem; background: rgba(46, 204, 113, 0.1); border-radius: 8px;">
                        <strong>Conservation Recommendations:</strong>
                        <ul style="margin-top: 0.5rem; font-size: 0.9rem;">
                            <li>Maintain natural habitats and ecosystems</li>
                            <li>Prevent habitat fragmentation</li>
                            <li>Support sustainable land use practices</li>
                            <li>Educate others about biodiversity conservation</li>
                            <li>Report any threats to wildlife populations</li>
                        </ul>
                    </div>
                </div>
                `}

                <div class="action-buttons" style="margin-top: 2.5rem; text-align: center;">
                    <button id="check-health" class="primary-btn">Begin Health Awareness Check <i class="fas fa-heartbeat"></i></button>
                </div>
            </div>
        `;

        document.getElementById('check-health').addEventListener('click', () => {
            nextStep();
        });
    }
};
