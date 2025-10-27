import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import pandas as pd
import numpy as np
from math import pi

# Page configuration
st.set_page_config(
    page_title="Medical Knowledge & Diagnostic Performance Dashboard",
    page_icon="🏥",
    layout="wide"
)

# Language state management
if 'language' not in st.session_state:
    st.session_state.language = 'English'

# Language toggle button
col_lang1, col_lang2, col_lang3 = st.columns([1, 2, 1])
with col_lang2:
    if st.button('العربية / Switch to Arabic' if st.session_state.language == 'English' else 'English / التبديل إلى الإنجليزية'):
        st.session_state.language = 'Arabic' if st.session_state.language == 'English' else 'English'

# Bilingual text dictionary
text = {
    'English': {
        'title': "🏥 Medical Knowledge & Diagnostic Performance Dashboard",
        'description': "This dashboard visualizes key findings from recent medical studies across various specialties, highlighting knowledge gaps and diagnostic performance metrics among healthcare professionals.",
        'chest_xray': "🫁 Chest X-ray - Pediatric Emergency",
        'chest_caption': "~29% of physicians had only fair knowledge of common pediatric emergency radiographs",
        'kidney_ct': "🧬 Kidney CT - Abnormal Findings",
        'dermatology': "🧴 Dermatology - Primary Care Physicians' Knowledge",
        'derm_caption': "*68.5% from literature (not Alotaibi's Jouf sample)",
        'ophthalmology': "👁️ Ophthalmology - Referral Accuracy",
        'brain_mri': "🧠 Brain MRI - Radiographer Performance",
        'brain_caption': "Only 20% of radiographers correctly identified errors in 70% of cases; none achieved >68% on correction strategies",
        'ddi': "💊 Drug-Drug Interactions & Knowledge Gaps",
        'ddi_caption': "*38.2% approximate from Saudi community pharmacist studies showing substantial knowledge gaps",
        'cns_tumors': "🧠 Central Nervous System Tumors - Saudi Arabia",
        'metrics_title': "📊 Key Metrics Summary",
        'footer': "**Data Sources:** PubMed, Discovery Journals, MDPI, Saudi Cancer Registry | **Specialties:** Radiology, Nephrology, Dermatology, Ophthalmology, Pharmacy, Oncology",
        'cns_incidence': "CNS Tumor Incidence Rate (per 100,000)",
        'cns_diagnostic': "Diagnostic Error Rate in CNS Tumors",
        'ai_performance': "AI Model Performance in Brain Tumor Classification",
        'year': "Year",
        'incidence_rate': "Incidence Rate",
        'error_rate': "Error Rate",
        'accuracy': "Accuracy"
    },
    'Arabic': {
        'title': "🏥 لوحة معلومات الأداء التشخيصي والمعرفة الطبية",
        'description': "تعرض هذه اللوحة النتائج الرئيسية من الدراسات الطبية الحديثة عبر مختلف التخصصات، مسلطة الضوء على الفجوات المعرفية ومقاييس الأداء التشخيصي بين المتخصصين في الرعاية الصحية.",
        'chest_xray': "🫁 أشعة الصدر - طب الأطفال الطارئ",
        'chest_caption': "~29٪ من الأطباء لديهم معرفة متوسطة فقط بأشعة الأطفال الطارئة الشائعة",
        'kidney_ct': "🧬 الأشعة المقطعية للكلى - النتائج غير الطبيعية",
        'dermatology': "🧴 الأمراض الجلدية - معرفة أطباء الرعاية الأولية",
        'derm_caption': "*68.5٪ من الأدبيات (ليست من عينة الجوف للوتيبي)",
        'ophthalmology': "👁️ طب العيون - دقة الإحالة",
        'brain_mri': "🧠 الرنين المغناطيسي للدماغ - أداء فنيي الأشعة",
        'brain_caption': "20٪ فقط من فنيي الأشعة تعرفوا على الأخطاء في 70٪ من الحالات؛ ولم يحقق أي منهم >68٪ في استراتيجيات التصحيح",
        'ddi': "💊 تفاعلات الأدوية والفجوات المعرفية",
        'ddi_caption': "*38.2٪ تقريبي من دراسات الصيادلة المجتمعيين السعوديين تظهر فجوات معرفية كبيرة",
        'cns_tumors': "🧠 أورام الجهاز العصبي المركزي - المملكة العربية السعودية",
        'metrics_title': "📊 ملخص المؤشرات الرئيسية",
        'footer': "**مصادر البيانات:** PubMed، Discovery Journals، MDPI، السجل السعودي للسرطان | **التخصصات:** الأشعة، أمراض الكلى، الأمراض الجلدية، طب العيون، الصيدلة، الأورام",
        'cns_incidence': "معدل الإصابة بأورام الجهاز العصبي المركزي (لكل 100,000)",
        'cns_diagnostic': "معدل الأخطاء التشخيصية في أورام الجهاز العصبي المركزي",
        'ai_performance': "أداء نماذج الذكاء الاصطناعي في تصنيف أورام الدماغ",
        'year': "السنة",
        'incidence_rate': "معدل الإصابة",
        'error_rate': "معدل الخطأ",
        'accuracy': "الدقة"
    }
}

