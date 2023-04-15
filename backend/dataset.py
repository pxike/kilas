import requests
from bs4 import BeautifulSoup
from PIL import Image
import os

# URL to extract images from
urls = [
    "https://www.pinterest.com/hamzakharbouch/memes/",
    "https://www.pinterest.com/hamzakharbouch/manga/",
    "https://www.pinterest.com/hamzakharbouch/female-fashion/",
    "https://www.pinterest.com/hamzakharbouch/male-fashion/",
    "https://www.pinterest.com/hamzakharbouch/damage/",
    "https://www.pinterest.com/hamzakharbouch/mes-enregistrements/beautiful-flowers/",
    "https://www.pinterest.com/hamzakharbouch/mes-enregistrements/fluid-art/",
    "https://www.pinterest.com/hamzakharbouch/mes-enregistrements/nature/"
        ]


for url in urls :
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    img_tags = soup.find_all("img")

    if not os.path.exists("images"):
        os.makedirs("images")

    for img in img_tags:
        img_url = img.attrs.get("src")
        if not img_url:
            continue
        filename = img_url.split("/")[-1]
        filepath = os.path.join("images", filename)
        with open(filepath, "wb") as f:
            try:

                response = requests.get(img_url)

                f.write(response.content)
                print(f"Image saved as {filepath}")
            except:
                print(f"Failed to save image {filepath}")


# Directory containing images
dir_path = f"{os.getcwd()}/images"
# Minimum dimension threshold for images
min_dim = 150

# Loop through all files in the directory
for file in os.listdir(dir_path):
    file_path = os.path.join(dir_path, file)

    # Check if the file is an image
    if not file.endswith(".jpg") and not file.endswith(".jpeg") and not file.endswith(".png") and not file.endswith(
            ".gif"):
        continue

    # Open the image and get its dimensions
    try:
        with Image.open(file_path) as img:
            width, height = img.size
    except:
        # If the file is not a valid image, skip it
        continue

    # Check if the image has at least one dimension below the minimum threshold
    if width < min_dim or height < min_dim:
        os.remove(file_path)
        print(f"Image {file_path} deleted because it is too small")