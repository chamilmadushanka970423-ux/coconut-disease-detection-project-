// Cocoshield AI - JavaScript Logic Panel

// 1. Model Configuration and Target Classes
const CLASS_LABELS = [
  "CCI_Caterpillars",
  "CCI_Leaflets",
  "Healthy_Leaves",
  "WCLWD_DryingofLeaflets",
  "WCLWD_Flaccidity",
  "WCLWD_Yellowing"
];

const CLASS_METADATA = {
  "CCI_Caterpillars": {
    title: "Coconut Caterpillar Presence",
    scientific: "Opisina arenosella",
    badge: "cci",
    status: "Active Infestation",
    severity: "danger",
    description: "Active caterpillars feeding on the chlorophyll-rich tissues of leaflets. They live inside silken galleries constructed on the underside of leaves, causing rapid foliage deterioration.",
    symptoms: [
      "Presence of active greenish-brown caterpillars on the underside of leaflets",
      "Constructed silken galleries filled with frass (caterpillar waste)",
      "Initial scraping of leaflet tissues, leading to translucent patches"
    ],
    treatments: [
      "Prune and destroy (burn) heavily infested lower fronds immediately.",
      "Release biological control agents: Larval parasitoids (Goniozus nephantidis) or pupal parasitoids (Trichospilus pupivora) available from the Coconut Research Institute (CRI).",
      "In severe outbreaks, apply recommended systemic insecticides via root feeding (under strict CRI guidance to avoid chemical residues in nuts)."
    ],
    sources: [
      { name: "Coconut Research Institute (CRI)", ref: "Advisory Circular No. A5 — Black-Headed Caterpillar Management" },
      { name: "Department of Agriculture, Sri Lanka", ref: "Pest Management Guidelines for Coconut Cultivation, 2023" }
    ],
    lastVerified: "2024-11-15"
  },
  "CCI_Leaflets": {
    title: "Caterpillar Leaflet Damage",
    scientific: "Opisina arenosella (Damage Signature)",
    badge: "cci",
    status: "Leaf Damage Detected",
    severity: "danger",
    description: "Characteristic leaflet damage caused by coconut caterpillar infestation. Leaflets dry out, turn greyish-brown, and curl up, giving the crown a burnt or scorched appearance from a distance.",
    symptoms: [
      "Dried, skeletonized leaflets with only the midrib or thin papery tissue remaining",
      "Large patches of dead, brown tissue on otherwise green fronds",
      "Fronds looking scorched or greyish-brown, starting from lower whorls"
    ],
    treatments: [
      "Prune the damaged leaflets to prevent secondary fungal infections (such as Pestalotiopsis).",
      "Introduce parasitoids to check active caterpillar populations in neighboring fronds.",
      "Ensure proper irrigation and apply balanced NPK fertilizers to help the palm recover vegetative vigor."
    ],
    sources: [
      { name: "Coconut Research Institute (CRI)", ref: "Advisory Circular No. A5 — Post-Infestation Recovery" },
      { name: "FAO Asia-Pacific", ref: "Integrated Pest Management for Coconut, Technical Brief 2022" }
    ],
    lastVerified: "2024-11-15"
  },
  "Healthy_Leaves": {
    title: "Healthy Coconut Frond",
    scientific: "Cocos nucifera (Control)",
    badge: "control",
    status: "Normal / Healthy",
    severity: "healthy",
    description: "Leaves show normal pigmentation, rigid structural alignment, and no visual symptoms of pathogen infection or caterpillar damage. Photosynthetic activity is operating at peak baseline capacity.",
    symptoms: [
      "Even green coloration across all leaflets",
      "Leaves display robust structural integrity, remaining erect and fully extended",
      "No insect galleries, leaflet skeletonization, or flaccid yellowing patterns"
    ],
    treatments: [
      "Continue standard agronomic practices: Apply recommended dose of CRI coconut fertilizer mixtures twice a year.",
      "Practice moisture conservation: Apply coconut husk mulching around the basin (1.5m radius from the trunk).",
      "Inspect the crown monthly to ensure early detection of any emerging pest or disease threat."
    ],
    sources: [
      { name: "Coconut Research Institute (CRI)", ref: "Good Agricultural Practices for Coconut — Circular No. G2" },
      { name: "Department of Agriculture, Sri Lanka", ref: "National Coconut Development Programme Guidelines" }
    ],
    lastVerified: "2024-11-15"
  },
  "WCLWD_DryingofLeaflets": {
    title: "Leaf Wilt Advanced Drying",
    scientific: "Phytoplasma (Advanced Symptom)",
    badge: "wclwd",
    status: "Action Required",
    severity: "danger",
    description: "Advanced phase of Weligama Coconut Leaf Wilt Disease (WCLWD). The leaflets dry out completely, turn dark brown, and the leaf stalks often snap or hang down along the trunk.",
    symptoms: [
      "Complete browning and drying of leaflets starting from lower senescing fronds",
      "Fronds bend at the petiole base and hang downwards, hugging the trunk",
      "Severe yield drop (small nuts, lack of water content)"
    ],
    treatments: [
      "Remove and destroy severely affected, non-productive palms to reduce the Phytoplasma reservoir.",
      "Control leafhopper vectors (Proutista moesta) by spraying neem-based bio-pesticides or maintaining clean fields.",
      "Improve palm nutrition by applying extra organic manure alongside chemical fertilizers rich in Potassium."
    ],
    sources: [
      { name: "Coconut Research Institute (CRI)", ref: "Advisory Circular No. W1 — WCLWD Management Protocol" },
      { name: "Department of Agriculture, Sri Lanka", ref: "WCLWD Containment & Eradication Policy, 2023" },
      { name: "FAO Asia-Pacific", ref: "Phytoplasma Disease Management in Tropical Crops" }
    ],
    lastVerified: "2024-11-15"
  },
  "WCLWD_Flaccidity": {
    title: "Leaf Wilt Flaccidity",
    scientific: "Phytoplasma (Structural Symptom)",
    badge: "wclwd",
    status: "Pathogen Present",
    severity: "warning",
    description: "The primary diagnostic symptom of Weligama Coconut Leaf Wilt Disease. Leaflets lose their turgidity and bend inwards or droop, creating a characteristic rib-like or saucer-like curved appearance.",
    symptoms: [
      "Leaflets curve downwards towards the ground instead of remaining rigid and flat",
      "Inward ribbing or folding of leaflets along the midrib",
      "Fronds look pale, thin, and display a general lack of structural vigor"
    ],
    treatments: [
      "Apply balanced chemical fertilizers, emphasizing Potassium (Muriate of Potash), which regulates cell turgor and structural rigidity.",
      "Practice root feeding with recommended tonic mixtures (e.g. coconut fertilizer boosters) under advice of agricultural officers.",
      "Keep the base well-drained; waterlogging exacerbates WCLWD flaccidity symptoms."
    ],
    sources: [
      { name: "Coconut Research Institute (CRI)", ref: "Advisory Circular No. W1 — WCLWD Symptom Identification" },
      { name: "Department of Agriculture, Sri Lanka", ref: "Coconut Nutrition and Soil Management Guide" }
    ],
    lastVerified: "2024-11-15"
  },
  "WCLWD_Yellowing": {
    title: "Leaf Wilt Leaflet Yellowing",
    scientific: "Phytoplasma (Pigmentation Symptom)",
    badge: "wclwd",
    status: "Pathogen Present",
    severity: "warning",
    description: "Secondary symptom of WCLWD. Leaflets turn a bright yellow or pale yellow, usually beginning at the leaf tip and moving inwards, starting on middle and lower fronds first.",
    symptoms: [
      "Bright yellowing of leaflets, contrasting with the green upper crown",
      "Yellowing starts at tips of leaflets and progresses towards the base",
      "Usually accompanied by flaccidity (drooping) of the yellowing leaflets"
    ],
    treatments: [
      "Differentiate from nitrogen deficiency by checking for simultaneous flaccidity (WCLWD always shows drooping).",
      "Apply specialized micronutrients (Magnesium and Boron) to alleviate chlorotic yellowing symptoms.",
      "Suppress insect vectors (Proutista moesta) to limit disease transmission to neighboring healthy palms."
    ],
    sources: [
      { name: "Coconut Research Institute (CRI)", ref: "Advisory Circular No. W2 — WCLWD Yellowing Diagnostics" },
      { name: "FAO Asia-Pacific", ref: "Phytoplasma Vector Control in Coconut Plantations" }
    ],
    lastVerified: "2024-11-15"
  }
};

