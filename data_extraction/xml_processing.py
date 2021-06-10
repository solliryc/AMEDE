import re
import os
import sre_constants

import pandas as pd
from bs4 import BeautifulSoup as BS


PATH = 'auchinleck_xml/'
filename = 'abc.xml'
left_out_files = ['barons.xml', 'guy_st1.xml']
tags_to_remove = ['ref', 'milestone', 'note', 'emph']
# test file for development
dev_file_name = ['arthur.xml']
etymology_list = ['english_etymology', 'french_etymology', 'latin_etymology', 'scandinavian_etymology', 'other_etymology']


with open('lexicon_med_matches.csv', encoding='utf-8') as datafile:
    lexicon_df = pd.read_csv(datafile)

# open xml files, parse them and store them in a dict like this: {file_name: xml_files}
for filename in os.listdir(PATH):
    # Do not load files specified in the list
    if filename in left_out_files:
        continue
    if filename not in dev_file_name:
        pass

    print(filename)
    with open(PATH + filename, encoding='utf-8') as auchinleck_poem:
        data_xml = auchinleck_poem.read()
        parsed_xml = BS(data_xml, 'lxml')

    html_row = ''

    lines = parsed_xml.find_all('l')

    for line in lines:
        line_note = ''
        line_nbr = ''
        line_text = ''

        # get the content of note of type 'ed' (editors' notes)
        for note_tag in line.select('note'):
            note_tag_type = note_tag.get('type')

            if note_tag_type == 'ed':
                # remove metadata of the note
                del note_tag['type']
                del note_tag['n']

                # convert <emph> to <em> for HTML
                for emph_tag in note_tag.select('emph'):
                    emph_tag.name = 'em'

                # get the inner content of the note tag
                for content in note_tag.contents:
                    line_note += str(content)

                line_note = line_note.replace('\n', '')

        # remove milestone, ref, note and emph tags
        for tag_to_remove in tags_to_remove:
            for tag in line.select(tag_to_remove):
                tag.extract()

        # get the line number
        if line.get('n'):
            line_nbr = str(line.get('n'))
            # if the line number in the tag is not numbers, leave it out
            if not line_nbr.isnumeric():
                line_nbr = ''

        # get the text content of the line (xml files have some odd newlines, they are removed)
        line_text = line.get_text()
        line_text = line_text.replace('\n', ' ')
        line_text = line_text.rstrip()

        # replace '&' by 'and', either at beginning of line or elsewhere in line
        line_text = re.sub(r'^&', 'And', line_text)
        line_text = re.sub(r'&', 'and', line_text)

        # tag each word as span with 'word' class
        word_regex = r'(\w*\[*\w+\]*\w*)'
        matched_words = re.findall(word_regex, line_text, flags=re.UNICODE)
        line_text = re.sub(word_regex, r'<span class="word">\1</span>', line_text, flags=re.UNICODE)

        # add etymology class to each word
        for word in matched_words:
            word_html_classes = 'word'
            word_lower = word.lower()
            lexicon_row = lexicon_df.loc[lexicon_df['lexicon_word'] == word_lower]
            for etymology in etymology_list:
                try:
                    lexicon_etymology = lexicon_row.iloc[0][etymology]
                    if lexicon_etymology == 1:
                        word_html_classes = word_html_classes + ' ' + etymology
                except IndexError:
                    # error happens when
                    pass

            # add a backslash before parenthesis and square brackets to escape them in regex sub
            escape_char_regex = r'([\[\(\)\]])'  # get any of parenthesis or square brackets
            escaped_word = re.sub(escape_char_regex, r'\\\1', word, flags=re.UNICODE)  # add a backslash to the word
            escaped_word_span = r'<span class="' + word_html_classes + '">' + escaped_word + '</span>'

            # add etymology classes to the word span
            word_span = r'<span class="word">' + escaped_word + '</span>'
            line_text = re.sub(word_span, escaped_word_span, line_text, flags=re.UNICODE)

            # remove the backslash added to escape parenthesis and square brackets
            line_text = re.sub(r'\\', '', line_text, flags=re.UNICODE)

        # create html row with line number and text line cells
        html_line_nbr = "\t<td class='line-nbr'>" + line_nbr + "</td>\n"
        html_line_text = "\t<td class='line-text'>" + line_text + "</td>\n"

        # add note cell if there is a note, if not add an empty cell
        if line_note:
            html_line_note = "\t<td class='line-note'>Note<div class='tooltip'>" + line_note + "</div></td>\n"
        else:
            html_line_note = "\t<td class='line-note'></td>\n"
        html_row += '<tr>\n' + html_line_note + html_line_nbr + html_line_text + '</tr>\n'

    # add html table tags at the beginning and end of string
    html_string = "<table>\n" + html_row + "</table>"

    # export the html table with its data as a txt file
    with open('auchinleck_html_v2/' + filename[:-4] + '.txt', 'w', encoding='utf-8') as text_file:
        text_file.write(html_string)
