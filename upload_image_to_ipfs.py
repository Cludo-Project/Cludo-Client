#!/usr/bin/env python3
"""Upload all images of the database to IPFS and update the database."""
# Import JSON and os modules
import json
import os

# Global config
DATABASE_PATH = 'database.json'
IMAGES_DIR = 'images'
IPFS_ADD_COMMAND = 'ipfs add -q'
IPFS_GATEWAY_URL = 'https://ipfs.io/ipfs/'


def upload_image_to_ipfs(image_path):
    """Upload an image to IPFS and return its hash."""
    # Gets the image's hash
    image_hash = os.popen(f"{IPFS_ADD_COMMAND} {image_path}",).read().strip()
    # Returns the image's hash
    return image_hash


def main():
    """Run the script."""
    # Reads the database
    with open(DATABASE_PATH, 'r', encoding='utf-8') as database_file:
        database = json.load(database_file)

    # Create a copy of the database to modify it
    # (Python can't iterate over a dict while modifying it)
    database_copy = database.copy()
    # Initialise images_added counter
    images_added = 0
    # Initialise games_without_images counter
    games_without_images = 0
    # Uploads all images to IPFS
    for game_id in database:
        # Gets the game's image path
        image_path = os.path.join(
            IMAGES_DIR,
            database[game_id]['image']
            if 'image' in database[game_id]
            else database[game_id]['image_url']
            if 'image_url' in database[game_id]
            else ''
        )
        # Checks if the image exists
        if os.path.isfile(image_path):
            # Uploads the image to IPFS
            image_hash = upload_image_to_ipfs(image_path)
            # Updates the database
            database_copy[game_id]['image_url'] = IPFS_GATEWAY_URL + image_hash
            print(f"{game_id} - {image_hash}")
            # Increments the images_added counter
            images_added += 1
        else:
            # Increments the games_without_images counter
            games_without_images += 1
    # Prints the number of images added
    print(f"Added {images_added} images")
    # Prints the number of games without images
    print(f"{games_without_images} games without images")
    # Writes the updated database
    with open(DATABASE_PATH, 'w', encoding='utf-8') as database_file:
        json.dump(database_copy, database_file, ensure_ascii=False)


if __name__ == '__main__':
    main()