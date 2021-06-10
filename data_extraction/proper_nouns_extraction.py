import pandas as pd

with open('lexicon_full.csv', encoding='utf-8') as datafile:
    lexicon_df = pd.read_csv(datafile).drop(columns=['Unnamed: 0'])

proper_nouns_df = lexicon_df[lexicon_df['med_id'] == 999999]
proper_nouns_df.to_csv('proper_nouns.csv', encoding='utf-8')

print(proper_nouns_df)