# Python 函数装饰器

用于修改函数效果的装饰性函数，特点是将要使用或修改的函数作为参数。

```py
def decorator(handler):

    def newFunction():
        print('do something before handler')
        handler()
        print('do something after handler')

    return newFunction

@decorator
def oldFunction():
    print('old function')

oldFunction()

'''输出
do something before handler
old function
do something after handler
'''
```

函数装饰器常见于各种中间件以及代理模式编程思想中，通过对原函数的封装和修改，能实现想要的结果，同时又可以保留对旧函数名的引用以及旧函数的效果。

## 问题

```py
# 上例中的装饰器
print(oldFunction.__name__)

#输出：newFunction
```

由于返回的新函数覆盖了旧函数的内容，同时也会覆盖函数名和说明文档。

## 解决方法：functools.wraps

```py
# 将装饰器的定义修改为如下
def decorator(handler):

    @wraps(handler)
    def newFunction():
        print('do something before handler')
        handler()
        print('do something after handler')

    return newFunction
```

## 带参数的装饰器

通过增加包裹函数

```py
from functools import wraps

def decorator(para="para"):
    def decorator_inner(handler):

        @wraps(handler)
        def newFunction():
            print('do something before handler', para)
            handler()
            print('do something after handler')

        return newFunction
    return decorator_inner

@decorator(para="aaaa")
def oldFunction():
    print('old function')

oldFunction()

'''输出
do something before handler aaaa
old function
do something after handler
'''
```

在通过`@`符号语法糖使用装饰器时，只需要在结尾加上小括号，将包裹函数的执行结果（也就是真正的装饰器）即可。

## 装饰器类

通过类构建装饰器，即通过类的`__call__`函数来实现装饰器，通过`__init__`实现传参，优点是可继承。

```py
from functools import wraps

class decorator:
    def __init__(self, para="para"):
        self.para = para

    def __call__(self, handler):
        @wraps(handler)
        def newFunction():
            print('do something before handler', self.para)
            handler()
            print('do something after handler')

        return newFunction

@decorator(para="aaaaaa")
def oldFunction():
    print('old function')

oldFunction()

'''
do something before handler aaaaaa
old function
do something after handler
'''
```
