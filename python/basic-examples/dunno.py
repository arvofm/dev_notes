str = "I wish suckers would suck less."
strList = str.split(" ")

while len(strList) :     # truncating
    strList.pop()

print(strList)
print(" ".join(str))
print("#".join(str[2:15]))
