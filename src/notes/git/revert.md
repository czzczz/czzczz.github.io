# Git-revert

用于回退提交，与reset不同的是revert可以生成新的commit记录对应的回退结果，而reset则是清空回退路径上的所有提交记录。

## 指定需要回退的提交记录Id

```sh
git revert 1234i21738947sdfasf31234213
```

## 根据指定的Id往回相对查找

```sh
git revert 1234i21738947sdfasf31234213~1 # 从该id往回第一条，即上一条
git revert HEAD~2 # 往回第二条
```

## 根据一个范围进行回退

从id1到id2之间的所有提交，**依时间顺序从后到先依次回退**

```sh
git revert <id1>..<id2> # 不包括id1
git revert <id1>^..<id2> # id1也会被回退
```

## 参数 `--continue --abort --quit --skip`

同时回滚多条提交时若因某些问题导致中断（如冲突处理，或者commit）的话，这些参数会用于对暂停的过程进行处理

-   continue 继续过程，执行下一条
-   skip 跳过下一条并继续（若队列完成则终止）
-   quit 放弃回退过程并保留工作区状态
-   abort 放弃回退过程并返回执行回退命令之前的状态（HEAD）

## 参数 `--no-edit`

若该次回退没有产生冲突，则自动生成提交记录，`不需要唤起vim`，若有多条回退，也不会因此中断过程。

## 参数 `-m --mainline`

若是要回退一个merge提交，由于merge是将两条分支的提交进行重现合并，因此需要通过该参数`指定要保留哪一方`（`1`为base分支`2`为被merge分支）。

```sh
# 若我将有问题的代码发布到了prod分支，线上发现该需求功能异常需要回退。
# 发布到prod分支时的指令为
git merge feat/my_feat --no-ff
# 该指令会生成一条merge commit记录
# 回退的指令如下
git revert <commit-id> -m 1 # -m 1 表示保留prod原本的内容
```
