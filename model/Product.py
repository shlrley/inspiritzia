from main import json

class Product:
    def __init__(self, product):
        self.user = None
        self.item = product
        self.color = None
        self.size = None

    def get(self):
        data = {}

        if (self.user == None):
            print("User Not Found")
            data["message"] = "Product Not Found"
            return json.dumps(data)

        data["user"] = self.user
        data["item"] = self.item
        data["color"] = self.color
        data["size"] = self.size
    
        return json.dumps(data)