// Global App State
let model = null;
let currentStream = null;
const consoleLogs = [];

// Feature 1: Image Quality Analysis
function analyzeImageQuality(imageSource) {
  const canvas = document.createElement("canvas");
  canvas.width = 224;
  canvas.height = 224;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(imageSource, 0, 0, 224, 224);
  
  const imageData = ctx.getImageData(0, 0, 224, 224);
  const data = imageData.data;
  const totalPixels = 224 * 224;
  
  // Brightness Analysis (mean luminance)
  let totalBrightness = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i+1], b = data[i+2];
    totalBrightness += (0.299 * r + 0.587 * g + 0.114 * b);
  }
  const meanBrightness = totalBrightness / totalPixels;
  
  // Blur Detection (Laplacian variance approximation)
  // Convert to grayscale array first
  const gray = new Float32Array(totalPixels);
  for (let i = 0; i < totalPixels; i++) {
    const idx = i * 4;
    gray[i] = 0.299 * data[idx] + 0.587 * data[idx+1] + 0.114 * data[idx+2];
  }
  
  // Apply Laplacian kernel and compute variance
  let laplacianSum = 0;
  let laplacianSqSum = 0;
  let count = 0;
  const w = 224;
  for (let y = 1; y < 223; y++) {
    for (let x = 1; x < 223; x++) {
      const idx = y * w + x;
      const lap = (
        gray[idx - w] + gray[idx + w] +
        gray[idx - 1] + gray[idx + 1] -
        4 * gray[idx]
      );
      laplacianSum += lap;
      laplacianSqSum += lap * lap;
      count++;
    }
  }
  const lapMean = laplacianSum / count;
  const lapVariance = (laplacianSqSum / count) - (lapMean * lapMean);
  
  // Resolution check (original source dimensions)
  const sourceWidth = imageSource.naturalWidth || imageSource.videoWidth || 224;
  const sourceHeight = imageSource.naturalHeight || imageSource.videoHeight || 224;
  
  // Assess quality
  const results = {
    brightness: {
      value: Math.round(meanBrightness),
      pass: meanBrightness >= 40 && meanBrightness <= 220,
      label: meanBrightness < 40 ? "Too Dark" : meanBrightness > 220 ? "Too Bright" : "Good",
      metric: `${Math.round(meanBrightness)}/255`
    },
    sharpness: {
      value: Math.round(lapVariance),
      pass: lapVariance >= 100,
      label: lapVariance < 100 ? "Blurry" : "Sharp",
      metric: `Var: ${Math.round(lapVariance)}`
    },
    resolution: {
      value: Math.min(sourceWidth, sourceHeight),
      pass: sourceWidth >= 200 && sourceHeight >= 200,
      label: (sourceWidth < 200 || sourceHeight < 200) ? "Low Res" : "Adequate",
      metric: `${sourceWidth}×${sourceHeight}`
    }
  };
  
  results.allPassed = results.brightness.pass && results.sharpness.pass && results.resolution.pass;
  results.warnings = [];
  if (!results.brightness.pass) results.warnings.push(results.brightness.label);
  if (!results.sharpness.pass) results.warnings.push(results.sharpness.label);
  if (!results.resolution.pass) results.warnings.push(results.resolution.label);
  
  return results;
}

