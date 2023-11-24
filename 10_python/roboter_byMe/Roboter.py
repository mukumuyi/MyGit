import csv

rest_input = {}
rest_output = {}

try:
    with open('Roboter.csv','r') as csv_file:
        reader = csv.DictReader(csv_file)
        for row in reader:
            rest_input[row['Name']] = int(row['Count'])
            # print(row['Name'],row['Count'])
except FileNotFoundError as EX:
     print('***WRN*** File Not Find')


# print(rest_input)
rest_list = sorted(rest_input,key=rest_input.get,reverse=True)
# print(rest_list)

while True:
    name = input('Hello! My name is Roboko. What is your name? \n')
    if len(name) != 0:
        break

for rest in rest_list:
    while True:
        response = input('I recomend {}  \n '\
            'Do you like this restaurant?[Yes/No]'.format(rest))

        if response.capitalize() =='Yes':
            rest_output[rest] = rest_input[rest] + 1
            break
        elif response.capitalize() =='No':
            rest_output[rest] = rest_input[rest]
            break

while True:
    rest_rec= input('{} , where is your favorite restaurant \n'.format(name.capitalize()))
    if len(rest_rec) != 0:
        rest_output[rest_rec] = 1
        break

# print(rest_output)

with open('Roboter.csv','w') as csv_file:
    fieldnames = ['Name','Count']
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
    writer.writeheader()
    for i in rest_output:
        writer.writerow({'Name':i,'Count':rest_output[i]})

print('{}, thank you for your answer \n Have a good day!'.format(name.capitalize()))
