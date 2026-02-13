// Clear Broken AI Model
// Run this in browser console (F12) if the AI keeps showing wrong results

console.log("🧹 Clearing broken AI model...");

// Remove the poorly trained model from IndexedDB
tf.io.removeModel('indexeddb://wildlife-model')
    .then(() => {
        console.log("✓ Removed broken model from IndexedDB");

        // Clear the class list
        localStorage.removeItem('wildlife-classes');
        console.log("✓ Cleared class list");

        console.log("✅ Done! Refresh the page and the AI will use MobileNet for accurate results.");
        alert("Broken AI model cleared! Please refresh the page.");
    })
    .catch(err => {
        console.log("ℹ️ No custom model found (this is fine)");
        console.log("The AI will use MobileNet for identification.");
    });