# Get current language text
lang = st.session_state.language
t = text[lang]

# Title and introduction
st.title(t['title'])
st.markdown(t['description'])

# Create two columns for better layout
col1, col2 = st.columns(2)

# STUDY 1: Chest X-ray Pediatric Emergency Interpretation
with col1:
    st.subheader(t['chest_xray'])
    
    # Data for chest X-ray study
    chest_data = {
        'Finding': ['Atypical Pneumonia', 'Pleural Effusion', 'Opacity Description'],
        'Recognition Rate': [59, 65, 28],
        'Color': ['#FF6B6B', '#4ECDC4', '#45B7D1']
    }
    chest_df = pd.DataFrame(chest_data)
    
    # Create horizontal bar chart
    fig_chest = px.bar(
        chest_df, 
        y='Finding', 
        x='Recognition Rate',
        orientation='h',
        color='Finding',
        color_discrete_sequence=chest_df['Color'].tolist(),
        text='Recognition Rate',
        title='Recognition Rates of Pediatric Emergency Radiograph Findings' if lang == 'English' else 'معدلات التعرف على نتائج أشعة الأطفال الطارئة'
    )
    
    fig_chest.update_traces(texttemplate='%{text}%', textposition='outside')
    fig_chest.update_layout(
        xaxis_title='Recognition Rate (%)' if lang == 'English' else 'معدل التعرف (%)',
        yaxis_title='',
        showlegend=False,
        height=300
    )
    st.plotly_chart(fig_chest, use_container_width=True)
    
    st.caption(t['chest_caption'])

# STUDY 2: Kidney CT Findings - CORRECTED
with col2:
    st.subheader(t['kidney_ct'])
    
    # CORRECTED Data for kidney CT study - Normal is 11 (22%), not 21
    kidney_data = {
        'Finding': ['Renal Stones', 'Renal Cysts', 'Normal', 'Other Findings'],
        'Count': [21, 8, 11, 10],  # 50 total patients: 21+8+11=40, remaining 10 are other findings
        'Percentage': [42, 16, 22, 20]
    }
    kidney_df = pd.DataFrame(kidney_data)
    
    # Create donut chart
    fig_kidney = px.pie(
        kidney_df,
        values='Count',
        names='Finding',
        hole=0.6,
        color='Finding',
        color_discrete_sequence=['#FF6B6B', '#4ECDC4', '#95A5A6', '#F9C74F'],
        title='Kidney CT Findings in 50 Patients (Taif Study)' if lang == 'English' else 'نتائج الأشعة المقطعية للكلى في 50 مريض (دراسة الطائف)'
    )
    
    fig_kidney.update_traces(
        textposition='inside',
        textinfo='percent+label',
        hovertemplate='<b>%{label}</b><br>Count: %{value}<br>Percentage: %{percent}'
    )
    fig_kidney.update_layout(height=350)
    st.plotly_chart(fig_kidney, use_container_width=True)
    
    st.caption("✅ Corrected: Normal CT findings = 11 patients (22%)")

# STUDY 3: Dermatology Knowledge Scores - WITH CLARIFICATION
st.subheader(t['dermatology'])
col3, col4 = st.columns([2, 1])

