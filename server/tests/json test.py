import re

inp_str = "flow15"

print("Original string : " + inp_str)

num = re.findall(r'\d+', inp_str)
result = "Поток " + "".join(num)
print(result)

test = ["flow5", "flow", "test", "flow1", "flow20"]
string = ''.join(test)
num2 = re.findall(r'flow\d+', string)
print(num2)
