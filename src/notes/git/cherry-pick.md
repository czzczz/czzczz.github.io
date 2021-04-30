# Git Cherry-Pick

按照提交id将某提交或某段提交重现到当前分支

```sh
git cherry-pick id

git cherry-pick id1..id2
git cherry-pick id1^..id2
```

## 参数`-x`

提交信息追加一段表明此提交从何处cherry-pick

## 参数`--sign-off`

提交信息追加一段表明操作人

## 参数`-m --mainline`

处理merge提交
