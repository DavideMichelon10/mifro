"""Valida le bozze e genera CSV di contenuti per Google Ads Editor.

Non usa credenziali, API o rete. Non assegna budget e non pubblica campagne.
"""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
data = json.loads((ROOT / "campagne.json").read_text())


def write_csv(name, fields, rows):
    with (ROOT / name).open("w", encoding="utf-8-sig", newline="") as output:
        writer = csv.DictWriter(output, fieldnames=fields, lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)


campaigns, groups, ads, keywords, negatives = [], [], [], [], []
for campaign in data["campaigns"]:
    name = campaign["name"]
    campaigns.append({
        "Campaign": name,
        "Campaign type": "Search",
        "Campaign status": "Scratchpad",
        "Networks": "Google Search",
        "Languages": "it",
        "Budget": "",
        "Comment": "BOZZA SENZA BUDGET. Target e conversioni: vedere campagne.json. Non pubblicare.",
    })
    for group in campaign["ad_groups"]:
        expected_url = "https://www.mifro.it/soluzioni/" + group["sector"]
        assert group["final_url"] == expected_url, (name, group["name"])
        assert 3 <= len(group["headlines"]) <= 15, name
        assert 2 <= len(group["descriptions"]) <= 4, name
        for value in group["headlines"]:
            assert 0 < len(value) <= 30, (name, value, len(value))
        for value in group["descriptions"]:
            assert 0 < len(value) <= 90, (name, value, len(value))
        for key in ("path_1", "path_2"):
            assert len(group[key]) <= 15, (name, key)
        groups.append({"Campaign": name, "Ad group": group["name"], "Ad group status": "Paused"})
        ad = {
            "Campaign": name, "Ad group": group["name"],
            "Ad type": "Responsive search ad", "Status": "Paused",
            "Final URL": group["final_url"],
            "Path 1": group["path_1"], "Path 2": group["path_2"],
        }
        ad.update({f"Headline {i}": value for i, value in enumerate(group["headlines"], 1)})
        ad.update({f"Description {i}": value for i, value in enumerate(group["descriptions"], 1)})
        ads.append(ad)
        for key, match in (("keywords_exact", "Exact"), ("keywords_phrase", "Phrase")):
            for keyword in group[key]:
                assert len(keyword) <= 80, keyword
                keywords.append({"Campaign": name, "Ad group": group["name"],
                                 "Keyword": keyword, "Match type": match, "Status": "Paused"})
        for keyword in dict.fromkeys(group["negative_keywords_phrase"]):
            negatives.append({"Campaign": name, "Ad group": group["name"],
                              "Keyword": f'"{keyword}"', "Type": "Negative"})
    for keyword in dict.fromkeys(data["negative_keywords_phrase"] + campaign["negative_keywords_phrase"]):
        negatives.append({"Campaign": name, "Ad group": "",
                          "Keyword": f'"{keyword}"', "Type": "Campaign negative"})

assert data["budget"] is None
assert not data["publication_authorized"]
write_csv("01-campagne-bozza.csv", list(campaigns[0]), campaigns)
write_csv("02-gruppi.csv", list(groups[0]), groups)
write_csv("03-annunci.csv", ["Campaign", "Ad group", "Ad type", "Status", "Final URL", "Path 1", "Path 2"]
          + [f"Headline {i}" for i in range(1, 16)]
          + [f"Description {i}" for i in range(1, 5)], ads)
write_csv("04-parole-chiave.csv", list(keywords[0]), keywords)
write_csv("05-esclusioni.csv", list(negatives[0]), negatives)
print(f"Validati {len(campaigns)} campagne, {len(groups)} gruppi, {len(ads)} annunci, "
      f"{len(keywords)} keyword e {len(negatives)} esclusioni fra campagna e gruppi. Budget assente.")
