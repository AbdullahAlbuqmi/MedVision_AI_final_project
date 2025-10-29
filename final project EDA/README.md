# Medical Knowledge & Diagnostic Performance Dashboard

A Streamlit-based dashboard for visualizing medical knowledge gaps and diagnostic performance metrics across various healthcare specialties.

## Features

- Interactive visualizations of medical study findings
- Multi-specialty coverage (Radiology, Nephrology, Dermatology, Ophthalmology, etc.)
- Bilingual support (English/Arabic)
- Multiple chart types (bar charts, pie charts, gauge charts, radar charts)
- Responsive layout

## Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

## Installation & Setup

1. **Clone or download the project files**
   - `EDA.py` (main dashboard file)
   - `requirements.txt` (dependencies)

2. **Create a virtual environment (recommended)**
   ```bash
   python -m venv medical_dashboard_env
   source medical_dashboard_env/bin/activate  # On Windows: medical_dashboard_env\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

## Running the Dashboard

1. **Navigate to the project directory**
   ```bash
   cd path/to/your/project
   ```

2. **Run the Streamlit application**
   ```bash
   streamlit run EDA.py
   ```

3. **Access the dashboard**
   - The application will automatically open in your default web browser
   - If not, navigate to: `http://localhost:8501`

## Usage

- **Language Toggle**: Click the "العربية / Switch to Arabic" button to switch between English and Arabic interfaces
- **Interactive Charts**: Hover over charts to see detailed information
- **Responsive Layout**: The dashboard automatically adjusts to your screen size

## Data Sources

The dashboard visualizes data from:
- PubMed research studies
- Discovery Journals
- MDPI publications  
- Saudi Cancer Registry
- Various medical specialty studies

## File Structure

```
project/
├── EDA.py                 # Main dashboard application
├── requirements.txt       # Python dependencies
└── README.md             # This file
```

## Troubleshooting

If you encounter issues:

1. **Ensure all dependencies are installed**:
   ```bash
   pip install --upgrade -r requirements.txt
   ```

2. **Check Python version**:
   ```bash
   python --version  # Should be 3.7+
   ```

3. **Port already in use**:
   ```bash
   streamlit run EDA.py --server.port 8502
   ```

## Support

For technical issues with running the dashboard, ensure you have:
- Stable internet connection (for loading Plotly charts)
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Sufficient system resources

## References:

```bash
References 
1. Inadequate Radiological Interpretation
•	Soudack, M., et al. "Who should be reading chest radiographs in the pediatric emergency department?" Pediatric Emergency Care, vol. 28, no. 6, 2012, pp. 539-542. DOI: 10.1097/PEC.0b013e31825a8c0a.
________________________________________
2. High Diagnostic Error Rates
•	Liu, Y., et al. "Referral for ophthalmology evaluation and visual sequelae in children with brain tumors." Journal of Pediatric Ophthalmology and Strabismus, vol. 56, no. 6, 2019, pp. 368-373. DOI: 10.3928/01913913-20191111-01.
________________________________________
3. Knowledge Deficiencies in Primary Care
•	Alotaibi, H. M., et al. "Assessment of primary care physicians' expertise in dermatology." Journal of Family Medicine and Community Health, vol. 10, no. 2, 2023, pp. 1-6. DOI: 10.15406/jfmch.2023.10.00372.
________________________________________
4. Technical Performance Gaps
•	Kjelle, E., et al. "The assessment of image quality and diagnostic value in X-ray imaging." Insights into Imaging, vol. 13, no. 1, 2022, pp. 1-9. DOI: 10.1186/s13244-022-01169-9.
________________________________________
5. Medication Safety Concerns
•	Aljadani, R., et al. "Prevalence of drug–drug interactions in geriatric patients at a tertiary care hospital." BMC Research Notes, vol. 11, no. 1, 2018, pp. 1-5. DOI: 10.1186/s13104-018-3342-5.
```
---

**Note**: This dashboard is for educational and research purposes, visualizing published medical study findings.