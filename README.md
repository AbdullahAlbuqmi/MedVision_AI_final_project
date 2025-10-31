# MedVision AI - Modular AI Medical Platform

**Final Project for Tuwaiq Academy data science and machine learning Bootcamp**  

A modular AI platform for **medical image analysis** (X-ray, MRI, CT, skin, eye), **drug interaction checks**, and a **bilingual Fine-tuned chatbot** (Arabic/English). Built with **FastAPI orchestration**, **PostgreSQL**, and integrations on **Render** & **Hugging Face**.

---

## Team Members

- **Abdullah Fhad Albuqmi**  
  Email: Albuqami49@outlook.com  
  Phone: +966556646950
  LinkedIn: https://www.linkedin.com/in/abdullah-albuqmi/

- **Khalid Mohammed Alshuraim**  
  Email: Khalidm.alshuraim@gmail.com  
  Phone: +966568450774
  LinkedIn: https://www.linkedin.com/in/khalid-alshuraim/

- **Reem Abdullah Alsaif**  
  Email: alsaiff.reem@gmail.com  
  Phone: +966556000324
  LinkedIn: https://www.linkedin.com/in/reem-alsaif-0013b7305/

- **Khalid Ahmed Khubrani**  
  Email: khalid.a.khubrani@gmail.com  
  Phone: +966557219174
  LinkedIn: https://www.linkedin.com/in/khalid-khubrani-66900131a/

- **Razan Mohammed Albishri**  
  Email: Razan_m99@hotmail.com  
  Phone: +966545099471
  LinkedIn: https://www.linkedin.com/in/razan-albishri-7b59a922b/

---

## Introduction

Our solution is providing an **integrated AI-powered medical assistant** combining:

- **Multilingual AI reasoning**
- **Visual analytics**
- **Advanced Medical Imaging Analysis**

Unlike traditional systems that offer static text results, this platform is **modular and scalable**, allowing each component to evolve independently and new healthcare features to be added over time.

---

## Core Technological Solutions

### Dual AI Clinical Chatbot System
- **DeepSeek 3.2v-685B**: Native Arabic & English understanding for complex clinical reasoning  
- **Fine-tuned TinyLLaMa-1B**: Optimized for rapid responses in English, with Arabic translation via Deep-Translator  
- **Unified Safety Framework**: Guardrails instructions to prevent hallucinations and ensure medically appropriate responses  
- **Context-Aware Dialog**: Maintains conversation context for follow-up questions and clinical scenarios  

### Advanced Medical Imaging Analysis – Multi-Modal
#### Chest X-ray Pathology Detection
- **Architecture**: HOG feature extraction + SVM classification  
- **Stack**: OpenCV for image processing  
- **Dataset**: Comprehensive pulmonary imaging collection  
- **Performance**: 96.29% accuracy  
- **Application**: Detects pneumonia, tuberculosis, and thoracic conditions  

#### Kidney Stone CT Detection
- **Architecture**: DenseNet121 with Fine-Tuning  
- **Dataset**: Kidney Stone CT Dataset (~4200 images, Kaggle)  
- **Performance**: 98.36% accuracy  
- **Application**: Kidney stone detection 

#### Brain Tumor MRI Detection
- **Architecture**: DenseNet121 with Transfer Learning  
- **Dataset**: Brain Tumor MRI Dataset (~7,000 images, Kaggle)   
- **Application**: Automated brain tumor classification   

#### Skin Disease Classification
- **Architecture**: Specialized neural networks  
- **Dataset**: Skin dataset (~750 images, Roboflow)  
- **Application**: Diagnose skin diseases from images  

#### Eye Disease Classification
- **Architecture**: Advanced computer vision models  
- **Dataset**: Eye-disease-classification (~1,200 images, Roboflow)  
- **Application**: Analyze eye images for disease diagnosis  

### Advanced Drug Conflict Detection & Visualization
- **Interaction Engine**: Retrieves and analyzes data from DrugBank  
- **Comparative Analysis**: Side-by-side drug compatibility matrices  

### Comprehensive Drug Documentation System
- **Structured Access**: Instant retrieval of medication details (indications, contraindications, side effects, classifications)  
- **Quick Reference**: Optimized for clinical environments  
- **Dataset**: DrugBank  

---

## Repository Structure

- `Brain_MRI/` – Brain tumor MRI detection models and scripts  
- `Eye_disease/` – Eye disease classification models  
- `LLM_chatbots/` – Fine-tuned bilingual chatbot implementation  
- `chest_xray_api/` – Chest X-ray detection API  
- `drug_description_fastapi/` – Drug interaction & description API  
- `final project EDA/` – Exploratory Data Analysis notebooks  
- `report/` – Project report and documentation  
- `skin_api/` – Skin disease classification API  
- `website/` – Web interface files  

---

## Installation & Setup

Navigate to -> website (file) -> README.md for Installation details.


Usage
```
Medical Imaging APIs: Send image files via FastAPI endpoints for diagnosis

Drug Interaction Checks: Query medications and get compatibility reports

Bilingual Chatbot: Ask clinical questions in Arabic or English for reasoning and guidance

Web Interface: Provides a unified access point for all modules
```
Technologies Used
```
Programming Languages: Python 3.11+

Frameworks: FastAPI, Pydantic, SQLAlchemy

Databases: PostgreSQL

AI/ML Libraries: Transformers, OpenCV, PyTorch, TensorFlow, Scikit-Learn

Deployment: Render, Hugging Face

Data Sources: Kaggle, Roboflow, DrugBank, Huggingface
```
---
## Project Poster:


![WhatsApp Image 2025-10-29 at 14 47 24_7f946a70](https://github.com/user-attachments/assets/29ee162f-ca72-4689-8b07-2627213545c1)

---

License
```
This project is licensed under the MIT License – see the LICENSE file for details.
```
