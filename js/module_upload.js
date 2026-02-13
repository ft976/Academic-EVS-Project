const ModuleUpload = {
    render: (container) => {
        container.innerHTML = `
            <div class="upload-screen">
                <h2><i class="fas fa-camera"></i> Step 1: Upload Wildlife Image</h2>
                <p>Upload a clear photograph of the animal for AI species identification and health awareness analysis.</p>
                
                <div class="upload-zone" id="drop-zone">
                    <i class="fas fa-cloud-upload-alt" style="font-size: 3rem; color: var(--primary-green); margin-bottom: 1rem;"></i>
                    <p>Drag and drop image here or <strong>browse files</strong></p>
                    <input type="file" id="file-input" accept="image/*" style="display: none;">
                </div>
                
                <div id="upload-preview" class="preview-container" style="display: none;">
                    <div class="image-frame">
                        <img id="img-preview" class="preview-image">
                    </div>
                    <div id="image-quality-feedback" class="quality-feedback" style="display: none;"></div>
                    <div class="action-buttons" style="margin-top: 1.5rem; display: flex; gap: 15px; justify-content: center;">
                        <button id="change-image" class="secondary-btn" style="padding: 1.2rem 2rem;"><i class="fas fa-undo"></i> Try Another</button>
                        <button id="confirm-upload" class="primary-btn">Analyze Image <i class="fas fa-microscope"></i></button>
                    </div>
                </div>
                
                <div class="validation-info" style="margin-top: 2rem; font-size: 0.8rem; color: rgba(255,255,255,0.5);">
                    <p>Supported: JPG, PNG, WEBP | Max Size: 10MB | Resolution: Min 800x600 recommended</p>
                    <p style="margin-top: 0.5rem;"><i class="fas fa-lightbulb"></i> For best results: Ensure good lighting, clear view of animal, minimal obstruction, and focus on distinctive features</p>
                </div>
            </div>
        `;

        const dropZone = document.getElementById('drop-zone');
        const fileInput = document.getElementById('file-input');
        const previewContainer = document.getElementById('upload-preview');
        const imgPreview = document.getElementById('img-preview');
        const confirmBtn = document.getElementById('confirm-upload');
        const changeBtn = document.getElementById('change-image');
        const qualityFeedback = document.getElementById('image-quality-feedback');

        dropZone.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) handleFile(file);
        });

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.style.background = 'rgba(0, 242, 96, 0.05)';
            dropZone.style.borderColor = 'var(--primary-green)';
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.style.background = 'transparent';
            dropZone.style.borderColor = 'var(--glass-border)';
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.style.background = 'transparent';
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
        });

        function handleFile(file) {
            if (!file.type.startsWith('image/')) {
                alert("Please upload a valid image file.");
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                alert("File size exceeds 10MB limit.");
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                AppState.uploadedImage = e.target.result;
                imgPreview.src = e.target.result;
                previewContainer.style.display = 'block';
                dropZone.style.display = 'none';

                // Perform image quality assessment
                assessImageQuality(imgPreview, qualityFeedback);
            };
            reader.readAsDataURL(file);
        }

        function resetUpload() {
            AppState.uploadedImage = null;
            imgPreview.src = '';
            previewContainer.style.display = 'none';
            dropZone.style.display = 'block';
            dropZone.style.borderColor = 'var(--glass-border)';
            fileInput.value = ''; // Clear file input
        }

        function assessImageQuality(img, feedbackContainer) {
            feedbackContainer.style.display = 'block';
            feedbackContainer.className = 'quality-feedback glass-card';

            // Simulated quality assessment (in real app, would use AI analysis)
            const qualityChecks = [
                { name: 'Resolution Check', icon: 'fa-expand', status: 'checking' },
                { name: 'Lighting Assessment', icon: 'fa-sun', status: 'checking' },
                { name: 'Focus Quality', icon: 'fa-eye', status: 'checking' },
                { name: 'Angle Analysis', icon: 'fa-angle-right', status: 'checking' },
                { name: 'Visibility Score', icon: 'fa-search', status: 'checking' }
            ];

            feedbackContainer.innerHTML = `
                <h4 style="margin-bottom: 1rem;"><i class="fas fa-analysis"></i> Image Quality Assessment</h4>
                <div class="quality-checks">
                    ${qualityChecks.map(check => `
                        <div class="quality-item" id="quality-${check.name.replace(/\s+/g, '-').toLowerCase()}">
                            <i class="fas ${check.icon}"></i>
                            <span>${check.name}</span>
                            <span class="quality-status">Analyzing...</span>
                        </div>
                    `).join('')}
                </div>
                <div id="overall-quality" class="overall-quality" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--glass-border); display: none;">
                    <div class="quality-score" style="text-align: center;">
                        <span style="font-size: 2rem; font-weight: 700;" id="score-value">--</span>
                        <p style="font-size: 0.9rem; opacity: 0.8;">Overall Quality Score</p>
                    </div>
                    <div class="quality-recommendation" id="quality-recommendation" style="margin-top: 1rem; font-size: 0.85rem;"></div>
                </div>
            `;

            // Simulate quality assessment process
            setTimeout(() => {
                const qualityResults = [
                    { name: 'Resolution Check', result: 'Good', color: '#2ecc71' },
                    { name: 'Lighting Assessment', result: 'Acceptable', color: '#f1c40f' },
                    { name: 'Focus Quality', result: 'Good', color: '#2ecc71' },
                    { name: 'Angle Analysis', result: 'Good', color: '#2ecc71' },
                    { name: 'Visibility Score', result: 'Acceptable', color: '#f1c40f' }
                ];

                let goodCount = 0;
                qualityResults.forEach((result, index) => {
                    setTimeout(() => {
                        const item = document.getElementById(`quality-${result.name.replace(/\s+/g, '-').toLowerCase()}`);
                        if (item) {
                            item.querySelector('.quality-status').innerHTML = `<span style="color: ${result.color}; font-weight: 600;">${result.result}</span>`;
                        }
                        if (result.color === '#2ecc71') goodCount++;
                    }, index * 400);
                });

                setTimeout(() => {
                    const overall = document.getElementById('overall-quality');
                    const scoreValue = document.getElementById('score-value');
                    const recommendation = document.getElementById('quality-recommendation');

                    overall.style.display = 'block';
                    const qualityScore = Math.round((goodCount / 5) * 100);
                    scoreValue.innerText = qualityScore + '%';
                    scoreValue.style.color = qualityScore >= 80 ? '#2ecc71' : qualityScore >= 60 ? '#f1c40f' : '#e74c3c';

                    if (qualityScore >= 80) {
                        recommendation.innerHTML = `<p style="color: #2ecc71;"><i class="fas fa-check-circle"></i> Excellent image quality. Proceed with analysis.</p>`;
                    } else if (qualityScore >= 60) {
                        recommendation.innerHTML = `<p style="color: #f1c40f;"><i class="fas fa-exclamation-circle"></i> Acceptable quality. Some features may be less accurate. Analysis recommended.</p>`;
                    } else {
                        recommendation.innerHTML = `<p style="color: #e74c3c;"><i class="fas fa-exclamation-triangle"></i> Low quality detected. Consider uploading a clearer image for better identification accuracy.</p>`;
                    }
                }, 2500);
            }, 500);
        }

        confirmBtn.addEventListener('click', () => {
            nextStep();
        });
    }
};