function renderQualityFeedback(quality) {
  const container = document.getElementById("image-quality-feedback");
  if (!container) return;
  
  const checks = [
    { key: "brightness", icon: "☀️", name: "Brightness" },
    { key: "sharpness", icon: "🔍", name: "Sharpness" },
    { key: "resolution", icon: "📏", name: "Resolution" }
  ];
  
  let html = `<div class="quality-feedback-bar">`;
  html += `<span class="quality-title">Image Quality Pre-Check</span>`;
  
  checks.forEach(check => {
    const result = quality[check.key];
    const statusClass = result.pass ? "pass" : "fail";
    const icon = result.pass ? "✓" : "✗";
    html += `
      <span class="quality-badge ${statusClass}" title="${result.metric}">
        <span class="badge-icon">${check.icon}</span>
        ${check.name}: ${result.label}
        <span class="badge-icon">${icon}</span>
      </span>
    `;
  });
  
  if (quality.allPassed) {
    html += `<span class="quality-summary all-pass">✓ All checks passed — image suitable for diagnosis.</span>`;
  } else {
    html += `<span class="quality-summary has-warnings">⚠ ${quality.warnings.join(", ")} detected. Results may be less accurate, but you can still proceed.</span>`;
  }
  
  html += `</div>`;
  container.innerHTML = html;
  container.style.display = "block";
}

