// Main App State
const AppState = {
    currentStep: 0,
    uploadedImage: null,
    identifiedSpecies: null,
    selectedSymptoms: [],
    riskAssessment: null,
    speciesData: null
};

// DOM Elements
const appContainer = document.getElementById('active-module-content');
const stepIndicators = document.querySelectorAll('.step');
const footer = document.getElementById('main-footer');

// Initialize App
document.addEventListener('DOMContentLoaded', async () => {
    // Load species data
    try {
        const response = await fetch('data/species_data.json');
        AppState.speciesData = await response.json();
    } catch (error) {
        console.error("Failed to load species data:", error);
    }

    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            AppState.currentStep = 0;
            renderModule();
        });
    }
});

// Update Step Indicator
function updateStepIndicator() {
    stepIndicators.forEach((step, index) => {
        step.classList.toggle('active', index === AppState.currentStep);
        step.classList.toggle('completed', index < AppState.currentStep);
    });
}

const navHome = document.getElementById('nav-home');
const navTraining = document.getElementById('nav-training');

if (navHome) {
    navHome.addEventListener('click', () => {
        // RESET STATE for fresh upload
        AppState.currentStep = 0;
        AppState.uploadedImage = null;
        AppState.identifiedSpecies = null;
        AppState.selectedSymptoms = [];

        navHome.classList.add('active');
        renderModule();
    });
}

// Render the active module
function renderModule() {
    // Clear current content
    appContainer.innerHTML = '';

    // Render Current Module
    const modules = [
        ModuleUpload,
        ModuleIdentification,
        ModuleProfile,
        ModuleHealth,
        ModuleSafety,
        ModuleDisclaimer
    ];

    const currentModule = modules[AppState.currentStep];
    if (currentModule) {
        currentModule.render(appContainer);

        // Add back button to all modules except first (upload)
        if (AppState.currentStep > 0) {
            const moduleContent = appContainer.querySelector('.upload-screen, .analysis-screen, .profile-screen, .health-screen, .safety-screen, .disclaimer-screen');
            if (moduleContent) {
                const backBtn = createBackButton();
                moduleContent.insertBefore(backBtn, moduleContent.firstChild);
            }
        }

        updateStepIndicator();
    }

    // Show/hide step indicator
    const indicator = document.querySelector('.step-indicator');
    if (indicator) {
        if (AppState.currentStep >= 0 && AppState.currentStep <= 5) {
            indicator.style.display = 'flex';
            updateStepIndicator();
        } else {
            indicator.style.display = 'none';
        }
    }
}

// Global state transition function
function nextStep() {
    if (AppState.currentStep < 5) {
        AppState.currentStep++;
        renderModule();
    }
}

// Helper function to create back button
function createBackButton(targetStep = null) {
    const backBtn = document.createElement('button');
    backBtn.className = 'back-button';
    backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Back';
    backBtn.addEventListener('click', () => {
        if (targetStep !== null) {
            AppState.currentStep = targetStep;
        } else {
            AppState.currentStep = Math.max(0, AppState.currentStep - 1);
        }
        renderModule();
    });
    return backBtn;
}

// Helper to add back button to module
function addBackButton(container, targetStep = null) {
    const existingBack = container.querySelector('.back-button');
    if (existingBack) return; // Don't add if already exists

    const backBtn = createBackButton(targetStep);
    const firstChild = container.firstChild;
    container.insertBefore(backBtn, firstChild);
}
