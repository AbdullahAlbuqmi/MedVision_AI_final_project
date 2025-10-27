import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import matplotlib.pyplot as plt
import seaborn as sns
from streamlit.components.v1 import html

# ==============================
# PAGE CONFIGURATION
# ==============================
st.set_page_config(
    page_title="Drug Interaction Dashboard", 
    page_icon="💊", 
    layout="wide",
    initial_sidebar_state="expanded"
)

# ==============================
# LANGUAGE SETTINGS
# ==============================
if 'language' not in st.session_state:
    st.session_state.language = 'English'

def toggle_language():
    if st.session_state.language == 'English':
        st.session_state.language = 'Arabic'
    else:
        st.session_state.language = 'English'

# Language dictionaries
english_text = {
    "title": "💊 Drug Interaction Dashboard & Analysis System",
    "dashboard": "📊 Data Analysis Dashboard",
    "chatbot": "💬 Drug Interaction Chatbot",
    "overview": "Data Overview",
    "rows": "Number of rows",
    "columns": "Number of columns",
    "missing": "Missing Values Analysis",
    "no_missing": "✅ No missing values found in the dataset",
    "missing_warning": "⚠️ There are {total_missing} missing values in the dataset",
    "duplicates": "Duplicate Rows Analysis",
    "no_duplicates": "✅ No duplicate rows found",
    "duplicates_warning": "⚠️ Found {duplicates} duplicate rows in the dataset",
    "unique_drugs": "Unique Drugs Analysis",
    "total_unique": "Total unique drugs",
    "stats": "Statistical Analysis",
    "top_drugs": "Top 15 Most Frequently Involved Drugs",
    "top_interactions": "Top 10 Most Common Interaction Types",
    "visualizations": "Advanced Visual Insights",
    "interaction_dist": "Distribution of Interaction Types",
    "drug_freq": "Drug Interaction Frequency Distribution",
    "chat_title": "Drug Interaction Analysis Chatbot",
    "chat_desc": "Enter drug names to check for potential interactions and safety information",
    "single_drug": "🔍 Single Drug Analysis",
    "two_drugs": "⚡ Two-Drug Interaction Check",
    "enter_drug": "Enter a drug name",
    "search_interactions": "Search for interactions",
    "no_interactions": "❌ No interactions found for",
    "interactions_found": "🔎 Drugs that interact with",
    "summary": "💡 Found {count} interaction(s) involving {drug}",
    "warning": "⚠️ Always consult a healthcare professional before combining medications",
    "enter_drug1": "Enter first drug name",
    "enter_drug2": "Enter second drug name",
    "check_interaction": "Check Interaction",
    "interaction_found": "🚨 INTERACTION FOUND",
    "no_interaction_found": "✅ NO INTERACTION FOUND",
    "interaction_type": "Interaction Type",
    "interaction_details": "Interaction Details",
    "safe_combination": "These drugs appear to be safe to use together",
    "consult_professional": "Consult your healthcare provider for personalized advice",
    "kpi_total_drugs": "Total Unique Drugs",
    "kpi_total_interactions": "Total Interactions",
    "kpi_avg_interactions": "Avg Interactions per Drug",
    "kpi_common_type": "Most Common Type"
}