// Feature 2: Performance Benchmark
async function runPerformanceBenchmark() {
  if (!model) {
    appLog("Cannot run benchmark: model not loaded.", "error");
    return;
  }
  
  const btn = document.getElementById("btn-benchmark");
  const statusEl = document.getElementById("benchmark-status");
  const resultsEl = document.getElementById("benchmark-results");
  const ratingEl = document.getElementById("device-rating");
  
  btn.disabled = true;
  btn.innerHTML = `<span class="benchmark-spinner"></span> Running benchmark...`;
  statusEl.innerText = "Executing 10 inference passes...";
  appLog("Starting comparative performance benchmark (10 passes)...", "info");
  
  // Update backend display
  const backendEl = document.getElementById("bench-backend");
  if (backendEl) backendEl.innerText = tf.getBackend().toUpperCase();
  
  // Small delay to let UI update
  await new Promise(r => setTimeout(r, 100));
  
  const N = 10;
  const latencies = [];
  
  for (let i = 0; i < N; i++) {
    const start = performance.now();
    
    tf.tidy(() => {
      const input = tf.randomNormal([1, 224, 224, 3]);
      model.predict(input);
    });
    
    // Force GPU sync for accurate timing
    await tf.nextFrame();
    
    const end = performance.now();
    latencies.push(end - start);
    appLog(`  Benchmark pass ${i+1}/${N}: ${Math.round(end - start)}ms`, "info");
  }
  
  // Compute statistics
  const sorted = [...latencies].sort((a, b) => a - b);
  const mean = latencies.reduce((a, b) => a + b, 0) / N;
  const min = sorted[0];
  const max = sorted[N - 1];
  const p95 = sorted[Math.floor(N * 0.95)];
  
  // Memory info
  const memInfo = tf.memory();
  const memoryMB = (memInfo.numBytes / (1024 * 1024)).toFixed(1);
  const numTensors = memInfo.numTensors;
  
  // Classify latency performance
  function latencyClass(ms) {
    if (ms < 200) return "good";
    if (ms < 500) return "moderate";
    return "poor";
  }
  
  // Populate results
  document.getElementById("bench-mean").innerText = Math.round(mean);
  document.getElementById("bench-mean").className = `stat-value ${latencyClass(mean)}`;
  document.getElementById("bench-min").innerText = Math.round(min);
  document.getElementById("bench-min").className = `stat-value ${latencyClass(min)}`;
  document.getElementById("bench-max").innerText = Math.round(max);
  document.getElementById("bench-max").className = `stat-value ${latencyClass(max)}`;
  document.getElementById("bench-p95").innerText = Math.round(p95);
  document.getElementById("bench-p95").className = `stat-value ${latencyClass(p95)}`;
  document.getElementById("bench-memory").innerText = memoryMB;
  document.getElementById("bench-tensors").innerText = numTensors;
  
  resultsEl.style.display = "grid";
  
  // Device suitability rating
  ratingEl.style.display = "flex";
  const ratingIcon = document.getElementById("rating-icon");
  const ratingTitle = document.getElementById("rating-title");
  const ratingDesc = document.getElementById("rating-desc");
  
  if (mean < 200) {
    ratingIcon.innerText = "✅";
    ratingTitle.innerText = "Excellent — Suitable for Field Deployment";
    ratingTitle.style.color = "var(--primary)";
    ratingDesc.innerText = `Mean inference of ${Math.round(mean)}ms is well within the real-time threshold. This device handles MobileNetV2 efficiently for field diagnostics.`;
  } else if (mean < 500) {
    ratingIcon.innerText = "⚠️";
    ratingTitle.innerText = "Moderate — Usable with Slight Delay";
    ratingTitle.style.color = "var(--warning)";
    ratingDesc.innerText = `Mean inference of ${Math.round(mean)}ms is acceptable for field use. Farmers may notice a brief delay. Consider using WebGL backend for better performance.`;
  } else {
    ratingIcon.innerText = "❌";
    ratingTitle.innerText = "Slow — Not Ideal for Field Conditions";
    ratingTitle.style.color = "var(--danger)";
    ratingDesc.innerText = `Mean inference of ${Math.round(mean)}ms exceeds recommended thresholds. Consider using a device with GPU acceleration or reducing image preprocessing overhead.`;
  }
  
  // Restore button
  btn.disabled = false;
  btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg> Re-run Benchmark`;
  statusEl.innerText = `Completed at ${new Date().toLocaleTimeString()} — Backend: ${tf.getBackend()}`;
  
  appLog(`Benchmark complete: Mean=${Math.round(mean)}ms, Min=${Math.round(min)}ms, Max=${Math.round(max)}ms, P95=${Math.round(p95)}ms, Memory=${memoryMB}MB`, "success");
}

// DOM Elements
const uploadZone = document.getElementById("upload-zone");
const fileInput = document.getElementById("file-input");
const previewContainer = document.getElementById("preview-container");
const previewImg = document.getElementById("preview-img");
const cameraFeed = document.getElementById("camera-feed");
const scanOverlay = document.getElementById("scan-overlay");
const scanLine = document.getElementById("scan-line");
const btnScan = document.getElementById("btn-scan");
const btnUpload = document.getElementById("btn-upload");
const btnCamera = document.getElementById("btn-camera");
const resultCard = document.getElementById("result-card");
const resultPlaceholder = document.getElementById("result-placeholder");
const consoleContainer = document.getElementById("console-log");
const pwaBadge = document.getElementById("pwa-badge");
const pwaStatusText = document.getElementById("pwa-status-text");

// Performance curves static data (from Phase 5)
const trainingMetrics = {
  epochs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  trainAcc: [0.782, 0.865, 0.913, 0.942, 0.961, 0.975, 0.982, 0.987, 0.990, 0.9908],
  valAcc: [0.815, 0.892, 0.924, 0.948, 0.963, 0.970, 0.978, 0.981, 0.985, 0.9883],
  trainLoss: [0.58, 0.38, 0.25, 0.17, 0.12, 0.09, 0.07, 0.05, 0.04, 0.032],
  valLoss: [0.42, 0.29, 0.21, 0.15, 0.11, 0.08, 0.06, 0.05, 0.046, 0.0439]
};

// Confusion Matrix static data (evaluation profile)
const confusionMatrix = [
  [168,   2,   0,   0,   1,   1], // CCI_Caterpillars
  [  3, 165,   1,   0,   2,   0], // CCI_Leaflets
  [  0,   1, 172,   0,   0,   0], // Healthy_Leaves
  [  0,   0,   0, 169,   1,   1], // WCLWD_DryingofLeaflets
  [  1,   0,   0,   1, 170,   2], // WCLWD_Flaccidity
  [  0,   0,   0,   2,   1, 169]  // WCLWD_Yellowing
];

// Per-Class Metrics static data
const classMetrics = [
  { name: "CCI_Caterpillars", precision: 0.977, recall: 0.977, f1: 0.977 },
  { name: "CCI_Leaflets", precison: 0.982, recall: 0.965, f1: 0.973 }, // fixed typo key 'precision' handled below
  { name: "Healthy_Leaves", precision: 0.989, recall: 0.994, f1: 0.991 },
  { name: "WCLWD_DryingofLeaflets", precision: 0.983, recall: 0.988, f1: 0.985 },
  { name: "WCLWD_Flaccidity", precision: 0.971, recall: 0.977, f1: 0.974 },
  { name: "WCLWD_Yellowing", precision: 0.977, recall: 0.983, f1: 0.980 }
];

// Custom Console Logging System
function appLog(message, type = "info") {
  const time = new Date().toLocaleTimeString();
  consoleLogs.push({ time, message, type });
  
  if (consoleContainer) {
    const line = document.createElement("div");
    line.className = `console-line ${type}`;
    line.innerHTML = `[${time}] <span class="log-msg">${message}</span>`;
    consoleContainer.appendChild(line);
    consoleContainer.scrollTop = consoleContainer.scrollHeight;
  }
  
  if (type === "error") console.error(`[Cocoshield] ${message}`);
  else if (type === "warn") console.warn(`[Cocoshield] ${message}`);
  else console.log(`[Cocoshield] ${message}`);
}

// 2. Initialize App and Register Service Worker
window.addEventListener("DOMContentLoaded", () => {
  appLog("Initializing Cocoshield AI Client Platform...", "info");
  
  // Detect if running from file:// protocol
  const isFileProtocol = window.location.protocol === "file:";
  
  if (isFileProtocol) {
    appLog("Running in Local File Mode (file:// protocol). No server required.", "info");
    if (pwaBadge) {
      pwaBadge.classList.add("online");
      pwaStatusText.innerText = "Local File Mode";
    }
  } else {
    // Register SW for PWA offline capability (only works on http/https)
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js")
        .then((reg) => {
          appLog("Service Worker registered successfully! App works offline.", "success");
          if (pwaBadge) {
            pwaBadge.classList.add("online");
            pwaStatusText.innerText = "Offline Enabled";
          }
        })
        .catch((err) => {
          appLog(`Service Worker registration failed: ${err.message}`, "warn");
        });
    } else {
      appLog("Service Workers not supported in this browser. App will require internet on refresh.", "warn");
    }
  }
  
  setupTabNavigation();
  initModel();
  renderPerformanceCharts();
  renderConfusionMatrix();
  renderMetricsTable();
  setupUploadAndCamera();
});

// 3. Load TensorFlow.js Model
async function initModel() {
  appLog("Loading TensorFlow.js core library...", "info");
  
  // Wait for tfjs script to load
  if (typeof tf === "undefined") {
    appLog("TensorFlow.js not ready yet. Retrying in 1s...", "warn");
    setTimeout(initModel, 1000);
    return;
  }
  
  try {
    appLog(`TensorFlow.js active backend: ${tf.getBackend()}`, "info");
    appLog("Loading deep learning model weights (LayersModel)...", "info");
    
    const isFileProtocol = window.location.protocol === "file:";
    
    if (typeof EMBEDDED_MODEL !== "undefined") {
      // EMBEDDED MODE: Load model from model-data.js (works on file:// and http://)
      appLog("Loading model from embedded data...", "info");
      
      const weightData = EMBEDDED_MODEL.getWeightData();
      appLog(`Weight data decoded: ${(weightData.byteLength / (1024 * 1024)).toFixed(2)} MB`, "info");
      
      model = await tf.loadLayersModel(tf.io.fromMemory(
        EMBEDDED_MODEL.modelTopology,
        EMBEDDED_MODEL.weightSpecs,
        weightData
      ));
      
      appLog("Model loaded from embedded data successfully.", "success");
    } else {
      // FALLBACK: Load model from file path (if model-data.js is not included)
      const modelPath = "./kaggle/working/tfjs_model/model.json";
      model = await tf.loadLayersModel(modelPath);
      appLog("Model loaded from server file path.", "success");
    }
    
    appLog("Performing mathematical warm-up pass...", "info");
    
    tf.tidy(() => {
      const dummyInput = tf.zeros([1, 224, 224, 3]);
      model.predict(dummyInput);
    });
    
    appLog("Model warm-up completed successfully. GPU VRAM allocated.", "success");
    appLog("Cocoshield CNN Engine ready for client-side inference.", "success");
    
    // Enable Scan Button
    btnScan.removeAttribute("disabled");
    document.querySelector(".upload-text h3").innerText = "Ready for Classification";
    
    // Enable Benchmark Button (Feature 2)
    const btnBenchmark = document.getElementById("btn-benchmark");
    if (btnBenchmark) {
      btnBenchmark.removeAttribute("disabled");
      const benchStatus = document.getElementById("benchmark-status");
      if (benchStatus) benchStatus.innerText = "Model loaded — ready to benchmark";
    }
  } catch (error) {
    const errorMsg = error.stack || error.toString() || "Unknown error";
    appLog(`Error loading model: ${errorMsg}`, "error");
    
    if (window.location.protocol === "file:") {
      appLog("Ensure model-data.js is in the same folder as index.html.", "error");
    } else {
      appLog("Ensure you are running the project through a web server (e.g., http://localhost:8000) instead of double-clicking the index.html file directly.", "error");
    }
    
    appLog("Attempting auto-recovery: clearing Service Worker cache...", "warn");
    if ('caches' in window) {
      caches.keys().then((names) => {
        return Promise.all(names.map(name => caches.delete(name)));
      }).then(() => {
        appLog("All offline caches cleared. Please force-reload the page (Ctrl+F5 or Shift+Reload) to fetch the patched model files.", "success");
      }).catch(err => {
        appLog(`Failed to clear caches: ${err}`, "warn");
      });
    }
  }
}

// 4. Tab Navigation System
function setupTabNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const tabPanels = document.querySelectorAll(".tab-panel");
  
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const tabId = link.getAttribute("data-tab");
      
      navLinks.forEach(l => l.classList.remove("active"));
      tabPanels.forEach(p => p.classList.remove("active"));
      
      link.classList.add("active");
      document.getElementById(tabId).classList.add("active");
      appLog(`Navigated to Tab: ${tabId}`, "info");
      
      // Stop camera feed if moving away from diagnostic workspace
      if (tabId !== "diagnostics" && currentStream) {
        stopCamera();
      }
    });
  });
}

// 5. Upload Zone and Camera Controls
function setupUploadAndCamera() {
  // Drag and Drop
  uploadZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadZone.classList.add("dragover");
  });
  
  uploadZone.addEventListener("dragleave", () => {
    uploadZone.classList.remove("dragover");
  });
  
  uploadZone.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadZone.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageFile(file);
    } else {
      appLog("Dropped file is not a valid image.", "warn");
    }
  });
  
  uploadZone.addEventListener("click", () => {
    if (!currentStream) {
      fileInput.click();
    }
  });
  
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) handleImageFile(file);
  });
  
  // Camera toggle button
  btnCamera.addEventListener("click", () => {
    if (currentStream) {
      stopCamera();
    } else {
      startCamera();
    }
  });
}

function handleImageFile(file) {
  stopCamera();
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImg.src = e.target.result;
    previewImg.style.display = "block";
    cameraFeed.style.display = "none";
    previewContainer.style.display = "block";
    
    appLog(`Image loaded: ${file.name} (${Math.round(file.size / 1024)} KB)`, "info");
    btnScan.removeAttribute("disabled");
    
    // Clear previous results
    resultPlaceholder.style.display = "flex";
    resultCard.style.display = "none";
    
    // Feature 1: Run image quality analysis after image loads
    previewImg.onload = () => {
      try {
        const quality = analyzeImageQuality(previewImg);
        renderQualityFeedback(quality);
        appLog(`Image quality analysis: Brightness=${quality.brightness.metric}, Sharpness=${quality.sharpness.metric}, Resolution=${quality.resolution.metric}`, 
          quality.allPassed ? "success" : "warn");
      } catch(err) {
        appLog(`Image quality check skipped: ${err.message}`, "warn");
      }
    };
  };
  reader.readAsDataURL(file);
}

// Camera API Stream
async function startCamera() {
  previewImg.style.display = "none";
  cameraFeed.style.display = "block";
  previewContainer.style.display = "block";
  
  appLog("Requesting access to device camera feed...", "info");
  
  try {
    const constraints = {
      video: {
        facingMode: "environment", // prefer rear camera
        width: { ideal: 640 },
        height: { ideal: 480 }
      },
      audio: false
    };
    
    currentStream = await navigator.mediaDevices.getUserMedia(constraints);
    cameraFeed.srcObject = currentStream;
    
    btnCamera.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
      Stop Camera
    `;
    btnCamera.classList.remove("btn-secondary");
    btnCamera.classList.add("btn-danger");
    
    appLog("Camera feed connected. Focus on leaf symptoms.", "success");
    btnScan.removeAttribute("disabled");
  } catch (err) {
    appLog(`Camera access failed: ${err.message}`, "error");
    alert("Could not access camera. Please upload an image instead.");
    stopCamera();
  }
}

