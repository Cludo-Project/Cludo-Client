#!/usr/bin/env python3
"""Remove missing images from the database."""
# Imports json and os modules
import json
import os

# Global config
DATABASE_PATH = 'database.json'
IMAGES_DIR = 'images'


def remove_missing_images():
    """Remove missing images from the database."""
    # Reads the database
    with open(DATABASE_PATH, 'r', encoding='utf-8') as database_file:
        database = json.load(database_file)

    # Create a copy of the database to modify it
    # (Python can't iterate over a dict while modifying it)
    database_copy = database.copy()
    # Initialise removed_images counter
    removed_images = 0
    # Initialise games_without_images counter
    games_without_images = 0
    # Initialise images_added counter
    images_added = 0
    # Removes missing images from the database
    for game_id in database:
        # Gets the game's images if "image" or "image_url" fields are present
        if 'image' in database[game_id] or 'image_url' in database[game_id]:
            # Gets the game's image path
            image_path = os.path.join(
                IMAGES_DIR,
                database[game_id]['image']
                if 'image' in database[game_id]
                else database[game_id]['image_url']
            )
            # Removes the game's image if it doesn't exist
            if not os.path.isfile(image_path):
                print(f"Removing {image_path}")
                if 'image' in database[game_id]:
                    del database_copy[game_id]['image']
                else:
                    del database_copy[game_id]['image_url']
                removed_images += 1
        # Counts games without images
        else:
            # Check if image "jeux_id.jpg" exists
            image_path = os.path.join(IMAGES_DIR, f"{game_id}.jpg")
            # If image exists, add it to the database
            if os.path.isfile(image_path):
                print(f"Adding {image_path}")
                database_copy[game_id]['image'] = f"{game_id}.jpg"
                images_added += 1
            else:
                games_without_images += 1

    # Prints the number of removed images
    print(f"Removed {removed_images} images")
    # Prints the number of images added
    print(f"Added {images_added} images")
    # Print how many games with images are left in the database
    print(f"{len(database_copy) - (removed_images + games_without_images)} \
games with images")
    # List how many images are in the images directory
    print(f"{len(os.listdir(IMAGES_DIR))} images in the images directory.")
    # Writes the modified database
    with open(DATABASE_PATH, 'w', encoding='utf-8') as database_file:
        json.dump(database_copy, database_file)

    # Prints images without games
    # Get images in the images directory
    images_src = os.listdir(IMAGES_DIR)
    # Get images in the database
    images_db = [
        image['image'] if 'image' in image else image['image_url'] if 'image_url' in image else ''
        for image in database_copy.values()
    ]
    # Get images without games
    images_without_games = [
        image
        for image in images_src
        if image not in images_db
    ]
    # Print the number of images without games
    print(f"{len(images_without_games)} images without games :")
    # Print the images without games
    for image in images_without_games:
        print(image)

    print('Removed missing images from the database.')


if __name__ == '__main__':
    remove_missing_images()
