from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
import pandas as pd
import numpy as np
from app.core.job_manager_file import get_analysis, get_job_data

router = APIRouter()


@router.get("/analysis/{analysis_id}")
def export_analysis(analysis_id: str):
    analysis = get_analysis(analysis_id)
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")

    return {
        "analysis_id": analysis_id,
        "data": analysis
    }


@router.get("/python/{analysis_id}")
def export_python_code(analysis_id: str):
    """Generate Python code to reproduce the analysis"""
    analysis = get_analysis(analysis_id)
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")

    job_id = analysis.get("job_id")
    if not job_id:
        raise HTTPException(status_code=404, detail="Job not found")

    job = get_job_data(job_id)
    filename = job.get("filename", "data.csv") if job else "data.csv"
    
    eda = analysis.get("eda", {})
    
    # Generate Python code
    code = f"""# Auto-generated Python code for EDA
# Dataset: {filename}
# Analysis ID: {analysis_id}

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Load your data
df = pd.read_csv('{filename}')

# Basic Information
print("Dataset Shape:", df.shape)
print("\\nColumn Types:")
print(df.dtypes)

# Missing Values
print("\\nMissing Values:")
print(df.isnull().sum())

# Basic Statistics
print("\\nNumeric Statistics:")
print(df.describe())

# Preprocessing (as done in analysis)
"""
    
    if eda.get("preprocessing"):
        prep = eda["preprocessing"]
        code += f"""
# Data Preprocessing
print("Original rows: {prep.get('original_rows', 0)}")
df = df.drop_duplicates()
print(f"After removing duplicates: {{len(df)}} rows")

# Remove rows where ALL values are missing
df = df[~df.isnull().all(axis=1)]
print(f"After removing empty rows: {{len(df)}} rows")
"""

    # Add visualizations if numeric columns exist
    if eda.get("numeric_columns"):
        code += f"""
# Visualizations
numeric_cols = {eda['numeric_columns']}

# Correlation Heatmap
if len(numeric_cols) > 1:
    plt.figure(figsize=(10, 8))
    sns.heatmap(df[numeric_cols].corr(), annot=True, cmap='coolwarm', center=0)
    plt.title('Correlation Matrix')
    plt.tight_layout()
    plt.savefig('correlation_matrix.png')
    plt.show()

# Distribution plots
for col in numeric_cols[:5]:  # First 5 numeric columns
    plt.figure(figsize=(10, 4))
    plt.subplot(1, 2, 1)
    df[col].hist(bins=30)
    plt.title(f'Distribution of {{col}}')
    plt.xlabel(col)
    
    plt.subplot(1, 2, 2)
    df.boxplot(column=col)
    plt.title(f'Box Plot of {{col}}')
    
    plt.tight_layout()
    plt.savefig(f'{{col}}_distribution.png')
    plt.show()
"""

    # Add categorical analysis
    if eda.get("categorical_columns"):
        code += f"""
# Categorical Analysis
categorical_cols = {eda['categorical_columns']}

for col in categorical_cols[:5]:  # First 5 categorical columns
    print(f"\\nValue counts for {{col}}:")
    print(df[col].value_counts().head(10))
    
    # Bar plot
    plt.figure(figsize=(10, 5))
    df[col].value_counts().head(10).plot(kind='bar')
    plt.title(f'Top 10 values in {{col}}')
    plt.xlabel(col)
    plt.ylabel('Count')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig(f'{{col}}_distribution.png')
    plt.show()
"""

    code += """
# Save cleaned data
df.to_csv('cleaned_data.csv', index=False)
print("\\nCleaned data saved to 'cleaned_data.csv'")
"""

    return Response(
        content=code,
        media_type="text/x-python",
        headers={
            "Content-Disposition": f"attachment; filename=analysis_{analysis_id[:8]}.py"
        }
    )


@router.get("/preview/{analysis_id}")
def preview_data(analysis_id: str, limit: int = 100):
    analysis = get_analysis(analysis_id)
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")

    job_id = analysis.get("job_id")
    if not job_id:
        raise HTTPException(status_code=404, detail="Job not found for analysis")

    job = get_job_data(job_id)
    if not job or "data" not in job:
        raise HTTPException(status_code=404, detail="Job data not available")

    df = pd.DataFrame.from_dict(job["data"])
    # Sanitize NaN/Inf for JSON serialization
    df = df.replace([np.inf, -np.inf], np.nan)
    # Convert NaN to None safely for mixed dtypes
    df = df.astype(object)
    df = df.where(pd.notnull(df), None)
    preview_rows = df.head(limit).to_dict(orient="records")

    return {
        "analysis_id": analysis_id,
        "columns": list(df.columns),
        "rows": preview_rows,
        "total_rows": len(df),
    }
