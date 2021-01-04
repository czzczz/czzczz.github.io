<!-- imageRoot:python -->

# Python 迭代对象

<!-- TOC -->

-   [Python 迭代对象](#python-%e8%bf%ad%e4%bb%a3%e5%af%b9%e8%b1%a1)
    -   [迭代器实现实例](#%e8%bf%ad%e4%bb%a3%e5%99%a8%e5%ae%9e%e7%8e%b0%e5%ae%9e%e4%be%8b)
    -   [yeild 语句](#yeild-%e8%af%ad%e5%8f%a5)
        -   [yeild 实例，利用迭代器特性读取大文件](#yeild%e5%ae%9e%e4%be%8b%e5%88%a9%e7%94%a8%e8%bf%ad%e4%bb%a3%e5%99%a8%e7%89%b9%e6%80%a7%e8%af%bb%e5%8f%96%e5%a4%a7%e6%96%87%e4%bb%b6)

<!-- /TOC -->

## 迭代器实现实例

```python
class IterTest:
    __data = {}

    def __init__(self, dataList):
        for key in range(len(dataList)):
            self.__data[key] = dataList[key]

    def __iter__(self):
        return IterTestIterator(self.__data)


class IterTestIterator:
    __iterCount = -1

    def __init__(self, dataSource):
        self.__data = dataSource

    def __next__(self):
        if self.__iterCount < len(self.__data) - 1:
            self.__iterCount += 1
            return self.__data[self.__iterCount]
        else:
            raise StopIteration

t = IterTest(range(30,0,-2))

for m in t:
    print(m)
```

类`__iter__()`方法作用为对 iter()方法做出响应，即返回一个可迭代（含有`__next__()`）方法的对象（迭代器），在迭代器的`__next__()`方法中可以自定义对对象的迭代方式，需要在特定状态抛出`StopIteration`异常，否则迭代将一直持续下去。

## yeild 语句

生成器，自动返回迭代器，迭代器的每一次`next`将会执行至一个`yeild`，`yeild`返回输出并记录当前执行位置，下一次`next`从中断处继续执行。

### yeild 实例，利用迭代器特性读取大文件

迭代器由于其即用即销毁的特性，方便管理内存

```python
def read_in_chunks(filePath, chunk_size=1024*1024):
    """
    Lazy function (generator) to read a file piece by piece.
    Default chunk size: 1M
    You can set your own chunk size
    """
    file_object = open(filePath)
    while True:
        chunk_data = file_object.read(chunk_size)
        if not chunk_data:
            break
        yield chunk_data
```

同时 python 的`with open() as file`将自动使用迭代器进行管理，可以直接使用。
