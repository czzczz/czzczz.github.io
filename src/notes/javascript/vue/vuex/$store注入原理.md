# $store 如何实现全局查找

Vuex的install过程中，`通过Vue.mixin`对所有组件注入一个`beforeCreate`钩子。该钩子上对Vue对$store属性进行初始化。

`组件自身不含$options.store的话`，其$store将会指向其`$parent.$store`。逐层向上直到`$root`，因此在new Vue()的时候对根节点放入`$options.store`即可使得所有组件使用全局状态
