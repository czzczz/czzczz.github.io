# git fetch

同步远程仓库的分支信息到本地，同步完之后本地与远端的commit树保持一致，但工作区状态不变。

## 将合并请求映射为本地分支

映射完了可以配合 VSCode 的版本管理来 Review 代码，比网页版舒服

### Github的PR

```sh
# remote_name 远程仓库名称 pr_id PR的ID local_branch_name 要映射的本地分支
git fetch $remote_name pull/$pr_id/head:$local_branch_name
```
登陆为 MAC alias
```zsh
#  git checkout $(git_main_branch); 切到主分支
#  if [ `git branch --list pr-$1_$2` ]; then git branch -D pr-$1_$2; fi; ❗️❗️❗️❗️❗️❗️❗️❗️Warning：如果分支已存在会强制删除，不需要可以删除
#  git fetch $1 pull/$2/head:pr-$1_$2; 映射PR到该分支
#  git checkout pr-$1_$2 切换到该分支
alias git-pr='cr(){ git checkout $(git_main_branch);if [ `git branch --list pr-$1_$2` ]; then git branch -D pr-$1_$2; fi; git fetch $1 pull/$2/head:pr-$1_$2; git checkout pr-$1_$2 };cr'
```

### GitLab的MR

```sh
# remote_name 远程仓库名称 mr_id MR的ID local_branch_name 要映射的本地分支
git fetch $remote_name merge_requests/$mr_id/head:$local_branch_name
```

登陆为 MAC alias
```zsh
alias git-pr='cr(){ git checkout $(git_main_branch);if [ `git branch --list mr-$1_$2` ]; then git branch -D mr-$1_$2; fi; git fetch $1 merge_requests/$2/head:mr-$1_$2; git checkout mr-$1_$2 };cr'
```
