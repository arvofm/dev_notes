## Formatted output
wtf = "what the fuck"
print(f"Does anybody know {wtf}")   # => Does anybody know what the fuck

false_this_is = False
true_this_is = "This is not {}"
print(true_this_is.format(false_this_is))   # => This is not False

print("This town don't feel {}".format("mine"))     # => This town dont feel mine

print("""
    Fuck this existence.
    Take me back to where it all began.
""")

print("Drugs are good", ) # do not end the line with \n
# other print(...) thingies: end, flush, sep, file, values


print("-"*10)       # another section begins

############################################################################################

## Input
holy_input = input("Enter something: ")     # argument not necessary
print(holy_input)

## Arguments
from sys import argv
script, arg1 = argv     # program arguments, first is the file name, others are arguments as in C
print(script, "is running, its first argument is ", argv)

## File reading
from sys import argv
script, filename = argv
txt = open(filename)
print(txt.read())

## File other
# close:            Closes the file. Like File->Save... in your editor.
# read:             Reads the contents of the file. You can assign the result to a variable.
# readline:         Reads just one line of a text file.
# truncate:         Empties the file. Watch out if you care about the file.
# write('stuff'):   Writes “stuff” to the file.
# seek(0):          Moves the read/write location to the beginning of the file.

## Functions
def accept_two(*args):
    arg1, arg2 = args
    print(arg1, arg2)

def got_two(arg1, arg2):
    print(arg1, arg2)

def add_two(a, b):
    """This is somehow the legal way for commenting functions"""
    return a+b

## Conditionals Fuckable
if "a" in "Ambargo":        # true
    print("I dont want to print anymore")
elif (1 or 0) and not 0:    # true
    print("Printing sucks")
else:
    print("Save me from this nightmare")

## Loops
aListTheySay = []
for i in range(0, 20):
    aListTheySay.append(i)

for a in aListTheySay:
    print(a)

while 1:
    print("The game contuniues until break.")
    break

## Dictionaries  / Objects
snake = {
    "position": "Here",
    9: 8
}
print(snake["position"], " and ", snake[9])
del snake

## Exit
from sys import exit
exit(0)
