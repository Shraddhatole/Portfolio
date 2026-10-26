"""
Export REAL data for the portfolio's Interactive Playground.

The site currently ships SAMPLE data (flagged "sample": true, shown with a badge).
Paste each function into the matching notebook, run it, and copy the JSON files
into  src/data/playground/  of the portfolio repo. The badge disappears automatically.

1) FraudLens  -> run at the end of notebooks/03_model.ipynb
2) ShellScope -> run at the end of 04_trends_report.ipynb
"""
import json
import numpy as np
import pandas as pd


# ---------------------------------------------------------------- FraudLens --
def export_fraudlens(y_true, y_proba, amounts, out="fraudlens_threshold.json",
                     review_cost=8.0, chosen=0.44):
    """
    y_true   : 0/1 labels on the TEST period
    y_proba  : XGBoost predicted fraud probability on the TEST period
    amounts  : transaction amount (amt) on the TEST period
    Cost model matches the README: missed fraud value + $review_cost per alert.
    """
    y_true = np.asarray(y_true)
    y_proba = np.asarray(y_proba)
    amounts = np.asarray(amounts, dtype=float)
    n_legit = int((y_true == 0).sum())
    rows = []
    for t in np.round(np.arange(0.05, 0.951, 0.01), 2):
        flag = y_proba >= t
        tp = int((flag & (y_true == 1)).sum())
        fp = int((flag & (y_true == 0)).sum())
        missed = float(amounts[(~flag) & (y_true == 1)].sum())
        review = (tp + fp) * review_cost
        rows.append({
            "threshold": float(t),
            "recall": round(100 * tp / max(1, (y_true == 1).sum()), 1),
            "falseAlarmsPer1k": round(1000 * fp / max(1, n_legit), 2),
            "reviewCost": round(review),
            "missedFraud": round(missed),
            "totalCost": round(review + missed),
        })
    payload = {
        "sample": False,
        "chosenThreshold": chosen,
        "baselineCost": round(float(amounts[y_true == 1].sum())),
        "rows": rows,
    }
    with open(out, "w") as f:
        json.dump(payload, f, indent=1)
    print(f"wrote {out} ({len(rows)} thresholds)")


# --------------------------------------------------------------- ShellScope --
def export_shellscope(df, date_col="IncorporationDate", out="shellscope_incorporations.json",
                      start="2023-01", end=None):
    """
    df : the cleaned Companies House frame (one row per company)
    """
    s = pd.to_datetime(df[date_col], errors="coerce", dayfirst=True).dropna()
    monthly = s.dt.to_period("M").value_counts().sort_index()
    monthly = monthly[monthly.index >= pd.Period(start, "M")]
    if end:
        monthly = monthly[monthly.index <= pd.Period(end, "M")]
    months = []
    for p, n in monthly.items():
        row = {"month": str(p), "incorporations": int(n)}
        prev = p - 12
        if prev in monthly.index:
            row["yoy"] = round(100 * (n / monthly[prev] - 1), 1)
        months.append(row)
    payload = {
        "sample": False,
        "ruleDate": "2025-11",
        "ruleLabel": "ID verification mandatory (18 Nov 2025)",
        "months": months,
    }
    with open(out, "w") as f:
        json.dump(payload, f, indent=1)
    print(f"wrote {out} ({len(months)} months)")
