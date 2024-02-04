from sys import argv

script, file = argv

print(file, " will be erased.")
print("If you don't want that to happen, hit ^C")
print("If you do, hit ENTER")

input("?")

print("Opening the file...")
target = open(file, 'w')

print("Truncating the file.")
target.truncate()

line = input("Enter a line: ")
target.write(line + '\n')

print("Haha I wrote that line in your file.")
print("Goodbye idiot.")
target.close()