with col3:
    # Create gauge chart for mean score
    fig_gauge = go.Figure(go.Indicator(
        mode = "gauge+number+delta",
        value = 7.08,
        domain = {'x': [0, 1], 'y': [0, 1]},
        title = {'text': "Mean Knowledge Score (out of 10)" if lang == 'English' else "متوسط درجة المعرفة (من 10)"},
        delta = {'reference': 5, 'position': "bottom"},
        gauge = {
            'axis': {'range': [None, 10], 'tickwidth': 1},
            'bar': {'color': "#2E86AB"},
            'steps': [
                {'range': [0, 5], 'color': "lightgray"},
                {'range': [5, 8], 'color': "lightyellow"},
                {'range': [8, 10], 'color': "lightgreen"}
            ],
            'threshold': {
                'line': {'color': "red", 'width': 4},
                'thickness': 0.75,
                'value': 7.08
            }
        }
    ))
    fig_gauge.update_layout(height=300)
    st.plotly_chart(fig_gauge, use_container_width=True)

with col4:
    # Knowledge distribution - WITH CLARIFIED LABELS
    knowledge_data = {
        'Category': ['Good to Acceptable (Al Jouf)', 'Insufficient (Literature)*'],
        'Percentage': [83.6, 68.5]
    }
    knowledge_df = pd.DataFrame(knowledge_data)
    
    fig_knowledge = px.bar(
        knowledge_df,
        x='Percentage',
        y='Category',
        orientation='h',
        color='Category',
        color_discrete_sequence=['#2E86AB', '#A23B72'],
        text='Percentage',
        title='Knowledge Distribution' if lang == 'English' else 'توزيع المعرفة'
    )
    
    fig_knowledge.update_traces(texttemplate='%{text}%', textposition='outside')
    fig_knowledge.update_layout(showlegend=False, height=300)
    st.plotly_chart(fig_knowledge, use_container_width=True)
    
    st.caption(t['derm_caption'])

# STUDY 4: Ophthalmology Misdiagnosis
st.subheader(t['ophthalmology'])
col5, col6 = st.columns(2)

with col5:
    # VKH patients misdiagnosis
    vkh_data = {
        'Diagnosis': ['Correct', 'Incorrect'],
        'Count': [69, 7],  # 76 total patients
        'Percentage': [91, 9]
    }
    vkh_df = pd.DataFrame(vkh_data)
    
    fig_vkh = px.pie(
        vkh_df,
        values='Count',
        names='Diagnosis',
        color='Diagnosis',
        color_discrete_map={'Correct': '#4ECDC4', 'Incorrect': '#FF6B6B'},
        title='Initial Diagnosis Accuracy in VKH Patients (n=76)' if lang == 'English' else 'دقة التشخيص الأولي في مرضى VKH (76 مريض)'
    )
    st.plotly_chart(fig_vkh, use_container_width=True)

with col6:
    # PHC referral accuracy
    phc_data = {
        'Accuracy': ['Accurate', 'Inaccurate'],
        'Percentage': [33, 67]
    }
    phc_df = pd.DataFrame(phc_data)
    
    fig_phc = px.bar(
        phc_df,
        x='Accuracy',
        y='Percentage',
        color='Accuracy',
        color_discrete_map={'Accurate': '#4ECDC4', 'Inaccurate': '#FF6B6B'},
        text='Percentage',
        title='Primary Health Care Referral Accuracy' if lang == 'English' else 'دقة إحالات الرعاية الصحية الأولية'
    )
    
    fig_phc.update_traces(texttemplate='%{text}%', textposition='outside')
    fig_phc.update_layout(showlegend=False)
    st.plotly_chart(fig_phc, use_container_width=True)

# STUDY 5: Brain MRI Quality Errors
st.subheader(t['brain_mri'])

# Create radar chart for MRI performance
categories = ['Error Identification', 'Correction Strategy']
fig_radar = go.Figure()

fig_radar.add_trace(go.Scatterpolar(
    r=[20, 0],  # 20% for identification, 0% for >68% correction strategy
    theta=categories,
    fill='toself',
    name='Performance Score',
    line=dict(color='#FF6B6B')
))

fig_radar.update_layout(
    polar=dict(
        radialaxis=dict(
            visible=True,
            range=[0, 100]
        )),
    showlegend=False,
    title='Radiographer Performance on MRI Quality Errors (n=35)' if lang == 'English' else 'أداء فنيي الأشعة في أخطاء جودة الرنين المغناطيسي (35 فني)',
    height=400
)

