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
                    
                    <div class="grid-item">
                        <h3><i class="fas fa-heart"></i> Nature & Temperament</h3>
                        <p>${species.nature}</p>
                    </div>
                    
                    <div class="grid-item">
                        <h3><i class="fas fa-tree"></i> Habitat & Ecosystem</h3>
                        <p>${species.habitat}</p>
                        <div class="status-tag">
                            Status: ${species.status}
                        </div>
                    </div>
                </div>

                ${seasonalHTML}

                <div class="evs-box glass-card" style="margin-top: 2rem; border-left: 4px solid var(--primary-green);">
                    <h4><i class="fas fa-graduation-cap"></i> EVS Curriculum Alignment</h4>
                    <p style="font-size: 0.9rem; opacity: 0.8;">Connects to: ${species.evsAlignment}</p>
                </div>

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