arabic_text = {
    "title": "💊 لوحة تحليل تفاعلات الأدوية ونظام التحليل",
    "dashboard": "📊 لوحة تحليل البيانات",
    "chatbot": "💬 روبوت محادثة تفاعلات الأدوية",
    "overview": "نظرة عامة على البيانات",
    "rows": "عدد الصفوف",
    "columns": "عدد الأعمدة",
    "missing": "تحليل القيم المفقودة",
    "no_missing": "✅ لم يتم العثور على قيم مفقودة في مجموعة البيانات",
    "missing_warning": "⚠️ هناك {total_missing} قيم مفقودة في مجموعة البيانات",
    "duplicates": "تحليل الصفوف المكررة",
    "no_duplicates": "✅ لم يتم العثور على صفوف مكررة",
    "duplicates_warning": "⚠️ تم العثور على {duplicates} صف مكرر في مجموعة البيانات",
    "unique_drugs": "تحليل الأدوية الفريدة",
    "total_unique": "إجمالي الأدوية الفريدة",
    "stats": "التحليل الإحصائي",
    "top_drugs": "أكثر 15 دواء مشاركة في التفاعلات",
    "top_interactions": "أكثر 10 أنواع تفاعل شيوعاً",
    "visualizations": "رؤى بصرية متقدمة",
    "interaction_dist": "توزيع أنواع التفاعل",
    "drug_freq": "توزيع تكرار تفاعلات الأدوية",
    "chat_title": "روبوت تحليل تفاعلات الأدوية",
    "chat_desc": "أدخل أسماء الأدوية للتحقق من التفاعلات المحتملة ومعلومات السلامة",
    "single_drug": "🔍 تحليل دواء واحد",
    "two_drugs": "⚡ فحص تفاعل دوائين",
    "enter_drug": "أدخل اسم الدواء",
    "search_interactions": "البحث عن التفاعلات",
    "no_interactions": "❌ لم يتم العثور على تفاعلات لـ",
    "interactions_found": "🔎 الأدوية التي تتفاعل مع",
    "summary": "💡 تم العثور على {count} تفاعل(ات) تشمل {drug}",
    "warning": "⚠️ استشر دائماً أخصائي الرعاية الصحية قبل الجمع بين الأدوية",
    "enter_drug1": "أدخل اسم الدواء الأول",
    "enter_drug2": "أدخل اسم الدواء الثاني",
    "check_interaction": "فحص التفاعل",
    "interaction_found": "🚨 تم العثور على تفاعل",
    "no_interaction_found": "✅ لم يتم العثور على تفاعل",
    "interaction_type": "نوع التفاعل",
    "interaction_details": "تفاصيل التفاعل",
    "safe_combination": "هذه الأدوية تبدو آمنة للاستخدام معاً",
    "consult_professional": "استشر مقدم الرعاية الصحية الخاص بك للحصول على نصيحة مخصصة",
    "kpi_total_drugs": "إجمالي الأدوية الفريدة",
    "kpi_total_interactions": "إجمالي التفاعلات",
    "kpi_avg_interactions": "متوسط التفاعلات لكل دواء",
    "kpi_common_type": "النوع الأكثر شيوعاً"
}

def get_text(key):
    return arabic_text[key] if st.session_state.language == 'Arabic' else english_text[key]

# ==============================
# LOAD DATA
# ==============================
@st.cache_data
def load_data():
    # Create sample data if file doesn't exist
    try:
        df = pd.read_csv("DDI_data.csv")
    except:
        # Sample data for demonstration
        data = {
            'drug1_name': ['Aspirin', 'Warfarin', 'Metformin', 'Lisinopril', 'Simvastatin', 
                          'Aspirin', 'Ibuprofen', 'Warfarin', 'Levothyroxine', 'Metoprolol'],
            'drug2_name': ['Ibuprofen', 'Aspirin', 'Insulin', 'Potassium', 'Gemfibrozil',
                          'Warfarin', 'Warfarin', 'Vitamin K', 'Calcium', 'Verapamil'],
            'interaction_type': ['Increased bleeding risk', 'Severe bleeding', 'Hypoglycemia', 
                                'Hyperkalemia', 'Rhabdomyolysis', 'Bleeding risk', 
                                'Bleeding risk', 'Reduced efficacy', 'Reduced absorption', 
                                'Bradycardia']
        }
        df = pd.DataFrame(data)
    return df

data = load_data()

# ==============================
# SIDEBAR - LANGUAGE TOGGLE
# ==============================
with st.sidebar:
    st.header("🌐 Language Settings")
    if st.button("🔄 Switch to Arabic" if st.session_state.language == 'English' else "🔄 التبديل إلى الإنجليزية"):
        toggle_language()
    
    st.markdown("---")
    st.header("📈 Quick Stats")
    
    # Calculate metrics
    unique_drugs = pd.unique(data[['drug1_name', 'drug2_name']].values.ravel('K'))
    total_interactions = len(data)
    drug_counts = pd.concat([data['drug1_name'], data['drug2_name']]).value_counts()
    avg_interactions = round(drug_counts.mean(), 2)
    most_common_type = data['interaction_type'].value_counts().index[0]
    
    st.metric(get_text("kpi_total_drugs"), len(unique_drugs))
    st.metric(get_text("kpi_total_interactions"), total_interactions)
    st.metric(get_text("kpi_avg_interactions"), avg_interactions)
    st.metric(get_text("kpi_common_type"), most_common_type[:20] + "..." if len(most_common_type) > 20 else most_common_type)

