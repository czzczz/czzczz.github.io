# vue 生命周期

从前到后共有 8 个钩子函数。

## 全部生命周期

### beforeCreate（setup）

vue 实例创建前。

vue3 的`组合式 api` 中被 `setup` 取代。

### created（setup）

vue 实例创建完成，此时 data 响应式变量已经初始化完成，vdom 树构建完毕。但是由于没有挂载实际 dom，因此不能操作界面元素。

vue3 的`组合式 api` 中被 `setup` 取代。

### beforeMount

挂载前。

### mounted

vdom 挂载到实际 dom 后，此时界面已经渲染完成，界面进入响应式更新的状态。

### beforeUpdate

响应式数据 data 发生变化，界面更新前。

### updated

data 变化且界面重新渲染完成后。

### beforeDestroy（beforeUnmount）

界面关闭，vue 实例销毁前。

vue3 中换为卸载前调用。

### destroyed（unmounted）

vue 实例销毁后。

vue3 中换为卸载后调用。

### activated

`keep-alive`包裹的组件在从不活跃态到活跃态时触发

### deactivated

`keep-alive`包裹的组件在从活跃态到不活跃态时触发

## 父子节点生命周期顺序

```vue
<A>
    <B>
        <C></C>
    </B>
    <D></D>
    <E>
        <F></F>
    </E>
</A>
```

父子节点之间的生命周期依照遍历顺序进行

### 创建节点阶段

1. 从父组件到子组件进行一个`前序`的`深度优先遍历`，对组件进行响应式初始化

    1. A->setup,beforeCreate,created,beforeMount
    2. B->setup,beforeCreate,created,beforeMount
    3. C->setup,beforeCreate,created,beforeMount
    4. D->setup,beforeCreate,created,beforeMount
    5. E->setup,beforeCreate,created,beforeMount
    6. F->setup,beforeCreate,created,beforeMount

2. 从父组件到子组件进行一个`后序`的`深度优先遍历`，依次进行挂载
    1. C->mounted
    2. B->mounted
    3. D->mounted
    4. F->mounted
    5. E->mounted
    6. A->mounted

### 更新节点过程

**需要注意的是如果子组件的 props 等参数没有更新的话，生命周期不一定会执行，因为节点会被重用**

1. 依旧是前序的深度优先遍历

    1. A->beforeUpdate
    2. B->beforeUpdate
    3. C->beforeUpdate
    4. D->beforeUpdate
    5. E->beforeUpdate
    6. F->beforeUpdate

2. 然后是后序的更新完成
    1. C->updated
    2. B->updated
    3. D->updated
    4. F->updated
    5. E->updated
    6. A->updated

### 销毁节点过程

1. 还是一样，前序
    1. beforeUnmount A
    2. beforeUnmount B
    3. beforeUnmount C
    4. beforeUnmount D
    5. beforeUnmount E
    6. beforeUnmount F
2. 后序
    1. unmounted C
    2. unmounted B
    3. unmounted D
    4. unmounted F
    5. unmounted E
    6. unmounted A
