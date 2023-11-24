# import datetime

# now = datetime.datetime.now()

# print(now)
# print(now.isoformat())
# print(now.strftime('%d/%m'))

# today = datetime.date.today()
# print(today)
# print(today.isoformat())

# t = datetime.time(hour=1,minute=10)
# print(t.isoformat())

# print(now)
# d = datetime.timedelta(days=-365)
# print(now + d)

# import time 
# print('@@@@')
# time.sleep(3)
# print('@@@@')
# print(time.time())

# import os 
# import shutil
# file_name = 'test.txt'

# if os.path.exists(file_name):
#     shutil.copy(file_name,"{}.{}".format(
#         file_name,now.strftime('%Y%m%d')
#     ))

# with open(file_name,'w') as f:
#     f.write('test')

# import subprocess

# subprocess.run(['ls', '-al'])

# import tempfile
# with tempfile.TemporaryFile(mode= 'w+') as t:
#     t.write('hello')
#     t.seek(0)
#     print(t.read())


# with tempfile.NamedTemporaryFile(delete=False) as t:
#     with open(t.name,'w+') as f:
#         print(t.name)
#         f.write('test\n')
#         f.seek(0)
#         print(f.read())

# with tempfile.TemporaryDirectory() as td:
#     print(td)

# temp_dir = tempfile.mkdtemp()
# print(temp_dir)

# import glob
# import zipfile

# with zipfile.ZipFile('test.zip','w') as z :
#     # z.write('test_dir')
#     # z.write('test_dir/test.txt')
#     for f in glob.glob('test_dir/**',recursive=True):
#         print(f)
#         z.write(f)

# with zipfile.ZipFile('test.zip','r') as z :
#     # z.extractall('zzz2')
#     with z.open('test_dir/test.txt') as f:
#         print(f.read())


# import tarfile

# with tarfile.open('test.tar.gz','w:gz') as tr:
#     tr.add('test_dir')

# with tarfile.open('test.tar.gz','r:gz') as tr:
#     # tr.extractall(path='test_tar')
#     with tr.extractfile('test_dir/sub_dir/sub_test.txt') as f:
#         print(f.read())

# import os
# import pathlib
# import glob
# import shutil

# print(os.path.exists('test.txt'))
# print(os.path.isfile('test.txt'))
# print(os.path.isdir('Design'))

# os.rename('test.txt','renamed.txt')
# os.symlink('renamed.txt','symlink.txt')
# os.mkdir('test_dir')
# os.rmdir('test_dir')

# pathlib.Path('empty.txt').touch()
# os.remove('empty.txt')
# os.mkdir('test_dir/test_dir2')
# print(os.listdir('test_dir'))

# pathlib.Path('test_dir/test_dir2/empty.txt').touch()

# shutil.copy('test_dir/test_dir2/empty.txt','test_dir/test_dir2/empty2.txt')
# print(glob.glob('test_dir/test_dir2/*'))

# shutil.rmtree('test_dir')
# print(os.getcwd())

# import csv

# with open('test.csv', 'w') as csv_file:
#     fieldnames = ['Name','Count']
#     writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
#     writer.writeheader()
#     writer.writerow({'Name':'A','Count':1})
#     writer.writerow({'Name':'B','Count':2})


# with open('test.csv','r') as csv_file:
#     reader = csv.DictReader(csv_file)
#     for row in reader:
#         print(row['Name'],row['Count'])


# import string

# s = """\
# Hi $name,

# $contents

# Have a good day
# """

# with open('10_python/Design/Email_Template.txt') as f:
#     t = string.Template(f.read())


# # t = string.Template(s)
# contents = t.substitute(name='Mike', contents='How are you?')
# print(contents)

# s = """\
# AAA
# BBB
# CCC
# DDD
# """

# with open('test.txt','r+') as f:
#     print(f.read())
#     f.write(s)
    # f.seek(0)


# with open('test.txt','r') as f:
#     print(f.tell())
#     print(f.read(1))
#     f.seek(5)
#     print(f.read(1))
#     f.seek(14)
#     print(f.read(1))
#     f.seek(15)
#     print(f.read(1))
#     f.seek(5)
#     print(f.read(1))

    # print(f.read())
    # while True:
    #     chunk = 2
    #     line = f.readline(chunk)
    #     print(line)
    #     if not line:
    #         break



# with open('test.txt','w') as f:
#     f.write(s)

# class word(object):
#     def __init__(self,text):
#         self.text = text
    
#     def __str__(self):
#         return 'word !!!!!!!!!'

#     def __len__(self):
#         return len(self.text)

#     def __add__(self,word):
#         return self.text.lower() + word.text.lower()

#     def __eq__(self, word):
#         return self.text.lower()==word.text.lower()

# w = word('text')
# w2 = word('text')

# print(w == w2)

# class Person(object):
#     kind = 'human'

#     def __init__(self):
#         self.x = 100

#     @classmethod
#     def what_is_your_kind(cls):
#         return cls.kind

