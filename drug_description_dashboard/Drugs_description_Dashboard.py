# Medicine App: Bilingual + Full EDA + Smart Search UI

import streamlit as st
import pandas as pd
import plotly.express as px

# PAGE CONFIG
st.set_page_config(
    page_title="Drugs Data Dashboard",
    layout="wide",
    initial_sidebar_state="expanded"
)

# LOAD DATA
@st.cache_data
def load_data():
    df = pd.read_csv(
        "Drugs_discription.csv",
        dtype=str,
        low_memory=False
    )
    df.columns = df.columns.str.strip()
    df = df.dropna(how="all").drop_duplicates().fillna("Unknown")
    return df

data = load_data()

# LANGUAGE SETTINGS
if "language" not in st.session_state:
    st.session_state.language = "English"

def switch_language():
    st.session_state.language = "Arabic" if st.session_state.language == "English" else "English"

EN = {
    "app_title": "Drug Data Analysis",
    "sidebar_language": "Language",
    "sidebar_quick": "Quick Stats",
    "switch_lang": "Switch Language",
    "tab_eda": "EDA Dashboard",
    "tab_chat": "Search",
    "rows": "Rows",
    "columns": "Columns",
    "duplicates": "Duplicates",
    "missing_values": "Missing Values",
    "no_missing": "No missing values",
    "no_duplicates": "No duplicate rows",
    "duplicates_warning": "Duplicate rows: {duplicates}",
    "total_unique": "Unique Medicines",
    "overview": "Data Overview",
    "data_sample": "Data Sample",
    "data_summary": "Data Summary",
    "stats": "Statistical Analysis",
    "visualizations": "Additional Visualizations",
    "top_chem": "Top Chemical Classes",
    "top_ther": "Top Therapeutic Classes",
    "side_title": "Most Common Side Effects",
    "subs_title": "Most Common Substitutes",
    "chat_header": "Drug Description",
    "chat_caption": "Search using either the trade name or scientific name",
    "search_placeholder": "Enter drug name",
    "no_match": "No matching result found",
    "display_options": "Display Options",
    "results": "Search Results",
    "usage": "Usage",
    "side": "Side Effects",
    "subs": "Substitutes",
    "tclass": "Therapeutic Class",
    "cclass": "Chemical Class",
    "habit": "Habit Forming",
    "trade_label": "Trade Name",
    "sci_label": "Scientific Name",
}

AR = {
    "app_title": "تحليل بيانات الأدوية",
    "sidebar_language": "اللغة",
    "sidebar_quick": "إحصاءات سريعة",
    "switch_lang": "تبديل اللغة",
    "tab_eda": "لوحة التحليل",
    "tab_chat": "بحث",
    "rows": "عدد الصفوف",
    "columns": "عدد الأعمدة",
    "duplicates": "الصفوف المكررة",
    "missing_values": "القيم المفقودة",
    "no_missing": "لا توجد قيم مفقودة",
    "no_duplicates": "لا يوجد صفوف مكررة",
    "duplicates_warning": "عدد الصفوف المكررة: {duplicates}",
    "total_unique": "عدد الأدوية الفريدة",
    "overview": "نظرة عامة على البيانات",
    "data_sample": "عينة من البيانات",
    "data_summary": "ملخص البيانات",
    "stats": "التحليل الإحصائي",
    "visualizations": "تصوّرات إضافية",
    "top_chem": "الفئات الكيميائية الأعلى",
    "top_ther": "الفئات العلاجية الأعلى",
    "side_title": "الأعراض الجانبية الأكثر شيوعاً",
    "subs_title": "البدائل الأكثر تكراراً",
    "chat_header": "وصف الدواء",
    "chat_caption": "ابحث باستخدام الاسم التجاري أو العلمي",
    "search_placeholder": "أدخل اسم الدواء",
    "no_match": "لا توجد نتائج مطابقة",
    "display_options": "خيارات العرض",
    "results": "نتائج البحث",
    "usage": "الاستخدام",
    "side": "الأعراض الجانبية",
    "subs": "البدائل",
    "tclass": "الفئة العلاجية",
    "cclass": "الفئة الكيميائية",
    "habit": "قابلية الإدمان",
    "trade_label": "الاسم التجاري",
    "sci_label": "الاسم العلمي",
}

def T(key):
    return AR[key] if st.session_state.language == "Arabic" else EN[key]

# SIDEBAR
with st.sidebar:
    st.header(T("sidebar_language"))
    if st.button(T("switch_lang")):
        switch_language()
        st.rerun()

    st.header(T("sidebar_quick"))
    st.write(f"{T('rows')}: {len(data):,}")
    st.write(f"{T('columns')}: {len(data.columns)}")

# HEADER KPIs
st.title(T("app_title"))

unique_drugs = data["TradeName"].nunique()
missing_total = 0
duplicates = data.duplicated().sum()

c1, c2, c3, c4 = st.columns(4)
c1.metric(T("total_unique"), unique_drugs)
c2.metric(T("rows"), len(data))
c3.metric(T("duplicates"), duplicates)
c4.metric(T("missing_values"), missing_total)

