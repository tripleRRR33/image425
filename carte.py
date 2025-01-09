import os
from PIL import Image, ImageDraw
import matplotlib.pyplot as plt

class Carte:
    def __init__(self, width, height, grid_size):
        self.width = width
        self.height = height
        self.grid_size = grid_size
        self.map = Image.new('RGB', (width, height), 'white')
        self.draw = ImageDraw.Draw(self.map)
        self.elements = []

    def draw_grid(self):
        for x in range(0, self.width, self.grid_size):
            self.draw.line([(x, 0), (x, self.height)], fill='black')
        for y in range(0, self.height, self.grid_size):
            self.draw.line([(0, y), (self.width, y)], fill='black')

    def add_element(self, name, element_type, position, image_path=None):
        element = {
            'name': name,
            'type': element_type,
            'position': position,
            'image': image_path
        }
        self.elements.append(element)
        if image_path:
            image = Image.open(image_path)
            self.map.paste(image, position)
        else:
            x, y = position
            self.draw.text((x, y), name, fill='black')

    def display(self):
        plt.imshow(self.map)
        plt.show()

if __name__ == "__main__":
    # Dimensions de la carte et taille de la grille
    carte = Carte(800, 600, 50)

    # Dessiner la grille
    carte.draw_grid()

    # Ajouter des villes, pays, peuples et images (mettre les chemins d'images corrects)
    carte.add_element('Ville1', 'ville', (100, 100))
    carte.add_element('Pays1', 'pays', (200, 200))
    carte.add_element('Peuple1', 'peuple', (300, 300))
    carte.add_element('Point1', 'point', (400, 400), 'images/point1.png')

    # Afficher la carte
    carte.display()
