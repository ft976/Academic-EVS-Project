import os
import json
import random

# Configuration
DATASET_DIR = r"c:\Users\rohan\OneDrive\Desktop\kl221\dataset"
OUTPUT_FILE = r"c:\Users\rohan\OneDrive\Desktop\kl221\js\dataset_manifest.js"
MAX_IMAGES_PER_CLASS = 15  # Limit to 15 images to prevent browser crash during texture loading
MIN_IMAGES_REQUIRED = 2    # Skip classes with fewer than 2 images

def generate_manifest():
    manifest = {}
    class_count = 0
    total_images = 0
    
    print(f"Scanning dataset at: {DATASET_DIR}")
    
    if not os.path.exists(DATASET_DIR):
        print("Error: Dataset directory not found!")
        return

    # Get all subdirectories (species)
    try:
        species_dirs = [d for d in os.listdir(DATASET_DIR) if os.path.isdir(os.path.join(DATASET_DIR, d))]
        species_dirs.sort() # Alphabetical order
    except Exception as e:
        print(f"Error reading directory: {e}")
        return

    print(f"Found {len(species_dirs)} potential species folders.")

    for species in species_dirs:
        species_path = os.path.join(DATASET_DIR, species)
        
        # Get all valid image files
        images = []
        for f in os.listdir(species_path):
            if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                # Create relative path for web usage
                # We need path relative to index.html, so 'dataset/species/image.jpg'
                rel_path = f"dataset/{species}/{f}"
                images.append(rel_path)
        
        # Filter and Limit
        if len(images) >= MIN_IMAGES_REQUIRED:
            # Shuffle and pick max needed
            random.shuffle(images)
            selected_images = images[:MAX_IMAGES_PER_CLASS]
            
            manifest[species] = selected_images
            class_count += 1
            total_images += len(selected_images)
            
            if class_count % 100 == 0:
                print(f"Processed {class_count} classes...")

    print(f"Finished. Total Classes: {class_count}")
    print(f"Total Images: {total_images}")

    # Write to JS file
    js_content = f"const DATASET_MANIFEST = {json.dumps(manifest, indent=4)};"
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(js_content)
        
    print(f"Manifest written to {OUTPUT_FILE}")

if __name__ == "__main__":
    generate_manifest()