HIDDEN_COLS = [
    "Matched_Kaggle_Name", "Match_Score", "Scientific_clean",
    "Matched_clean", "fuzzy_token", "Confidence"
]

# TABS
tab_eda, tab_chat = st.tabs([T("tab_eda"), T("tab_chat")])

# TAB 1 — EDA
with tab_eda:

    st.header(T("overview"))

    col1, col2 = st.columns([2, 1])

    with col1:
        st.subheader(T("data_sample"))
        sample_df = data.drop(columns=[c for c in HIDDEN_COLS if c in data.columns])
        st.dataframe(sample_df.head(10), use_container_width=True)

    with col2:
        st.subheader(T("data_summary"))
        st.write(f"{T('rows')}: {data.shape[0]:,}")
        st.write(f"{T('columns')}: {data.shape[1]}")
        st.success(T("no_missing"))
        if duplicates == 0:
            st.success(T("no_duplicates"))
        else:
            st.warning(T("duplicates_warning").format(duplicates=duplicates))
        st.info(f"{T('total_unique')}: {unique_drugs:,}")

    st.header(T("stats"))
    col1, col2 = st.columns(2)

    with col1:
        st.subheader(T("top_chem"))
        chem = data["Chemical Class"].value_counts().head(10)
        fig = px.bar(
            chem,
            orientation="h",
            color=chem.values,
            color_continuous_scale=px.colors.sequential.Tealgrn
        )
        st.plotly_chart(fig, use_container_width=True)

    with col2:
        st.subheader(T("top_ther"))
        ther = data["Therapeutic Class"].value_counts().head(10)
        fig = px.pie(
            values=ther.values,
            names=ther.index,
            hole=0.4,
            color_discrete_sequence=px.colors.sequential.Tealgrn
        )
        st.plotly_chart(fig, use_container_width=True)

    st.header(T("visualizations"))
    col1, col2 = st.columns(2)

    with col1:
        st.subheader(T("side_title"))
        side = data["sideEffect"].str.split(";", expand=True).stack().str.strip()
        side_counts = side[side != "Unknown"].value_counts().head(10)
        fig = px.bar(
            side_counts,
            orientation="h",
            color=side_counts.values,
            color_continuous_scale=px.colors.sequential.Tealgrn
        )
        st.plotly_chart(fig, use_container_width=True)

    with col2:
        st.subheader(T("subs_title"))
        subs = data["substitute"].str.split(";", expand=True).stack().str.strip()
        sub_counts = subs[subs != "Unknown"].value_counts().head(10)
        fig = px.bar(
            sub_counts,
            orientation="h",
            labels={'value': 'Count', 'index': 'Substitute'},
            color=sub_counts.values,
            color_continuous_scale=px.colors.sequential.Tealgrn
        )
        st.plotly_chart(fig, use_container_width=True)

# TAB 2 — SEARCH SYSTEM
with tab_chat:

    st.header(T("chat_header"))
    st.caption(T("chat_caption"))

    search = st.text_input(T("search_placeholder")).strip()

    st.subheader(T("display_options"))
    col1, col2, col3 = st.columns(3)
    col4, col5, col6 = st.columns(3)

    show_use = col1.checkbox(T("usage"), True)
    show_side = col2.checkbox(T("side"), True)
    show_subs = col3.checkbox(T("subs"), False)
    show_tclass = col4.checkbox(T("tclass"), False)
    show_cclass = col5.checkbox(T("cclass"), False)
    show_habit = col6.checkbox(T("habit"), False)

    st.markdown("---")

    if search:
        s = search.lower()
        result = data[
            data["TradeName"].astype(str).str.lower().str.contains(s, regex=False) |
            data["ScientificName"].astype(str).str.lower().str.contains(s, regex=False)
        ]

        if result.empty:
            st.warning(T("no_match"))
        else:
            st.subheader(T("results"))

            def format_list(text: str) -> str:
                if text == "Unknown":
                    return "Unknown"
                items = [i.strip() for i in str(text).split(";") if i.strip()]
                return "\n".join([f"- {i}" for i in items]) if items else "Unknown"

            for _, row in result.head(5).iterrows():
                trade = row.get("TradeName", "Unknown")
                sci = row.get("ScientificName", "Unknown")

                if s in trade.lower():
                    st.subheader(sci)
                    st.write(f"{T('trade_label')}: {trade}")
                else:
                    st.subheader(trade)
                    st.write(f"{T('sci_label')}: {sci}")

                if show_use:
                    st.write(T("usage") + ":")
                    st.markdown(format_list(row.get("use", "Unknown")))

                if show_side:
                    st.write(T("side") + ":")
                    st.markdown(format_list(row.get("sideEffect", "Unknown")))

                if show_subs:
                    st.write(T("subs") + ":")
                    st.markdown(format_list(row.get("substitute", "Unknown")))

                if show_tclass:
                    st.write(T("tclass") + ": " + row.get("Therapeutic Class", "Unknown"))

                if show_cclass:
                    st.write(T("cclass") + ": " + row.get("Chemical Class", "Unknown"))

                if show_habit:
                    st.write(T("habit") + ": " + row.get("Habit Forming", "Unknown"))

                st.markdown("---")