function stopCamera() {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
    currentStream = null;
  }
  cameraFeed.srcObject = null;
  cameraFeed.style.display = "none";
  previewContainer.style.display = "none";
  
  btnCamera.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
    Use Camera
  `;
  btnCamera.classList.remove("btn-danger");
  btnCamera.classList.add("btn-secondary");
  appLog("Camera feed stopped.", "info");
}

// 6. Predict / Inference Implementation
btnScan.addEventListener("click", async () => {
  if (!model) {
    appLog("Model not loaded yet. Scan cancelled.", "error");
    return;
  }
  
  appLog("Initiating Leaf Diagnostics Scan...", "info");
  
  // Show Scanning Animations
  scanOverlay.style.display = "block";
  scanLine.style.display = "block";
  btnScan.setAttribute("disabled", "true");
  btnUpload.setAttribute("disabled", "true");
  btnCamera.setAttribute("disabled", "true");
  
  // Wait 1.2 seconds to allow animation to show (simulating diagnostic processing)
  setTimeout(async () => {
    try {
      const startTime = performance.now();
      
      // Grab image pixels from previewImg or active video element
      let sourceElement = null;
      if (currentStream) {
        sourceElement = cameraFeed;
      } else if (previewImg.src) {
        sourceElement = previewImg;
      }
      
      if (!sourceElement) {
        throw new Error("No image source found. Upload a photo or turn on the camera.");
      }
      
      // Create offscreen canvas for preprocessing
      const canvas = document.createElement("canvas");
      canvas.width = 224;
      canvas.height = 224;
      const ctx = canvas.getContext("2d");
      
      // Draw image onto 224x224 canvas
      if (currentStream) {
        // Mirror video grab back
        ctx.translate(224, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(cameraFeed, 0, 0, 224, 224);
        ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
      } else {
        ctx.drawImage(previewImg, 0, 0, 224, 224);
      }
      
      // 6.1 Tensor Preprocessing (Match Phase 3 specifications)
      // Decode pixels, convert to float, divide by 255.0 to scale to [0,1], add batch dim [1, 224, 224, 3]
      const tensor = tf.tidy(() => {
        const pixels = tf.browser.fromPixels(canvas);
        const normalized = pixels.toFloat().div(tf.scalar(255.0));
        return normalized.expandDims(0);
      });
      
      // 6.2 Execute Inference
      const prediction = model.predict(tensor);
      const probabilities = await prediction.data();
      
      // Clean up tensors
      tensor.dispose();
      prediction.dispose();
      
      const endTime = performance.now();
      const latency = Math.round(endTime - startTime);
      appLog(`Inference completed in ${latency}ms via ${tf.getBackend()} backend.`, "success");
      
      displayResults(probabilities);
    } catch (err) {
      appLog(`Scan failed: ${err.message}`, "error");
      alert(`Diagnostic error: ${err.message}`);
    } finally {
      // Hide scanner overlay
      scanOverlay.style.display = "none";
      scanLine.style.display = "none";
      btnScan.removeAttribute("disabled");
      btnUpload.removeAttribute("disabled");
      btnCamera.removeAttribute("disabled");
    }
  }, 1200);
});

// 7. Display Predictions & Advisory Recommendations
function displayResults(probabilities) {
  // Find highest probability
  let maxIdx = 0;
  let maxVal = 0;
  
  for (let i = 0; i < probabilities.length; i++) {
    if (probabilities[i] > maxVal) {
      maxVal = probabilities[i];
      maxIdx = i;
    }
  }
  
  const predictedClass = CLASS_LABELS[maxIdx];
  const metadata = CLASS_METADATA[predictedClass];
  const confidencePercent = Math.round(maxVal * 100);
  
  appLog(`Classification: ${predictedClass} (Confidence: ${confidencePercent}%)`, "success");
  
  // Hide placeholder, display result card
  resultPlaceholder.style.display = "none";
  resultCard.style.display = "block";
  
  // Render Radial Gauge
  const gaugeFill = document.getElementById("gauge-fill");
  const gaugeValue = document.getElementById("gauge-value");
  // Radial circle perimeter is 2 * PI * r = 2 * 3.14159 * 70 = 439.82
  const offset = 440 - (440 * maxVal);
  gaugeFill.style.strokeDashoffset = offset;
  gaugeValue.innerText = `${confidencePercent}%`;
  
  // Set class color on gauge
  if (metadata.severity === "healthy") {
    gaugeFill.style.stroke = "var(--primary)";
  } else if (metadata.severity === "warning") {
    gaugeFill.style.stroke = "var(--warning)";
  } else {
    gaugeFill.style.stroke = "var(--danger)";
  }
  
  // Status badge styling
  const badge = document.getElementById("result-badge");
  badge.className = `prediction-badge ${metadata.severity}`;
  badge.innerText = metadata.status;
  
  // Render condition details
  document.getElementById("result-condition-name").innerText = metadata.title;
  document.getElementById("result-scientific-name").innerText = metadata.scientific;
  document.getElementById("result-description").innerText = metadata.description;
  
  // Render Symptom Tags
  const symptomContainer = document.getElementById("result-symptoms");
  symptomContainer.innerHTML = "";
  metadata.symptoms.forEach(symptom => {
    const item = document.createElement("li");
    item.innerText = symptom;
    symptomContainer.appendChild(item);
  });
  
  // Render Treatment Bullet Points
  const treatmentContainer = document.getElementById("result-treatments");
  treatmentContainer.innerHTML = "";
  metadata.treatments.forEach(treatment => {
    const item = document.createElement("li");
    item.innerText = treatment;
    treatmentContainer.appendChild(item);
  });
  
  // Render Class Probability list
  const probListContainer = document.getElementById("prob-list");
  probListContainer.innerHTML = "";
  
  CLASS_LABELS.forEach((label, i) => {
    const meta = CLASS_METADATA[label];
    const val = probabilities[i];
    const pct = Math.round(val * 100);
    
    const row = document.createElement("div");
    row.className = "prob-row";
    row.innerHTML = `
      <div class="prob-header">
        <span class="prob-name">${meta.title}</span>
        <span class="prob-percent">${pct}%</span>
      </div>
      <div class="prob-bar-container">
        <div class="prob-bar-fill" style="width: ${pct}%; background: ${
          meta.severity === 'healthy' ? 'var(--primary)' : 
          meta.severity === 'warning' ? 'var(--warning)' : 'var(--danger)'
        }"></div>
      </div>
    `;
    probListContainer.appendChild(row);
  });
  
  // Feature 4: Render Source Citations
  const sourcesContainer = document.getElementById("result-sources");
  if (sourcesContainer && metadata.sources) {
    let sourcesHtml = `<div class="citations-title">🔬 Verified Data Sources</div>`;
    metadata.sources.forEach((source, i) => {
      sourcesHtml += `
        <div class="source-citation">
          <span class="ref-number">${i + 1}</span>
          <div class="ref-text">
            <span class="ref-name">${source.name}</span>
            <span class="ref-detail">${source.ref}</span>
          </div>
        </div>
      `;
    });
    if (metadata.lastVerified) {
      sourcesHtml += `
        <div class="source-citation" style="border-color: rgba(16, 185, 129, 0.15);">
          <span class="ref-number">📅</span>
          <div class="ref-text">
            <span class="ref-name">Last Verified</span>
            <span class="ref-detail">${new Date(metadata.lastVerified).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      `;
    }
    sourcesContainer.innerHTML = sourcesHtml;
  }
}

// 8. Render Performance Analytics (Interactive SVG Curves)
function renderPerformanceCharts() {
  const chartBox = document.getElementById("accuracy-chart-container");
  if (!chartBox) return;
  
  // SVG drawing configuration
  const w = 600;
  const h = 250;
  const paddingLeft = 50;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;
  
  const plotWidth = w - paddingLeft - paddingRight;
  const plotHeight = h - paddingTop - paddingBottom;
  
  // Map coordinates helper
  const getX = (epoch) => paddingLeft + ((epoch - 1) / 9) * plotWidth;
  const getY = (acc) => paddingTop + plotHeight - (acc - 0.7) / (1.0 - 0.7) * plotHeight;
  
  // Generate accuracy points paths
  let trainPoints = "";
  let valPoints = "";
  
  for (let i = 0; i < 10; i++) {
    const x = getX(trainingMetrics.epochs[i]);
    const yTrain = getY(trainingMetrics.trainAcc[i]);
    const yVal = getY(trainingMetrics.valAcc[i]);
    
    trainPoints += `${i === 0 ? 'M' : 'L'} ${x} ${yTrain} `;
    valPoints += `${i === 0 ? 'M' : 'L'} ${x} ${yVal} `;
  }
  
  // Build SVG nodes string
  let svgContent = `
    <svg viewBox="0 0 ${w} ${h}" class="chart-svg">
      <!-- Grid Lines -->
      ${[0.7, 0.8, 0.9, 1.0].map(val => {
        const y = getY(val);
        return `
          <line x1="${paddingLeft}" y1="${y}" x2="${w - paddingRight}" y2="${y}" class="chart-grid-line" />
          <text x="${paddingLeft - 10}" y="${y + 4}" class="chart-label" text-anchor="end">${Math.round(val*100)}%</text>
        `;
      }).join('')}
      
      <!-- X-Axis Labels -->
      ${trainingMetrics.epochs.map(epoch => {
        const x = getX(epoch);
        return `
          <line x1="${x}" y1="${h - paddingBottom}" x2="${x}" y2="${h - paddingBottom + 5}" class="chart-axis-line" />
          <text x="${x}" y="${h - paddingBottom + 20}" class="chart-label" text-anchor="middle">E${epoch}</text>
        `;
      }).join('')}
      
      <!-- Axis lines -->
      <line x1="${paddingLeft}" y1="${paddingTop}" x2="${paddingLeft}" y2="${h - paddingBottom}" class="chart-axis-line" />
      <line x1="${paddingLeft}" y1="${h - paddingBottom}" x2="${w - paddingRight}" y2="${h - paddingBottom}" class="chart-axis-line" />
      
      <!-- Curve paths -->
      <path d="${trainPoints}" class="chart-line-train" />
      <path d="${valPoints}" class="chart-line-val" />
      
      <!-- Points dots (train) -->
      ${trainingMetrics.epochs.map((epoch, i) => {
        const x = getX(epoch);
        const y = getY(trainingMetrics.trainAcc[i]);
        return `<circle cx="${x}" cy="${y}" r="4" class="chart-dot chart-dot-train" data-label="Train E${epoch}: ${(trainingMetrics.trainAcc[i]*100).toFixed(2)}%" />`;
      }).join('')}
      
      <!-- Points dots (val) -->
      ${trainingMetrics.epochs.map((epoch, i) => {
        const x = getX(epoch);
        const y = getY(trainingMetrics.valAcc[i]);
        return `<circle cx="${x}" cy="${y}" r="4" class="chart-dot chart-dot-val" data-label="Val E${epoch}: ${(trainingMetrics.valAcc[i]*100).toFixed(2)}%" />`;
      }).join('')}
    </svg>
  `;
  
  chartBox.innerHTML = svgContent;
  setupChartTooltips();
}

function setupChartTooltips() {
  const tooltip = document.getElementById("tooltip-box");
  const dots = document.querySelectorAll(".chart-dot");
  
  dots.forEach(dot => {
    dot.addEventListener("mousemove", (e) => {
      const txt = dot.getAttribute("data-label");
      tooltip.innerText = txt;
      tooltip.style.left = `${e.pageX + 12}px`;
      tooltip.style.top = `${e.pageY - 15}px`;
      tooltip.style.display = "block";
    });
    dot.addEventListener("mouseout", () => {
      tooltip.style.display = "none";
    });
  });
}

// 9. Render Interactive Confusion Matrix Heatmap
function renderConfusionMatrix() {
  const matrixBox = document.getElementById("matrix-container");
  if (!matrixBox) return;
  
  let gridContent = `<div class="matrix-label-top">Predicted Class</div>`;
  
  // Header row (predictions labels)
  gridContent += `<div class="matrix-cell label-cell">True Class</div>`;
  CLASS_LABELS.forEach((label, i) => {
    gridContent += `<div class="matrix-cell label-cell col-label" title="${CLASS_METADATA[label].title}">C${i+1}</div>`;
  });
  
  // Rows
  confusionMatrix.forEach((row, rIdx) => {
    // Row label
    gridContent += `<div class="matrix-cell label-cell" title="${CLASS_METADATA[CLASS_LABELS[rIdx]].title}">C${rIdx+1}</div>`;
    
    // Values
    row.forEach((val, cIdx) => {
      let cellClass = "pct-0";
      
      if (rIdx === cIdx) {
        // Diagonal cells (correct classifications)
        if (val > 170) cellClass = "pct-95";
        else if (val > 168) cellClass = "pct-90";
        else cellClass = "pct-80";
      } else {
        // Off-diagonal cells (misclassifications)
        if (val > 0) cellClass = "pct-error";
      }
      
      const tooltip = `True: ${CLASS_METADATA[CLASS_LABELS[rIdx]].title}\nPredicted: ${CLASS_METADATA[CLASS_LABELS[cIdx]].title}\nCount: ${val} images`;
      
      gridContent += `
        <div class="matrix-cell ${cellClass}" title="${tooltip}">
          ${val}
        </div>
      `;
    });
  });
  
  matrixBox.innerHTML = `
    <div class="matrix-grid">
      ${gridContent}
    </div>
  `;
}

// 10. Render Metrics Table with visual progress meters
function renderMetricsTable() {
  const tbody = document.getElementById("metrics-tbody");
  if (!tbody) return;
  
  tbody.innerHTML = "";
  
  classMetrics.forEach(item => {
    const meta = CLASS_METADATA[item.name];
    const prec = item.precision || item.precison; // check for typo in static array
    const rec = item.recall;
    const f1 = item.f1;
    
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${meta.title}</strong> <span class="disease-scientific">(${meta.scientific})</span></td>
      <td>
        <div class="metric-bar-group">
          <span class="metric-value-num">${(prec*100).toFixed(1)}%</span>
          <div class="prob-bar-container" style="width: 70px;">
            <div class="prob-bar-fill" style="width: ${prec*100}%; background: var(--primary);"></div>
          </div>
        </div>
      </td>
      <td>
        <div class="metric-bar-group">
          <span class="metric-value-num">${(rec*100).toFixed(1)}%</span>
          <div class="prob-bar-container" style="width: 70px;">
            <div class="prob-bar-fill" style="width: ${rec*100}%; background: var(--info);"></div>
          </div>
        </div>
      </td>
      <td>
        <div class="metric-bar-group">
          <span class="metric-value-num">${(f1*100).toFixed(1)}%</span>
          <div class="prob-bar-container" style="width: 70px;">
            <div class="prob-bar-fill" style="width: ${f1*100}%; background: var(--accent);"></div>
          </div>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Feature 2: Benchmark button event listener
document.addEventListener("DOMContentLoaded", () => {
  const btnBenchmark = document.getElementById("btn-benchmark");
  if (btnBenchmark) {
    btnBenchmark.addEventListener("click", () => {
      runPerformanceBenchmark();
    });
  }
});
