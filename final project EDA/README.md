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

---

**Note**: This dashboard is for educational and research purposes, visualizing published medical study findings.