# ==============================
# HEADER WITH KPIs
# ==============================
st.title(get_text("title"))

# KPI Cards
col1, col2, col3, col4 = st.columns(4)

with col1:
    st.metric(
        label=get_text("kpi_total_drugs"), 
        value=len(unique_drugs),
        delta=f"{len(unique_drugs)} unique medications"
    )

with col2:
    st.metric(
        label=get_text("kpi_total_interactions"), 
        value=total_interactions,
        delta="total recorded"
    )

with col3:
    st.metric(
        label=get_text("kpi_avg_interactions"), 
        value=avg_interactions,
        delta="per drug average"
    )

with col4:
    st.metric(
        label=get_text("kpi_common_type"), 
        value=most_common_type[:15] + "..." if len(most_common_type) > 15 else most_common_type
    )

# ==============================
# TABS (Dashboard + Chatbot)
# ==============================
tab1, tab2 = st.tabs([get_text("dashboard"), get_text("chatbot")])

# ==============================
# TAB 1: DATA ANALYSIS
# ==============================
with tab1:
    st.header("📈 " + get_text("overview"))
    
    # Data Preview
    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.subheader("📋 Data Sample")
        st.dataframe(data.head(10), use_container_width=True)
    
    with col2:
        st.subheader("🔍 Data Summary")
        st.write(f"**{get_text('rows')}:** {data.shape[0]:,}")
        st.write(f"**{get_text('columns')}:** {data.shape[1]}")
        
        # Data Quality Indicators
        missing_total = data.isnull().sum().sum()
        duplicates = data.duplicated().sum()
        
        if missing_total == 0:
            st.success("✅ " + get_text("no_missing"))
        else:
            st.warning(get_text("missing_warning").format(total_missing=missing_total))
            
        if duplicates == 0:
            st.success("✅ " + get_text("no_duplicates"))
        else:
            st.warning(get_text("duplicates_warning").format(duplicates=duplicates))
        
        st.info(f"💊 **{get_text('total_unique')}:** {len(unique_drugs):,}")

    # ==============================
    # STATISTICAL ANALYSIS
    # ==============================
    st.header("📊 " + get_text("stats"))
    
    col1, col2 = st.columns(2)
    
    with col1:
        # Most frequent drugs - Plotly
        st.subheader("💊 " + get_text("top_drugs"))
        drug_counts = pd.concat([data['drug1_name'], data['drug2_name']]).value_counts().head(15)
        
        fig = px.bar(
            x=drug_counts.values,
            y=drug_counts.index,
            orientation='h',
            title="Most Frequently Interacting Drugs",
            labels={'x': 'Number of Interactions', 'y': 'Drug Name'},
            color=drug_counts.values,
            color_continuous_scale='viridis'
        )
        fig.update_layout(height=500)
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        # Most common interaction types - Plotly
        st.subheader("🔄 " + get_text("top_interactions"))
        interaction_counts = data['interaction_type'].value_counts().head(10)
        
        fig = px.pie(
            values=interaction_counts.values,
            names=interaction_counts.index,
            title="Distribution of Interaction Types",
            hole=0.4
        )
        fig.update_traces(textposition='inside', textinfo='percent+label')
        st.plotly_chart(fig, use_container_width=True)

    # ==============================
    # ADVANCED VISUALIZATIONS
    # ==============================
    st.header("📈 " + get_text("visualizations"))
    
    col1, col2 = st.columns(2)
    
    with col1:
        # Interaction Type Distribution - Plotly
        st.subheader("📊 " + get_text("interaction_dist"))
        top_interactions = data['interaction_type'].value_counts().head(10)
        
        fig = px.bar(
            x=top_interactions.values,
            y=top_interactions.index,
            orientation='h',
            title="Top 10 Interaction Types",
            labels={'x': 'Count', 'y': 'Interaction Type'},
            color=top_interactions.values,
            color_continuous_scale='blues'
        )
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        # Drug Frequency Distribution - Plotly
        st.subheader("📈 " + get_text("drug_freq"))
        
        fig = px.histogram(
            x=drug_counts.values,
            nbins=20,
            title="Distribution of Drug Interaction Frequencies",
            labels={'x': 'Number of Interactions per Drug', 'y': 'Count'},
            color_discrete_sequence=['#FF6B6B']
        )
        fig.update_layout(height=400, showlegend=False)
        st.plotly_chart(fig, use_container_width=True)

    # Network Analysis (Simplified)
    st.subheader("🕸️ Drug Interaction Network Overview")
    
    # Create a simple network summary
    interaction_matrix = pd.crosstab(data['drug1_name'], data['drug2_name'])
    top_drugs_network = drug_counts.head(8).index
    
    st.write("**Top Drugs Interaction Matrix (Sample)**")
    sample_matrix = interaction_matrix.loc[top_drugs_network, top_drugs_network]
    st.dataframe(sample_matrix.replace(0, ""), use_container_width=True)