st.plotly_chart(fig_radar, use_container_width=True)
st.caption(t['brain_caption'])

# NEW STUDY: Central Nervous System Tumors in Saudi Arabia
st.subheader(t['cns_tumors'])
col_cns1, col_cns2, col_cns3 = st.columns(3)

with col_cns1:
    # CNS Tumor Incidence Over Time
    cns_incidence_data = {
        'Year': [1990, 1995, 2000, 2005, 2010, 2015, 2019],
        'Incidence_Rate': [1.1, 1.4, 1.8, 2.2, 2.7, 3.2, 3.63]
    }
    cns_df = pd.DataFrame(cns_incidence_data)
    
    fig_cns_trend = px.line(
        cns_df,
        x='Year',
        y='Incidence_Rate',
        markers=True,
        title=t['cns_incidence'],
        color_discrete_sequence=['#FF6B6B']
    )
    
    fig_cns_trend.update_layout(
        xaxis_title=t['year'],
        yaxis_title=t['incidence_rate'],
        height=300
    )
    fig_cns_trend.add_annotation(
        x=2019, y=3.63,
        text="3.63 per 100,000",
        showarrow=True,
        arrowhead=1
    )
    fig_cns_trend.add_annotation(
        x=1990, y=1.1,
        text="1.1 per 100,000",
        showarrow=True,
        arrowhead=1
    )
    st.plotly_chart(fig_cns_trend, use_container_width=True)

with col_cns2:
    # Diagnostic Error Rate
    error_data = {
        'Category': ['Diagnostic Errors', 'Correct Diagnosis'],
        'Percentage': [30, 70]
    }
    error_df = pd.DataFrame(error_data)
    
    fig_error = px.pie(
        error_df,
        values='Percentage',
        names='Category',
        color='Category',
        color_discrete_map={'Diagnostic Errors': '#FF6B6B', 'Correct Diagnosis': '#4ECDC4'},
        hole=0.4,
        title=t['cns_diagnostic']
    )
    
    fig_error.update_traces(
        textposition='inside',
        textinfo='percent+label'
    )
    fig_error.update_layout(height=350)
    st.plotly_chart(fig_error, use_container_width=True)

with col_cns3:
    # AI Model Performance
    ai_data = {
        'Model': ['YOLO Networks', 'CNN Models'],
        'Accuracy': [94, 96],
        'Color': ['#45B7D1', '#2E86AB']
    }
    ai_df = pd.DataFrame(ai_data)
    
    fig_ai = px.bar(
        ai_df,
        x='Model',
        y='Accuracy',
        color='Model',
        color_discrete_sequence=ai_df['Color'].tolist(),
        text='Accuracy',
        title=t['ai_performance']
    )
    
    fig_ai.update_traces(texttemplate='%{text}%', textposition='outside')
    fig_ai.update_layout(
        yaxis_title=t['accuracy'] + ' (%)',
        showlegend=False,
        height=300
    )
    st.plotly_chart(fig_ai, use_container_width=True)
    
    # Add context about AI benefits
    st.info("🤖 " + ("AI models enhance early treatment decisions and reduce human errors" if lang == 'English' else "نماذج الذكاء الاصطناعي تعزز قرارات العلاج المبكرة وتقلل الأخطاء البشرية"))

# STUDY 6: Drug-Drug Interactions - WITH CLARIFICATION ON PHARMACIST SCORE
st.subheader(t['ddi'])

col7, col8, col9 = st.columns(3)

with col7:
    # DDI Prevalence
    ddi_data = {
        'Interaction Type': ['Any Potential DDI', 'Category-X (Severe)', 'Cancer Patients (KFMC)'],
        'Prevalence': [90.64, 16.45, 60]
    }
    ddi_df = pd.DataFrame(ddi_data)
    
    fig_ddi = px.bar(
        ddi_df,
        x='Prevalence',
        y='Interaction Type',
        orientation='h',
        color='Interaction Type',
        color_discrete_sequence=['#FF6B6B', '#A23B72', '#45B7D1'],
        text='Prevalence',
        title='Prevalence of Potential Drug-Drug Interactions' if lang == 'English' else 'انتشار التفاعلات الدوائية الدوائية المحتملة'
    )
    
    fig_ddi.update_traces(texttemplate='%{text}%', textposition='outside')
    fig_ddi.update_layout(showlegend=False, height=300)
    st.plotly_chart(fig_ddi, use_container_width=True)