#     @staticmethod
#     def about(year):
#         print('about human {}'.format(year))


# a = Person()
# print(a.what_is_your_kind())

# print(Person.kind)
# print(Person.what_is_your_kind())
# Person.about(1999)

# class Person(object):
#     kind = 'human'
#     def __init__(self,name) -> None:   
#         self.name = name

#     def who_are_you(self):
#         print(self.name,self.kind)

# a = Person('A')
# a.who_are_you()
# b = Person('B')
# b.who_are_you()


# class T(object):
#     def __init__(self):
#         self.words=[]
#     # words = []

#     def add_word(self,word):
#         self.words.append(word)

# c = T()

# c.add_word('add 1')
# c.add_word('add 2')
# print(c.words)

# d = T()

# c
# d.add_word('add 3')
# d.add_word('add 4')
# print(d.words)

# class Person(object):
#     def talk(self):
#         print('talk')
        
#     def run(self):
#         print('Person Run')

# class Car(object):
#     def run(self):
#         print('run')

# class PersonCarRobot(Car,Person):
#     def fly (self):
#         print('fly')

# person_car_robot = PersonCarRobot()
# person_car_robot.talk()
# person_car_robot.run()
# person_car_robot.fly()

# import abc

# class Person(metaclass=abc.ABCMeta):
#     def __init__(self,age=1) -> None:
#         self.age = age

#     @abc.abstractclassmethod
#     def drive(self):
#         pass


# class Baby(Person):
#     def __init__(self, age=1) -> None:
#         if age < 18:
#             super().__init__(age)
#         else:
#             raise ValueError
#     def drive(self):
#         raise Exception('No Drive')

# class Adult(Person):
#     def __init__(self, age=18) -> None:
#         if age >= 18:
#             super().__init__(age)
#         else:
#             raise ValueError
#     # def drive(self):
#     #     print('OK')

# baby = Baby()
# adult = Adult()

# class Car(object):
#     def __init__(self,model = None):
#         self.model = model
#     def run(self):
#         print('run')
#     def ride(self,person):
#         person.drive()

# car = Car()
# car.ride(baby)

# class ToyotaCar(Car):
#     def run(self):
#         print('fast')

# class TeslaCar(Car):
#     def __init__(self,model = 'Model S',enable_auto_run=False,passwd='123'):
#         super().__init__(model)
#         self.__enable_auto_run = enable_auto_run
#         self.passwd = passwd

#     @property
#     def enable_auto_run(self):
#         return self._enable_auto_run

#     @enable_auto_run.setter
#     def enable_auto_run(self, is_enable):
#         if self.passwd=='456':
#             self._enable_auto_run = is_enable
#         else :
#             raise ValueError

    
#     def auto_run(self):
#         print('auto run')
#     def run(self):
#         print('super fast')

# print('##############')

# Tesra_Car = TeslaCar('Model S',passwd='456')
# # Tesra_Car.enable_auto_run = True
# Tesra_Car.__enable_auto_run = 'XXXXXXXXXXXXXXXX'
# print(Tesra_Car.__enable_auto_run)
# Tesra_Car.run()
# Tesra_Car.auto_run()


# class T(object):
#     pass

# t =T()
# t.name = 'mike'
# t.age= 20
# print(t.name,t.age)


# class Person(object):
#     def __init__(self,name) -> None: #コンストラクタ
#         self.name = name
#         print(self.name)

#     def say_something(self):
#         print('I am {}, hello'.format(self.name))
#         self.run(10)

#     def run(self,num):
#         print('run' * num)

#     def __del__(self):
#         print('good bye')


# person = Person('Mike')
# person.say_something()
# del person

# import lesson_package.talk.animal
# import config


# print('lesson:',__name__)


# import collections
# import os
# import sys

# import termcolor2

# import lesson_package

# import config

# # print(collections.__file__)

# print(sys.path)

# from termcolor2 import colored
# print('test')

# print(colored('test', 'red'))


# s = "fagaieghaiohuibweopagb"

# d = {}
# for c in s :
#     if c not in d:
#         d[c]=0
#     d[c] += 1
# print(d)


# d = {}
# for c in s :
#     if c not in d:
#         d.setdefault(c,0)
#     d[c] += 1
# print(d)


# from collections import defaultdict
# d = defaultdict(int)

# for c in s :
#     d[c] += 1
# print(d)

# import builtins

# ranking =  {
#     'A' : 100,
#     'B' : 85,
#     'C' : 95
# }

# for key in ranking:
#     print(key)


# print(sorted (ranking))
# print(sorted (ranking, key=ranking.get,reverse=True))

 
# print(globals())


# try:
#     from lesson_package import utils
# except ImportError:
#     from lesson_package.tools import utils

# utils.say_twice('word')


# import lesson_package.utils
# from lesson_package import utils
# from lesson_package.talk import human
# from lesson_package.talk import animal
# from lesson_package.talk import *

