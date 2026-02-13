import json
import os
import sys

def load_data():
    data_path = 'data/species_data.json'
    if not os.path.exists(data_path):
        print(f"Error: {data_path} not found.")
        return None
    with open(data_path, 'r') as f:
        return json.load(f)

def display_summary(data):
    print("\n" + "="*50)
    print("AI WILDLIFE SYSTEM: TERMINAL DATA VIEWER")
    print("="*50)
    print(f"Total Species in Dataset: {len(data)}")
    print("-"*50)
    for i, (key, species) in enumerate(data.items(), 1):
        print(f"{i}. {species['commonName']} ({species['scientificName']})")
    print("="*50)

def display_details(data, index):
    keys = list(data.keys())
    if index < 0 or index >= len(keys):
        print("Invalid index.")
        return
    
    key = keys[index]
    s = data[key]
    print("\n" + "#"*60)
    print(f"DEEP DATA PROFILE: {s['commonName'].upper()}")
    print("#"*60)
    print(f"Scientific Name : {s['scientificName']}")
    print(f"Taxonomy        : {s['taxonomy']}")
    print(f"Group           : {s['group']}")
    print(f"Conservation    : {s['status']}")
    print("-" * 60)
    print(f"BEHAVIOR        : {s['behavior']}")
    print(f"DIET            : {s['diet']}")
    print(f"NATURE          : {s['nature']}")
    print(f"HABITAT         : {s['habitat']}")
    print(f"EVS CURRICULUM  : {s['evsAlignment']}")
    print("#"*60)

def main():
    data = load_data()
    if not data:
        return

    while True:
        display_summary(data)
        choice = input("\nEnter number to view DEEP DATA (or 'q' to quit): ").lower()
        
        if choice == 'q':
            print("Exiting Data Viewer...")
            break
        
        try:
            idx = int(choice) - 1
            display_details(data, idx)
            input("\nPress Enter to return to list...")
        except ValueError:
            print("Please enter a valid number or 'q'.")

if __name__ == "__main__":
    main()