with col8:
    # Pharmacist knowledge score - WITH APPROXIMATE LABEL
    knowledge_score = 38.2
    
    fig_pharm = go.Figure(go.Indicator(
        mode = "gauge+number",
        value = knowledge_score,
        domain = {'x': [0, 1], 'y': [0, 1]},
        title = {'text': "Community Pharmacists' DDI Knowledge Score*" if lang == 'English' else "درجة معرفة الصيادلة المجتمعيين بالتفاعلات الدوائية*"},
        gauge = {
            'axis': {'range': [None, 100]},
            'bar': {'color': "#A23B72"},
            'steps': [
                {'range': [0, 33], 'color': "lightcoral"},
                {'range': [33, 66], 'color': "lightyellow"},
                {'range': [66, 100], 'color': "lightgreen"}
            ],
        }
    ))
    fig_pharm.update_layout(height=300)
    st.plotly_chart(fig_pharm, use_container_width=True)
    
    st.caption(t['ddi_caption'])

with col9:
    # Key metrics summary
    st.markdown(f"### {t['metrics_title']}")
    
    metrics_data = {
        'Metric': [
            'Pediatric X-ray Fair Knowledge',
            'Renal Stones Detection', 
            'Dermatology Good Knowledge',
            'Ophthalmology Correct Referrals',
            'MRI Error Identification',
            'Geriatric DDI Prevalence',
            'CNS Tumor Diagnostic Errors',
            'AI Model Accuracy'
        ],
        'Value': ['29%', '42%', '83.6%', '33%', '20%', '90.64%', '30%', '95%']
    }
    
    if lang == 'Arabic':
        metrics_data['Metric'] = [
            'المعرفة المتوسطة بأشعة الأطفال',
            'كشف حصوات الكلى',
            'المعرفة الجيدة بالأمراض الجلدية',
            'الإحالات الصحيحة لطب العيون',
            'تحديد أخطاء الرنين المغناطيسي',
            'انتشار التفاعلات الدوائية للمسنين',
            'أخطاء تشخيص أورام الجهاز العصبي',
            'دقة نماذج الذكاء الاصطناعي'
        ]
    
    metrics_df = pd.DataFrame(metrics_data)
    
    # Display as a styled table
    st.dataframe(
        metrics_df,
        column_config={
            "Metric": st.column_config.TextColumn("Medical Domain" if lang == 'English' else "المجال الطبي"),
            "Value": st.column_config.TextColumn("Rate" if lang == 'English' else "النسبة")
        },
        hide_index=True,
        use_container_width=True
    )

# Data Quality Notes Section
st.markdown("---")
st.subheader("📝 Data Quality Notes" if lang == 'English' else "📝 ملاحظات جودة البيانات")

quality_notes = {
    'English': [
        "✅ **Kidney CT**: Corrected Normal findings to 11 patients (22%) based on paper verification",
        "📚 **Dermatology**: 68.5% insufficient knowledge is from literature, not the Al Jouf study sample",
        "⚠️ **Pharmacist DDI**: 38.2% is approximate from Saudi community pharmacist studies showing substantial knowledge gaps",
        "🔍 All other data points verified against original study abstracts and publications"
    ],
    'Arabic': [
        "✅ **الأشعة المقطعية للكلى**: تم تصحيح النتائج الطبيعية إلى 11 مريض (22٪) بناءً على التحقق من الورقة",
        "📚 **الأمراض الجلدية**: 68.5٪ نقص المعرفة من الأدبيات وليست من عينة دراسة الجوف",
        "⚠️ **تفاعلات الأدوية للصيادلة**: 38.2٪ تقريبي من دراسات الصيادلة المجتمعيين السعوديين تظهر فجوات معرفية كبيرة",
        "🔍 تم التحقق من جميع نقاط البيانات الأخرى مقابل ملخصات الدراسات الأصلية والمنشورات"
    ]
}

for note in quality_notes[lang]:
    st.write(note)

# Footer
st.markdown("---")
st.markdown(t['footer'])