# ==============================
# TAB 2: CHATBOT
# ==============================
with tab2:
    st.header("💬 " + get_text("chat_title"))
    st.write(get_text("chat_desc"))
    
    # Two modes for the chatbot
    mode = st.radio(
        "Select Analysis Mode:",
        [get_text("single_drug"), get_text("two_drugs")],
        horizontal=True
    )
    
    # --- Search Functions ---
    def find_interactions(drug_name: str):
        drug_name = drug_name.strip().lower()
        
        mask1 = data['drug1_name'].str.lower().str.contains(drug_name, na=False)
        mask2 = data['drug2_name'].str.lower().str.contains(drug_name, na=False)
        
        results = pd.concat([
            data.loc[mask1, ['drug1_name', 'drug2_name', 'interaction_type']],
            data.loc[mask2, ['drug1_name', 'drug2_name', 'interaction_type']]
        ])
        
        if results.empty:
            return None
        else:
            results.drop_duplicates(inplace=True)
            return results
    
    def check_drug_interaction(drug1: str, drug2: str):
        drug1, drug2 = drug1.strip().lower(), drug2.strip().lower()
        
        # Check both directions
        mask1 = (data['drug1_name'].str.lower() == drug1) & (data['drug2_name'].str.lower() == drug2)
        mask2 = (data['drug1_name'].str.lower() == drug2) & (data['drug2_name'].str.lower() == drug1)
        
        interaction = data[mask1 | mask2]
        
        if interaction.empty:
            return None
        else:
            return interaction.iloc[0]
    
    if mode == get_text("single_drug"):
        # Single drug analysis
        st.subheader("🔍 " + get_text("single_drug"))
        
        drug_input = st.text_input(
            get_text("enter_drug"),
            placeholder="e.g., Aspirin, Warfarin, Metformin...",
            key="single_drug_input"
        )
        
        if st.button(get_text("search_interactions"), type="primary"):
            if drug_input:
                with st.spinner("🔍 Searching for interactions..."):
                    results = find_interactions(drug_input)
                
                if results is None:
                    st.error(f"❌ {get_text('no_interactions')} **{drug_input}**.")
                else:
                    st.success(f"🔎 {get_text('interactions_found')} **{drug_input.capitalize()}**")
                    
                    # Display results in an elegant way
                    tab1, tab2 = st.tabs(["📊 Summary View", "📋 Detailed Table"])
                    
                    with tab1:
                        # Summary metrics
                        col1, col2, col3 = st.columns(3)
                        with col1:
                            st.metric("Total Interactions", len(results))
                        with col2:
                            st.metric("Unique Drugs Involved", len(results['drug2_name'].unique()))
                        with col3:
                            st.metric("Interaction Types", len(results['interaction_type'].unique()))
                        
                        # Visualize the interactions
                        interaction_summary = results['interaction_type'].value_counts()
                        fig = px.pie(
                            values=interaction_summary.values,
                            names=interaction_summary.index,
                            title=f"Interaction Types for {drug_input.capitalize()}"
                        )
                        st.plotly_chart(fig, use_container_width=True)
                    
                    with tab2:
                        # Detailed table
                        st.dataframe(
                            results.reset_index(drop=True),
                            use_container_width=True,
                            column_config={
                                "drug1_name": "Drug 1",
                                "drug2_name": "Drug 2", 
                                "interaction_type": "Interaction Type"
                            }
                        )
                    
                    # Safety warning
                    st.warning("⚠️ " + get_text("warning"))
            else:
                st.warning("⚠️ Please enter a drug name to search.")
    
    else:
        # Two-drug interaction check
        st.subheader("⚡ " + get_text("two_drugs"))
        
        col1, col2 = st.columns(2)
        
        with col1:
            drug1 = st.text_input(
                get_text("enter_drug1"),
                placeholder="e.g., Aspirin",
                key="drug1_input"
            )
        
        with col2:
            drug2 = st.text_input(
                get_text("enter_drug2"),
                placeholder="e.g., Warfarin", 
                key="drug2_input"
            )
        
        if st.button(get_text("check_interaction"), type="primary"):
            if drug1 and drug2:
                with st.spinner("🔍 Analyzing drug interaction..."):
                    interaction = check_drug_interaction(drug1, drug2)
                
                # Results container
                result_container = st.container()
                
                with result_container:
                    if interaction is not None:
                        # INTERACTION FOUND
                        st.error("")
                        col1, col2 = st.columns([1, 4])
                        
                        with col1:
                            st.error("🚨")
                        with col2:
                            st.error(f"**{get_text('interaction_found')}**")
                        
                        # Interaction details
                        st.subheader("📋 " + get_text("interaction_details"))
                        
                        col1, col2, col3 = st.columns(3)
                        with col1:
                            st.info(f"**Drug 1:**\n\n{interaction['drug1_name']}")
                        with col2:
                            st.info(f"**Drug 2:**\n\n{interaction['drug2_name']}")
                        with col3:
                            st.error(f"**{get_text('interaction_type')}:**\n\n{interaction['interaction_type']}")
                        
                        # Safety warning
                        st.warning("""
                        🚨 **Important Safety Information:**
                        
                        - Do not combine these medications without medical supervision
                        - Contact your healthcare provider immediately
                        - Monitor for adverse effects
                        - Report any unusual symptoms
                        """)
                        
                    else:
                        # NO INTERACTION FOUND
                        st.success("")
                        col1, col2 = st.columns([1, 4])
                        
                        with col1:
                            st.success("✅")
                        with col2:
                            st.success(f"**{get_text('no_interaction_found')}**")
                        
                        st.info(f"""
                        💚 **{get_text('safe_combination')}**
                        
                        - No known interactions found between **{drug1.capitalize()}** and **{drug2.capitalize()}**
                        - {get_text('consult_professional')}
                        """)
            else:
                st.warning("⚠️ Please enter both drug names to check for interactions.")

# ==============================
# CUSTOM CSS FOR BETTER STYLING
# ==============================
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        color: #1f77b4;
        text-align: center;
        margin-bottom: 2rem;
    }
    .metric-card {
        background-color: #f0f2f6;
        padding: 1rem;
        border-radius: 10px;
        border-left: 4px solid #1f77b4;
    }
    .interaction-alert {
        background-color: #ffebee;
        padding: 1rem;
        border-radius: 10px;
        border-left: 4px solid #f44336;
    }
    .safe-combination {
        background-color: #e8f5e8;
        padding: 1rem;
        border-radius: 10px;
        border-left: 4px solid #4caf50;
    }
</style>
""", unsafe_allow_html=True)

# Footer
st.markdown("---")
st.markdown(
    """
    <div style='text-align: center; color: #666;'>
        <p>💊 Drug Interaction Dashboard | Always consult healthcare professionals for medical advice</p>
    </div>
    """, 
    unsafe_allow_html=True
)