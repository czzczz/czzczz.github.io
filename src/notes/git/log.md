# Log 指令用于展示 git 提交记录以及其他相关信息

```sh
git log
```

## --pretty 对输出内容进行格式化

```sh
git log --pretty=format:%xx...
```

所有可用的指令

```
%H: commit hash
%h: 缩短的commit hash
%T: tree hash
%t: 缩短的 tree hash
%P: parent hashes
%p: 缩短的 parent hashes
%an: 作者名字
%aN: mailmap的作者名字 (.mailmap对应，详情参照git-shortlog(1)或者git-blame(1))
%ae: 作者邮箱
%aE: 作者邮箱 (.mailmap对应，详情参照git-shortlog(1)或者git-blame(1))
%ad: 日期 (--date= 制定的格式)
%aD: 日期, RFC2822格式
%ar: 日期, 相对格式(1 day ago)
%at: 日期, UNIX timestamp
%ai: 日期, ISO 8601 格式
%cn: 提交者名字
%cN: 提交者名字 (.mailmap对应，详情参照git-shortlog(1)或者git-blame(1))
%ce: 提交者 email
%cE: 提交者 email (.mailmap对应，详情参照git-shortlog(1)或者git-blame(1))
%cd: 提交日期 (--date= 制定的格式)
%cD: 提交日期, RFC2822格式
%cr: 提交日期, 相对格式(1 day ago)
%ct: 提交日期, UNIX timestamp
%ci: 提交日期, ISO 8601 格式
%d: ref名称
%e: encoding
%s: commit信息标题
%f: sanitized subject line, suitable for a filename
%b: commit信息内容
%N: commit notes
%gD: reflog selector, e.g., refs/stash@{1}
%gd: shortened reflog selector, e.g., stash@{1}
%gs: reflog subject
%Cred: 切换到红色
%Cgreen: 切换到绿色
%Cblue: 切换到蓝色
%Creset: 重设颜色
%C(...): 制定颜色, as described in color.branch.* config option
%m: left, right or boundary mark
%n: 换行
%%: a raw %
%x00: print a byte from a hex code
%w([[,[,]]]): switch line wrapping, like the -w option of git-shortlog(1)
```

## --date=

日期输出格式化

```
--date=relative shows dates relative to the current time, e.g. “2 hours ago”. The -local option has no effect for --date=relative.

--date=local is an alias for --date=default-local.

--date=iso (or --date=iso8601) shows timestamps in a ISO 8601-like format. The differences to the strict ISO 8601 format are:

a space instead of the T date/time delimiter

a space between time and time zone

no colon between hours and minutes of the time zone

--date=iso-strict (or --date=iso8601-strict) shows timestamps in strict ISO 8601 format.

+ --date=rfc (or --date=rfc2822) shows timestamps in RFC 2822 format, often found in email messages.

+ --date=short shows only the date, but not the time, in YYYY-MM-DD format.

+ --date=raw shows the date as seconds since the epoch (1970-01-01 00:00:00 UTC), followed by a space, and then the timezone as an offset from UTC (a + or - with four digits; the first two are hours, and the second two are minutes). I.e., as if the timestamp were formatted with strftime("%s %z")). Note that the -local option does not affect the seconds-since-epoch value (which is always measured in UTC), but does switch the accompanying timezone value.

+ --date=unix shows the date as a Unix epoch timestamp (seconds since 1970). As with --raw, this is always in UTC and therefore -local has no effect.

+ --date=format:... feeds the format ... to your system strftime, except for %z and %Z, which are handled internally. Use --date=format:%c to show the date in your system locale’s preferred format. See the strftime manual for a complete list of format placeholders. When using -local, the correct syntax is --date=format-local:....

--date=default is the default format, and is similar to --date=rfc2822, with a few exceptions
```
