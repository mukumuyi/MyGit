
# import lesson_package.utils
# from lesson_package import utils
from lesson_package.talk import human

print(human.cry())

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