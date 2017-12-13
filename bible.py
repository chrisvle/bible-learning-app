import json
import random

with open('ESV.json', 'rb') as json_data:
    d = json.load(json_data)

book = raw_input("What book? ")
book = book.lower().title()

def foo(chapter, verse):
    print("\n" + d[book][str(chapter)][str(verse)])
    response = raw_input("What chapter is this from? ")

    if response == str(chapter):
        print("Correct!\n")
    else:
        i = 1
        while i < 3:
            response = raw_input("Try #" + str(i+1) + ": ")
            if response == str(chapter):
                print("Correct!\n")
                break
            else:
                print("Incorrect")
            i += 1
        if i == 3:
            end = raw_input("Do you want another verse? y or n\n")
            if end == "y":
                verse += 1
                if verse < len(d[book][str(chapter)]):
                    foo(chapter, verse)
                else:
                    print("This was the last verse in the chapter")
                    foo(chapter, verse - 1)
            else:
                print("Correct Answer: " + str(chapter))

while True:
    cont = raw_input("Play? y or n\n")
    chapter = random.randint(1, len(d[book].keys()))
    verse = random.randint(1, len(d[book][str(chapter)].keys()))
    if cont == "y":
        foo(chapter, verse)
    else:
        print("Thanks for Playing!")
        break
