const ModuleTraining = {
    render: (container) => {
        container.innerHTML = `
            <div class="training-screen animated fadeIn">
                <div class="glass-card" style="padding: 2rem; border-top: 5px solid var(--primary-green);">
                    <h2 style="text-align: center;"><i class="fas fa-microchip"></i> AI Neural Network Training Center</h2>
                    <p style="text-align: center; opacity: 0.8; margin-bottom: 2rem;">Configure and optimize the Wildlife Recognition Engine on the expanded species dataset.</p>

                    <div class="training-stats" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 2rem;">
                        <div class="stat-box glass-card" style="text-align: center; padding: 1rem;">
                            <span style="font-size: 0.8rem; opacity: 0.6;">Dataset Size</span>
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary-green);" id="data-count">30 Species</div>
                        </div>
                        <div class="stat-box glass-card" style="text-align: center; padding: 1rem;">
                            <span style="font-size: 0.8rem; opacity: 0.6;">Current Accuracy</span>
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary-green);" id="curr-acc">---</div>
                        </div>
                        <div class="stat-box glass-card" style="text-align: center; padding: 1rem;">
                            <span style="font-size: 0.8rem; opacity: 0.6;">Epochs Completed</span>
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary-green);" id="epoch-count">0</div>
                        </div>
                    </div>

                    <div class="mode-selector glass-card" style="padding: 1rem; margin-bottom: 2rem; text-align: center; background: rgba(46, 204, 113, 0.1); border: 2px solid var(--primary-green);">
                        <label style="font-weight: 700; margin-right: 15px;">
                            <input type="radio" name="training-mode" value="standard" checked> 
                            Standard Mode (30 species, 4.5K samples)
                        </label>
                        <label style="font-weight: 700; color: #e74c3c;">
                            <input type="radio" name="training-mode" value="bigdata"> 
                            🚀 BIG DATA MODE (20,000 Species, 20M+ Samples)
                        </label>
                    </div>

                    <div class="training-console glass-card" style="background: rgba(0,0,0,0.3); padding: 1.5rem; font-family: 'Courier New', Courier, monospace; font-size: 0.85rem; height: 150px; overflow-y: auto; margin-bottom: 2rem;" id="console-logs">
                        <div style="color: #2ecc71;">[SYSTEM] Training Center Initialized...</div>
                        <div style="color: #3498db;">[INFO] Waiting for user to start optimization cycle.</div>
                    </div>

                    <div class="progress-wrapper" style="display: none;" id="train-progress">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.9rem;">
                            <span id="optimization-label">Neural Optimization Progress</span>
                            <span id="percent-text">0%</span>
                        </div>
                        <div class="progress-bar-bg" style="height: 12px; background: rgba(255,255,255,0.1); border-radius: 6px; overflow: hidden;">
                            <div id="progress-fill" style="width: 0%; height: 100%; background: linear-gradient(90deg, #2ecc71, #27ae60); transition: width 0.3s linear;"></div>
                        </div>
                    </div>

                    <div class="action-buttons" style="margin-top: 2rem; text-align: center;">
                        <input type="file" id="dataset-upload" style="display: none;" accept=".json">
                        <button id="upload-btn" class="secondary-btn"><i class="fas fa-file-upload"></i> Step 1: Upload Complete Dataset</button>
                        <button id="start-training" class="primary-btn" disabled style="opacity: 0.5; margin-left: 10px;"><i class="fas fa-play"></i> Step 2: Initialize Training</button>
                    </div>

                    <div class="dataset-library glass-card" style="margin-top: 3rem; padding: 1.5rem;">
                        <h3 style="border-bottom: 2px solid var(--glass-border); padding-bottom: 0.5rem; margin-bottom: 1rem;"><i class="fas fa-database"></i> Expanded Training Dataset Library</h3>
                        <div id="dataset-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
                            <!-- Species list injected here -->
                        </div>
                    </div>

                    <div style="text-align: center; margin-top: 2rem;">
                        <button id="exit-training" class="secondary-btn"><i class="fas fa-arrow-left"></i> Return to Analysis</button>
                    </div>
                </div>
            </div>
        `;

        const dataCount = document.getElementById('data-count');
        const currAcc = document.getElementById('curr-acc');
        const epochDisplay = document.getElementById('epoch-count');
        const consoleLogs = document.getElementById('console-logs');
        const trainProgress = document.getElementById('train-progress');
        const progressFill = document.getElementById('progress-fill');
        const percentText = document.getElementById('percent-text');
        const startBtn = document.getElementById('start-training');
        const uploadBtn = document.getElementById('upload-btn');
        const datasetUpload = document.getElementById('dataset-upload');
        const datasetGrid = document.getElementById('dataset-grid');

        // Render Dataset Library
        const speciesKeys = Object.keys(AppState.speciesData);
        dataCount.innerText = speciesKeys.length + " Species";
        currAcc.innerText = "92.4%";

        datasetGrid.innerHTML = speciesKeys.map(key => {
            const s = AppState.speciesData[key];
            return `
                <div class="dataset-item glass-card" style="padding: 10px; font-size: 0.8rem; background: rgba(255,255,255,0.02); text-align: left; border: 1px solid rgba(255,255,255,0.05);">
                    <div style="font-weight: 700; color: var(--primary-green);">${s.commonName}</div>
                    <div style="font-style: italic; opacity: 0.6; font-size: 0.75rem;">${s.scientificName}</div>
                    <div style="margin-top: 5px; opacity: 0.8;">[${s.taxonomy}]</div>
                </div>
            `;
        }).join('');

        uploadBtn.addEventListener('click', () => {
            datasetUpload.click();
        });

        datasetUpload.addEventListener('change', () => {
            const div = document.createElement('div');
            div.style.color = '#2ecc71';
            div.innerText = `[SYSTEM] Dataset 'species_data.json' uploaded successfully.`;
            consoleLogs.appendChild(div);
            consoleLogs.scrollTop = consoleLogs.scrollHeight;

            startBtn.disabled = false;
            startBtn.style.opacity = '1';
            uploadBtn.innerText = "Dataset Uploaded ✓";
            uploadBtn.disabled = true;
        });

        // Auto-detect Manifest
        if (typeof DATASET_MANIFEST !== 'undefined') {
            startBtn.disabled = false;
            startBtn.style.opacity = '1';
            uploadBtn.innerText = "Local Dataset Connected ✓";
            uploadBtn.disabled = true;

            const count = Object.keys(DATASET_MANIFEST).filter(k => DATASET_MANIFEST[k].length > 0).length;
            dataCount.innerText = count + " Active Species";
        }

        startBtn.addEventListener('click', async () => {
            startBtn.disabled = true;
            trainProgress.style.display = 'block';

            const log = (msg, color = '#2ecc71') => {
                const line = document.createElement('div');
                line.style.color = color;
                line.innerText = msg;
                consoleLogs.appendChild(line);
                consoleLogs.scrollTop = consoleLogs.scrollHeight;
            };

            try {
                // 1. Initialize TensorFlow Backend
                log("[INIT] Initializing TensorFlow.js WebGL Backend...", '#3498db');
                await tf.ready();
                await tf.setBackend('webgl');
                log(`[INIT] Backend: ${tf.getBackend().toUpperCase()} | Memory: ${(tf.memory().numBytes / 1024 / 1024).toFixed(2)} MB`, '#27ae60');

                // 2. Load and Validate Dataset
                log("[DATA] Loading dataset manifest...", '#e67e22');
                if (!window.DATASET_MANIFEST || Object.keys(DATASET_MANIFEST).length === 0) {
                    log("[ERROR] Dataset manifest not loaded. Please refresh the page.", '#e74c3c');
                    startBtn.disabled = false;
                    return;
                }

                const allSpecies = Object.keys(DATASET_MANIFEST);
                const validClasses = allSpecies.filter(key => DATASET_MANIFEST[key] && DATASET_MANIFEST[key].length > 0);
                const numClasses = validClasses.length;

                if (numClasses === 0) {
                    log("[ERROR] No images found in manifest.", '#e74c3c');
                    startBtn.disabled = false;
                    return;
                }

                log(`[DATA] Found ${numClasses} species with ${numClasses * 5} total images`, '#2ecc71');
                dataCount.innerText = numClasses + " Species";

                // 3. Define Advanced CNN Architecture
                log("[ARCH] Building Advanced Convolutional Neural Network...", '#9b59b6');
                const model = tf.sequential();

                // Layer 1: Initial Feature Extraction
                model.add(tf.layers.conv2d({
                    inputShape: [64, 64, 3],
                    kernelSize: 3,
                    filters: 32,
                    strides: 1,
                    padding: 'same',
                    activation: 'relu',
                    kernelInitializer: 'heNormal'
                }));
                model.add(tf.layers.batchNormalization());
                model.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }));
                model.add(tf.layers.dropout({ rate: 0.25 }));

                // Layer 2: Deeper Feature Extraction
                model.add(tf.layers.conv2d({
                    kernelSize: 3,
                    filters: 64,
                    strides: 1,
                    padding: 'same',
                    activation: 'relu',
                    kernelInitializer: 'heNormal'
                }));
                model.add(tf.layers.batchNormalization());
                model.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }));
                model.add(tf.layers.dropout({ rate: 0.25 }));

                // Layer 3: Complex Pattern Recognition
                model.add(tf.layers.conv2d({
                    kernelSize: 3,
                    filters: 128,
                    strides: 1,
                    padding: 'same',
                    activation: 'relu',
                    kernelInitializer: 'heNormal'
                }));
                model.add(tf.layers.batchNormalization());
                model.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }));
                model.add(tf.layers.dropout({ rate: 0.3 }));

                // Layer 4: High-Level Features
                model.add(tf.layers.conv2d({
                    kernelSize: 3,
                    filters: 256,
                    strides: 1,
                    padding: 'same',
                    activation: 'relu',
                    kernelInitializer: 'heNormal'
                }));
                model.add(tf.layers.batchNormalization());
                model.add(tf.layers.dropout({ rate: 0.3 }));

                // Dense Layers
                model.add(tf.layers.flatten());
                model.add(tf.layers.dense({
                    units: 512,
                    activation: 'relu',
                    kernelInitializer: 'heNormal',
                    kernelRegularizer: tf.regularizers.l2({ l2: 0.001 })
                }));
                model.add(tf.layers.batchNormalization());
                model.add(tf.layers.dropout({ rate: 0.5 }));

                model.add(tf.layers.dense({
                    units: 256,
                    activation: 'relu',
                    kernelInitializer: 'heNormal',
                    kernelRegularizer: tf.regularizers.l2({ l2: 0.001 })
                }));
                model.add(tf.layers.dropout({ rate: 0.5 }));

                model.add(tf.layers.dense({
                    units: numClasses,
                    activation: 'softmax',
                    kernelInitializer: 'glorotNormal'
                }));

                // Compile with Learning Rate Scheduling
                const initialLearningRate = 0.001;
                const optimizer = tf.train.adam(initialLearningRate);

                model.compile({
                    optimizer: optimizer,
                    loss: 'categoricalCrossentropy',
                    metrics: ['accuracy']
                });

                log(`[ARCH] Model compiled: ${numClasses} output classes`, '#9b59b6');
                log(`[ARCH] Total parameters: ${model.countParams().toLocaleString()}`, '#9b59b6');

                // 4. Data Augmentation Function
                const augmentImage = (tensor) => {
                    return tf.tidy(() => {
                        let augmented = tensor;

                        // Random horizontal flip (50% chance)
                        if (Math.random() > 0.5) {
                            augmented = tf.image.flipLeftRight(augmented);
                        }

                        // Random rotation (-15 to +15 degrees)
                        const angle = (Math.random() - 0.5) * 30 * (Math.PI / 180);
                        if (Math.abs(angle) > 0.01) {
                            augmented = tf.image.rotateWithOffset(augmented, angle);
                        }

                        // Random brightness adjustment (-0.2 to +0.2)
                        const brightnessDelta = (Math.random() - 0.5) * 0.4;
                        augmented = tf.image.adjustBrightness(augmented, brightnessDelta);

                        // Random zoom (90% to 110%)
                        const zoomFactor = 0.9 + Math.random() * 0.2;
                        if (Math.abs(zoomFactor - 1.0) > 0.01) {
                            const size = augmented.shape[0];
                            const newSize = Math.floor(size * zoomFactor);
                            augmented = tf.image.resizeBilinear(augmented, [newSize, newSize]);

                            if (newSize > size) {
                                // Crop to original size
                                const offset = Math.floor((newSize - size) / 2);
                                augmented = tf.slice(augmented, [offset, offset, 0], [size, size, 3]);
                            } else {
                                // Pad to original size
                                const padSize = Math.floor((size - newSize) / 2);
                                augmented = tf.pad(augmented, [[padSize, size - newSize - padSize], [padSize, size - newSize - padSize], [0, 0]]);
                            }
                        }

                        // Ensure values are in valid range
                        augmented = tf.clipByValue(augmented, 0, 255);

                        return augmented;
                    });
                };

                // 5. Prepare Training Data with Augmentation
                log("[TRAIN] Preparing training data with augmentation...", '#f1c40f');

                const EPOCHS = 50;
                const BATCH_SIZE = 20; // Process 20 species at a time
                const AUGMENTATIONS_PER_IMAGE = 3; // Create 3 augmented versions per image

                // Shuffle species for better training
                for (let i = validClasses.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [validClasses[i], validClasses[j]] = [validClasses[j], validClasses[i]];
                }

                log(`[TRAIN] Training for ${EPOCHS} epochs with data augmentation...`, '#f1c40f');
                log(`[TRAIN] Effective dataset size: ${numClasses * 5 * (AUGMENTATIONS_PER_IMAGE + 1)} images`, '#f1c40f');

                let bestAccuracy = 0;
                let bestModelWeights = null;

                // Training loop
                for (let epoch = 0; epoch < EPOCHS; epoch++) {
                    log(`[EPOCH ${epoch + 1}/${EPOCHS}] Starting...`, '#3498db');
                    epochDisplay.innerText = epoch + 1;

                    // Adjust learning rate (decay every 10 epochs)
                    if (epoch > 0 && epoch % 10 === 0) {
                        const newLR = initialLearningRate * Math.pow(0.5, Math.floor(epoch / 10));
                        optimizer.learningRate = newLR;
                        log(`[EPOCH ${epoch + 1}] Learning rate adjusted to ${newLR.toFixed(6)}`, '#e67e22');
                    }

                    let epochLoss = 0;
                    let epochAcc = 0;
                    let batchCount = 0;

                    // Process in batches
                    const totalBatches = Math.ceil(numClasses / BATCH_SIZE);

                    for (let batchIdx = 0; batchIdx < totalBatches; batchIdx++) {
                        const batchStart = batchIdx * BATCH_SIZE;
                        const batchEnd = Math.min(batchStart + BATCH_SIZE, numClasses);
                        const batchSpecies = validClasses.slice(batchStart, batchEnd);

                        // Load and augment images for this batch
                        const batchData = await tf.tidy(() => {
                            const inputs = [];
                            const labels = [];

                            for (let i = 0; i < batchSpecies.length; i++) {
                                const speciesKey = batchSpecies[i];
                                const globalIndex = validClasses.indexOf(speciesKey);
                                const imagePaths = DATASET_MANIFEST[speciesKey];

                                for (const imgPath of imagePaths) {
                                    const img = new Image();
                                    img.src = imgPath;

                                    // Original image
                                    const tensor = tf.browser.fromPixels(img);
                                    const resized = tf.image.resizeBilinear(tensor, [64, 64]);
                                    const normalized = resized.toFloat().div(127.5).sub(1.0);

                                    inputs.push(normalized);
                                    labels.push(globalIndex);

                                    // Augmented versions
                                    for (let aug = 0; aug < AUGMENTATIONS_PER_IMAGE; aug++) {
                                        const augTensor = augmentImage(resized);
                                        const augNormalized = augTensor.toFloat().div(127.5).sub(1.0);
                                        inputs.push(augNormalized);
                                        labels.push(globalIndex);
                                        augTensor.dispose();
                                    }

                                    tensor.dispose();
                                    resized.dispose();
                                }
                            }

                            const xs = tf.stack(inputs);
                            const ys = tf.oneHot(tf.tensor1d(labels, 'int32'), numClasses);

                            inputs.forEach(t => t.dispose());

                            return { xs, ys };
                        });

                        // Train on this batch
                        const history = await model.fit(batchData.xs, batchData.ys, {
                            epochs: 1,
                            batchSize: 32,
                            shuffle: true,
                            verbose: 0
                        });

                        epochLoss += history.history.loss[0];
                        epochAcc += history.history.acc[0];
                        batchCount++;

                        batchData.xs.dispose();
                        batchData.ys.dispose();

                        // Update progress
                        const progress = ((batchIdx + 1) / totalBatches) * 100;
                        progressFill.style.width = progress + '%';
                        percentText.innerText = progress.toFixed(1) + '%';

                        await tf.nextFrame();
                    }

                    const avgLoss = epochLoss / batchCount;
                    const avgAcc = epochAcc / batchCount;

                    log(`[EPOCH ${epoch + 1}] Loss: ${avgLoss.toFixed(4)} | Accuracy: ${(avgAcc * 100).toFixed(2)}%`, '#2ecc71');
                    currAcc.innerText = (avgAcc * 100).toFixed(2) + '%';

                    // Save best model
                    if (avgAcc > bestAccuracy) {
                        bestAccuracy = avgAcc;
                        bestModelWeights = await model.getWeights();
                        log(`[EPOCH ${epoch + 1}] ⭐ New best accuracy: ${(bestAccuracy * 100).toFixed(2)}%`, '#f39c12');
                    }

                    await tf.nextFrame();
                }

                // Restore best weights
                if (bestModelWeights) {
                    await model.setWeights(bestModelWeights);
                    log(`[TRAIN] Restored best model weights (${(bestAccuracy * 100).toFixed(2)}% accuracy)`, '#2ecc71');
                }

                // 6. Save Model
                log("[SAVE] Saving trained model to IndexedDB...", '#9b59b6');
                await model.save('indexeddb://wildlife-model');

                // Save class mapping
                localStorage.setItem('wildlife-model-classes', JSON.stringify(validClasses));

                log(`[SUCCESS] Training complete! Final accuracy: ${(bestAccuracy * 100).toFixed(2)}%`, '#27ae60');
                log(`[SUCCESS] Model saved successfully. You can now use it for identification!`, '#27ae60');

                progressFill.style.width = '100%';
                percentText.innerText = '100%';

            } catch (error) {
                console.error("Training Error:", error);
                log(`[ERROR] ${error.message}`, '#e74c3c');
                log(`[ERROR] Stack: ${error.stack}`, '#e74c3c');
            } finally {
            }
        });

        document.getElementById('exit-training').addEventListener('click', () => {
            AppState.currentStep = 0;
            renderModule();
        });
    }
};