# print(animal.sing())
# print(animal.cry())

# print(human.sing())
# print(human.cry())

# r = utils.say_twice('hello')

# print(r)

# class UppercaseError(Exception):
#     pass

# def check():
#     words= ['APPLE','orange','banana']
#     for word in words :
#         if word.isupper():
#             raise UppercaseError(word)

# try:
#     check()
# except UppercaseError as exc:
#     print('this is my fault')



# l = [1,2,3]
# i = 2

# try:
#     l[i]
# except IndexError as ex:
#     print("don't worry: {}".format(ex))
# except NameError as ex:
#      print("don't worry: {}".format(ex))
# except Exception as ex:
#     print('other: {}'.format(ex))
# else :
#     print('done')
# finally:
#     print('clean up')

# print('last')


# """
# TEST TEST
# """
# animal = 'cat'

# def f():
#     """TEST FUNC"""
#     # print(animal)
#     # global animal
#     # animal = 'dog'
#     print(f.__name__)
#     print(f.__doc__)

# f()
# print('global:',__name__)

# print('global:',globals())

# # Normal
# def g():
#     for i in range(10):
#         yield i 
# g = g()

# # Comprehension
# g = (i for i in range(10) if i % 2 ==0)

# for x in g:
#     print(x)


# s = set()
# for i in range(10):
#     s.add(i)

# print(s)

# s = {i for i in range(10)}
# print(s)


# w =['mon','tue','wed']
# f =['coffe','milk','water']

# for day,drink in zip(w,f):
#     print(day,drink)


# w =['mon','tue','wed']
# f =['coffe','milk','water']

# d = {}
# for x,y in zip (w,f):
#     d[x] = y 

# print(d)

# d = {x: y for x,y in zip(w,f)}
# print(d)

# t = (1,2,3,4,5)

# r = []
# for i in t:
#     r.append(i)
# print(r)

# r = [i for i in t if i % 2 == 0]
# print(g)

# r = []
# for i in t :
#     for j in t2 :
#         r.append(i *j)

# print(r)

# r = [ i * j for i in t for j in  t2]
# print(r)


# def counter(num=10):
#     for _ in range(num):
#         yield 'run'

# def greeting():
#     yield 'good morinig'
#     yield 'good aftenoon'
#     yield 'good night'
    
# g = greeting()
# print(next(g))
# print('@@@@')
# print(next(g))
# print(next(g))


# l = ['mon','tue','wed','thu','fri','sat','sun']

# def change_words(words,func):
#     for word in words:
#         print(func(word))

# # def sample_func(word):
# #     return word.capitalize()
# # change_words(l,lambda sample_func)

# change_words(l,lambda word:word.capitalize())


# def print_more(func):
#     def wrapper(*args,**kwargs):
#         print('func:', func.__name__)
#         print('args:',args)
#         print('kwargs:',kwargs)
#         result = func(*args,**kwargs)
#         print('result:',result)
#         return result
#     return wrapper


# def print_info(func):
#     def wrapper(*args,**kwargs):
#         print('start')
#         result = func(*args,**kwargs)
#         print('end')
#         return result
#     return wrapper
    
# @print_info
# @print_more
# def add_num(a,b):
#     return a + b

# r = add_num(10,20)
# print(r)

# def circle_area_func(pi):
#     def circle_area(radius):
#         return pi * radius * radius

#     return circle_area

# ca1 = circle_area_func(3.14)
# ca2 = circle_area_func(3.1415192)

# print(ca1(10))
# print(ca2(10))

# def outer (a,b):
#     def inner():
#         return a + b

#     return inner

# f =outer(1,2)
# r = f()
# print(r)


# def outer(a,b):

#     def plus(c,d):
#         return c+d
    
#     r1 = plus(a,b)
#     r2 = plus(b,a)

#     print(r1 + r2)

# outer(1,2)

# def example_func(param1, param2):
#     """
#     Args:
#         param1(int): The first parameter
#         param2(str): The Second parameter
    
#     Returns:
#         bool: The return value. True for success, False otherwise.

#     """

#     print(param1)
#     print(param2)
#     return True

# example_func('aaa','bbb')

# print(example_func.__doc__)


# def menu(food,*args,**kwargs):
#     print(food)
#     print(args)
#     print(kwargs)
#     # print(kwargs)
#     # for k,v in kwargs.items():
#     #     print(k,v)


# menu('banana','apple','orange',entree='beef',drink='coffee')

# d = {
#     'entree':'beef',
#     'drink':'ice coffee',
#     'dessert':'ice'
# }

# menu(**d)

# menu(entree='beef',drink='coffee')





# num_tuple=(10,20)
# print(num_tuple)

# x,y = num_tuple
# print(x,y)

# x,y=10,20
# print(x,y)



# min,max = 0,100
# print(min,max)



# def say_something(word,*args):
#     print(word)
#     for arg in args:
#         print(arg)


# # t= ('mike','nancy')
# # say_something('hi',*t)
