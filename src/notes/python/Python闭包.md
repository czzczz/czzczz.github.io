<!-- imageRoot:python -->

# Python 闭包

<!-- TOC -->

-   [Python 闭包](#python-%e9%97%ad%e5%8c%85)

<!-- /TOC -->

Python 闭包的基本形式与 JS 大致相同，通过内部定义的函数来保留外部函数的运行环境。

```py
def f(id=0, name="bob"):
    data = 'cooool'

    def getdata():
        return data

    def setdata(value="cool"):
        data = value

    return getdata, setdata

(myget, myset) = f(3, 'tom')

print(myget())
myset('aaaaaa')
print(myget())

"""输出
cooool
cooool
"""
```

Python 中的闭包函数无法直接修改外层函数的栈内容，因此对于`data = value`会理解为新声明的局部变量`data`，若该语句改为`data = 'I am ' + data`则会由于声明前访问了变量而报错。
解决方案：

-   Python3 之前只能通过将变量放入堆来解决，即将`data`包装为引用型变量，如数组。

```py
def f(id=0, name="bob"):
    data = ['cooool']#将对象包装为引用型变量

    def getdata():
        return data[0]

    def setdata(value="cool"):
        data[0] = value

    return getdata, setdata

(myget, myset) = f(3, 'tom')

print(myget())
myset('aaaaaa')
print(myget())
"""输出
cooool
aaaaaa
"""
```

-   Python3 新增 nonlocal 关键字，指明某变量为上层作用域的变量,用法跟 global 关键字一致。

```py
def f(id=0, name="bob"):
    data = 'cooool'

    def getdata():
        return data

    def setdata(value="cool"):
        nonlocal data #Python3的nonlocal关键字
        data = value

    return getdata, setdata

(myget, myset) = f(3, 'tom')

print(myget())
myset('aaaaaa')
print(myget())
"""输出
cooool
aaaaaa
"""
```
