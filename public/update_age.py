#!/usr/bin/env python3
"""Add the minimum and maximum age to the database by parsing age codes."""
# Imports json and os modules
import json
import os

# Global config
DATABASE_PATH = 'database.json'
AGE_CODES = {
    '1': {'min': 9, 'max': 18, 'isMouth': True},
    '2': {'min': 2, 'max': 3, 'isMouth': False},
    '4': {'min': 4, 'max': 5, 'isMouth': False},
    '6': {'min': 6, 'max': 7, 'isMouth': False},
    '8': {'min': 8, 'max': 9, 'isMouth': False},
    '10': {'min': 10, 'max': -1, 'isMouth': False}
}


def main():
    """Add the minimum and maximum age to the database by parsing age codes."""
    # Load the database
    with open(DATABASE_PATH, 'r', encoding='utf-8') as database_file:
        database = json.load(database_file)

    # Add the minimum and maximum age to the database
    for game in database:
        game_object = database[game]
        # Get the age code
        age_code = game_object['age']
        # Get the age code data
        age_code_data = AGE_CODES[age_code]
        # Add the age code data to the game object
        game_object['age'] = age_code_data

    # Save the database
    with open(DATABASE_PATH, 'w', encoding='utf-8') as database_file:
        json.dump(database, database_file)
    print('Done!')


if __name__ == '__main__':
    main()
