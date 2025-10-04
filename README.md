# Google Ads → Google Sheets (PMax Reports)

A collection of Google Ads Scripts that export **Performance Max** data directly into a **Google Sheet**.  
Ideal for marketers who want quick, automated reporting without using BigQuery or Data Studio.

---

## 🚀 What It Does

These scripts connect your **Google Ads account** with a **Google Sheet** and pull:
- **Search term insights**
- **Campaign performance**
- **Day-by-day metrics**
- **Product and asset group stats**
- **Ad-level inventory for PMax**

---

## 📁 Included Scripts

### 1. PMax Search Term Insights
Pulls `campaign_search_term_insight` data for all active PMax campaigns and writes it to a `SearchTerm` tab.

### 2. PMax Summary (Campaign + By Day)
Exports:
- Campaign totals for the last 30 days → `Campaign` tab  
- Daily metrics for the last 365 days → `ByDay` tab

### 3. PMax Deep Dive
Exports multiple datasets:
- Campaign by day → `r_camp`  
- Discovery view by day → `r_dv`  
- Product totals → `r_prod_t`  
- Asset group by day → `r_ag`  
- PMax ads inventory → `r_ads`

---

## ⚙️ Requirements

- Access to a **Google Ads** account with Performance Max campaigns  
- A **Google Sheet** you own or can edit  
- Permission to run **Google Ads Scripts**

---

## 🧩 Setup

1. Create a **Google Sheet** and add the necessary tabs:
