# Python 面向对象

## 常用特殊属性与方法

```python
class MyClass:
    __doc__ = ''#说明性文档，声明类时通过三对引号引用的那部分
    __module__ = ''#当前操作对象所属模块
    __class__ = ''#当前对象所属类
    __dict__ = {}#列出对象或类的所用成员
    __slots__ = ('a','b')#限制实例可以用的键值，即限制变量数

    def __init__(self):#构造函数
        pass
    def __del__(self):#析构函数
        pass
    def __len__(self):#对应len()方法
        pass
    def __str__(self):#对应类的字符串化（print等）
        pass
    def __cmp__(self, s):#对应sort（sorted函数）行为
        pass
    def __iter__(self):#与next一同使得对象变得可迭代
        pass
    def __next__(self):
        pass
    def __getitem__(self,key):#获取对象变量触发
        pass
    def __setitem__(self,key,value):#改变对象变量触发
        pass
    def __delitem__(self,key):#删除对象变量触发
        pass
    def __add__(self,s):#操作符重载
        pass
    def __sub__(self,s):
        pass
    def __mul__(self,s):
        pass
    def __truediv__(self,s):
        pass
    def __mod__(self,s):
        pass
    def __pow__(self,s):
        pass
    def __call__(self, *args, **kwargs):#当类或对象被当做函数调用时（MyClass()(),myClass()）执行
        pass
```

## super(cls, self) (super() in Python3)

作用为实例化一个父类

```python
class A:
    def __init__(self):
        self.n = 2

    def add(self, m):
        # 第四步
        # 来自 D.add 中的 super
        # self == d, self.n == d.n == 5
        print('self is {0} @A.add'.format(self))
        self.n += m
        # d.n == 7


class B(A):
    def __init__(self):
        self.n = 3

    def add(self, m):
        # 第二步
        # 来自 D.add 中的 super
        # self == d, self.n == d.n == 5
        print('self is {0} @B.add'.format(self))
        # 等价于 suepr(B, self).add(m)
        # self 的 MRO 是 [D, B, C, A, object]
        # 从 B 之后的 [C, A, object] 中查找 add 方法
        super().add(m)

        # 第六步
        # d.n = 11
        self.n += 3
        # d.n = 14

class C(A):
    def __init__(self):
        self.n = 4

    def add(self, m):
        # 第三步
        # 来自 B.add 中的 super
        # self == d, self.n == d.n == 5
        print('self is {0} @C.add'.format(self))
        # 等价于 suepr(C, self).add(m)
        # self 的 MRO 是 [D, B, C, A, object]
        # 从 C 之后的 [A, object] 中查找 add 方法
        super().add(m)

        # 第五步
        # d.n = 7
        self.n += 4
        # d.n = 11


class D(B, C):
    def __init__(self):
        self.n = 5

    def add(self, m):
        # 第一步
        print('self is {0} @D.add'.format(self))
        # 等价于 super(D, self).add(m)
        # self 的 MRO 是 [D, B, C, A, object]
        # 从 D 之后的 [B, C, A, object] 中查找 add 方法
        super().add(m)

        # 第七步
        # d.n = 14
        self.n += 5
        # self.n = 19

d = D()
d.add(2)
print(d.n)
```

输出结果：

```
self is <__main__.D object at 0x10ce10e48> @D.add
self is <__main__.D object at 0x10ce10e48> @B.add
self is <__main__.D object at 0x10ce10e48> @C.add
self is <__main__.D object at 0x10ce10e48> @A.add
19
```
