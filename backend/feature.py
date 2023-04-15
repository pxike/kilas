import base64
import os
import re
from io import BytesIO
from PIL import Image
import torch
import torchvision.transforms as transforms
import torchvision.models as models
from matplotlib import pyplot as plt

resnet = models.resnet50(pretrained=True)
resnet.eval()
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])


def feature(url):

    image = Image.open(f"{os.getcwd()}/images/{url}")
    image_tensor = transform(image)
    image_tensor = torch.unsqueeze(image_tensor, 0)
    features = resnet(image_tensor)
    vf = features.detach().numpy().flatten().tolist()
    return {
        "url":url,
        "vector": vf
    }

def api_stuff(base64_string):
    """
    with open("images/73e2e68f45f485080292f4fca2b31888.jpg", "rb") as f:
        image_bytes = f.read()
        base64_bytes = base64.b64encode(image_bytes)
        base64_string = base64_bytes.decode("utf-8")
    """
    print(base64_string)
    base64_data = re.sub('^data:image/.+;base64,', '', base64_string)
    byte_data = base64.urlsafe_b64decode(base64_data)
    image_data = BytesIO(byte_data)
    image = Image.open(image_data)

    image_tensor = transform(image)
    image_tensor = torch.unsqueeze(image_tensor, 0)
    features = resnet(image_tensor)
    vf = features.detach().numpy().flatten().tolist()
    print(vf)

    return { "vector": vf }
