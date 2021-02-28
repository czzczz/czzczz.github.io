# vue 生命周期

从前到后共有 8 个钩子函数。

## beforeCreate

vue 实例创建前。

## created

vue 实例创建完成，此时 data 响应式变量已经初始化完成，vdom 树构建完毕。但是由于没有挂载实际 dom，因此不能操作界面元素。

## beforeMount

挂载前。

## mounted

vdom 挂载到实际 dom 后，此时界面已经渲染完成，界面进入响应式更新的状态。

## beforeUpdate

响应式数据 data 发生变化，界面更新前。

## updated

data 变化且界面重新渲染完成后。

## beforeDestroy

界面关闭，vue 实例销毁前。

## destroyed

vue 实例销毁后。
