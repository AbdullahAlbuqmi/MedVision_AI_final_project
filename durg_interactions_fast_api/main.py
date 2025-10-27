from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd

# ==============================
# APP SETUP
# ==============================
app = FastAPI(
    title="Drug Interaction API",
    description="API for drug interaction analysis",
    version="1.0.0"
)

# Allow CORS for testing with frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================
# LOAD DATA
# ==============================
def load_data():
    # Load DDI data
    try:
        ddi_df = pd.read_csv("DDI_data.csv")
    except:
        ddi_data = {
            'drug1_name': ['Aspirin', 'Warfarin', 'Metformin', 'Lisinopril', 'Simvastatin', 
                          'Aspirin', 'Ibuprofen', 'Warfarin', 'Levothyroxine', 'Metoprolol',
                          'Omeprazole', 'Clopidogrel', 'Atorvastatin', 'Amlodipine', 'Furosemide'],
            'drug2_name': ['Ibuprofen', 'Aspirin', 'Insulin', 'Potassium', 'Gemfibrozil',
                          'Warfarin', 'Warfarin', 'Vitamin K', 'Calcium', 'Verapamil',
                          'Clopidogrel', 'Omeprazole', 'Clarithromycin', 'Simvastatin', 'Digoxin'],
            'interaction_type': ['Increased bleeding risk', 'Severe bleeding', 'Hypoglycemia', 
                                'Hyperkalemia', 'Rhabdomyolysis', 'Bleeding risk', 
                                'Bleeding risk', 'Reduced efficacy', 'Reduced absorption', 
                                'Bradycardia', 'Reduced antiplatelet effect', 'Reduced efficacy',
                                'Increased statin levels', 'Increased side effects', 'Electrolyte imbalance']
        }
        ddi_df = pd.DataFrame(ddi_data)
    
    # Load Saudi drugs database
    try:
        saudi_drugs_df = pd.read_csv("Complete_Saudi_Drugs_Database.csv")
    except:
        saudi_drugs_data = {
            'scientific_name': ['Aspirin', 'Warfarin', 'Metformin', 'Lisinopril', 'Simvastatin',
                               'Ibuprofen', 'Levothyroxine', 'Metoprolol', 'Omeprazole', 
                               'Clopidogrel', 'Atorvastatin', 'Amlodipine', 'Furosemide',
                               'Insulin', 'Digoxin', 'Verapamil', 'Clarithromycin',
                               'Acetylsalicylic acid', 'Acetaminophen', 'Amoxicillin'],
            'trade_name_saudi': ['Aspirin', 'Coumadin', 'Glucophage', 'Zestril', 'Zocor',
                                'Brufen', 'Eltroxin', 'Betaloc', 'Losec',
                                'Plavix', 'Lipitor', 'Norvasc', 'Lasix',
                                'Various brands', 'Lanoxin', 'Isoptin', 'Klacid',
                                'Aspirin', 'Panadol', 'Amoxil']
        }
        saudi_drugs_df = pd.DataFrame(saudi_drugs_data)
    
    return ddi_df, saudi_drugs_df

ddi_data, saudi_drugs = load_data()

# ==============================
# SEARCH FUNCTIONS
# ==============================
def search_drug_name(user_input: str):
    """Search for drug name - handles both scientific and brand names"""
    user_input = user_input.strip().lower()
    
    # Exact match in scientific names
    sci_match = saudi_drugs[saudi_drugs['scientific_name'].str.lower() == user_input]
    if not sci_match.empty:
        return sci_match.iloc[0]['scientific_name'], sci_match.iloc[0]['trade_name_saudi']
    
    # Exact match in brand names
    brand_match = saudi_drugs[saudi_drugs['trade_name_saudi'].str.lower() == user_input]
    if not brand_match.empty:
        return brand_match.iloc[0]['scientific_name'], brand_match.iloc[0]['trade_name_saudi']
    
    return None, None

def find_interactions(drug_name: str):
    sci_name, brand_name = search_drug_name(drug_name)
    if sci_name is None:
        return []

    # Check interactions
    mask1 = ddi_data['drug1_name'].str.lower().str.contains(sci_name.lower(), na=False)
    mask2 = ddi_data['drug2_name'].str.lower().str.contains(sci_name.lower(), na=False)
    results = pd.concat([ddi_data.loc[mask1], ddi_data.loc[mask2]]).drop_duplicates()
    
    if results.empty:
        return []
    
    # Add brand names
    results['drug1_brand'] = results['drug1_name'].apply(lambda x: search_drug_name(x)[1])
    results['drug2_brand'] = results['drug2_name'].apply(lambda x: search_drug_name(x)[1])
    
    return results.to_dict(orient="records")

def check_drug_interaction(drug1: str, drug2: str):
    sci1, brand1 = search_drug_name(drug1)
    sci2, brand2 = search_drug_name(drug2)
    
    if sci1 is None or sci2 is None:
        return None
    
    mask1 = (ddi_data['drug1_name'].str.lower() == sci1.lower()) & (ddi_data['drug2_name'].str.lower() == sci2.lower())
    mask2 = (ddi_data['drug1_name'].str.lower() == sci2.lower()) & (ddi_data['drug2_name'].str.lower() == sci1.lower())
    
    interaction = ddi_data[mask1 | mask2]
    if interaction.empty:
        return None
    
    row = interaction.iloc[0].to_dict()
    row['drug1_brand'] = brand1
    row['drug2_brand'] = brand2
    row['drug1_scientific'] = sci1
    row['drug2_scientific'] = sci2
    
    return row

# ==============================
# API MODELS
# ==============================
class DrugQuery(BaseModel):
    drug_name: str

class DrugCompareQuery(BaseModel):
    drug1: str
    drug2: str

# ==============================
# API ENDPOINTS
# ==============================
@app.get("/")
def home():
    return {"message": "💊 Drug Interaction API is running"}

@app.post("/search_drug")
def api_search_drug(query: DrugQuery):
    results = find_interactions(query.drug_name)
    return {"drug": query.drug_name, "interactions": results}

@app.post("/check_interaction")
def api_check_interaction(query: DrugCompareQuery):
    result = check_drug_interaction(query.drug1, query.drug2)
    return {"drug1": query.drug1, "drug2": query.drug2, "interaction": result}
