import pandas as pd

with open('poems_title.csv', encoding='utf-8') as datafile:
    poems_df = pd.read_csv(datafile)

poems_list = list()

for idx, row in poems_df.iterrows():
    poem_abbrev = row['chapter_abbrev']
    poem_title = row['chapter_title']
    poems_list.append({'poem_abbrev': poem_abbrev, 'poem_title': poem_title})

print(poems_list)