from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
import cv2
from skimage.feature import hog
from PIL import Image
import io

# -----------------------
# Initialize FastAPI
# -----------------------
app = FastAPI(title="Chest X-ray HOG-SVM Classifier")

# Allow frontend apps (like Lovable) to access this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change "*" to your frontend domain for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------
# Load Model
# -----------------------
model_path = "svm_hog_model.pkl"
try:
    clf = joblib.load(model_path)
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    clf = None

# -----------------------
# Helper function
# -----------------------
def preprocess_hog(image: Image.Image):
    """Preprocess the uploaded image and extract HOG features."""
    img = np.array(image.convert("L"))
    img = cv2.resize(img, (128, 128))
    features, _ = hog(
        img,
        orientations=9,
        pixels_per_cell=(8, 8),
        cells_per_block=(2, 2),
        visualize=True,
        block_norm='L2-Hys'
    )
    return features.reshape(1, -1)

# -----------------------
# API endpoint
# -----------------------
@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    if clf is None:
        return JSONResponse({"error": "Model not loaded"}, status_code=500)
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        features = preprocess_hog(image)
        pred = clf.predict(features)[0]
        label_map = {0: "Normal", 1: "Pneumonia"}
        result = label_map[int(pred)]
        return {"prediction": result}
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

# -----------------------
# Root endpoint
# -----------------------
@app.get("/")
def home():
    return {"message": "Chest X-ray HOG-SVM API is running!"}
