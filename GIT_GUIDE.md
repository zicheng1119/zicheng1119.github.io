# Git 操作指南

本仓库 (`zicheng1119.github.io`) 已连接到 `https://github.com/zicheng1119/zicheng1119.github.io.git`。

---

## Git 三个区域

理解 Git 的三个区域，是搞懂所有操作的基础：

```
工作目录                    暂存区                      本地仓库                  远程仓库
(你的文件)  --git add-->  (stage)  --git commit-->  (local repo)  --git push-->  (GitHub)
```

| 区域 | 说明 | 类比 |
|------|------|------|
| 工作目录 | 你正在编辑的文件，改了就生效 | 桌面上摊开的文件 |
| 暂存区 (stage) | git add 之后，准备提交但还没提交 | 打包到一半的快递 |
| 本地仓库 | git commit 之后，正式存档 | 已经封好的快递 |
| 远程仓库 | git push 之后，上传到 GitHub | 快递已寄出 |

---

## 日常操作流程

### 1. 拉取最新代码

```bash
git pull origin main
```

把 GitHub 上的最新更新拉到本地。如果你只在本地这一台电脑上开发，每次都可以跳过这一步。

### 2. 改代码

正常用编辑器修改文件、新建文件、删除文件。改完后用 `git status` 看一眼：

```bash
git status
```

输出示例：

```
Changes not staged for commit:    ← 已修改但还没 add 的文件
  modified:   index.html

Untracked files:                  ← 新创建、Git 还不认识的文件
  new-page.html
```

### 3. git add — 放入暂存区

```bash
# 全部添加（最简单）
git add .

# 或者只添加特定文件
git add index.html new-page.html
```

**重点：git add 可以多次执行。** 比如改着改着又想加一个文件进去，再 `git add 另一个文件` 就行。只要还没 `git commit`，add 多少次都进同一个暂存区。

### 4. git commit — 正式提交

```bash
git commit -m "添加了新页面，修改了首页导航"
```

一次性把暂存区里**所有之前 add 进来的修改**打包成一个 commit。

你可以多次 commit：

```bash
# 第一轮：改首页
git add .
git commit -m "修改首页导航栏"

# 第二轮：加新页面
git add .
git commit -m "新增关于我页面"

# 第三轮：修 bug
git add .
git commit -m "修复手机端排版错乱"
```

最后 push 时，所有这些 commit 一次性推上去。

### 5. git push — 推送到 GitHub

```bash
git push origin main
```

把所有本地积累的 commit 同步到 GitHub。推送后网站自动部署更新。

---

## 常见操作场景

### 场景一：改了一个文件就提交

```bash
git add index.html
git commit -m "更新首页标题"
git push origin main
```

### 场景二：改了三个文件，想打包成一次提交

```bash
# 改完 a.html、b.html、c.html 之后
git add a.html b.html c.html
# 或者直接 git add . 全加
git commit -m "统一更新所有页面标题"
git push origin main
```

### 场景三：改了一堆，但只想提交其中两个文件

```bash
git add a.html b.html
git commit -m "只提交 a 和 b，c 和 d 先不动"
# c.html 和 d.html 的修改留在工作目录，下次再处理
```

### 场景四：一次性干完所有事（常见做法）

```bash
git add .
git commit -m "日常更新"
git push origin main
```

---

## 完整工作流图示

```
git pull origin main     ← 拉取远程更新（可选，多设备协作时必做）
        │
        ▼
    改代码（编辑器里修改文件）
        │
        ▼
    git add .            ← 全部修改放入暂存区（可多次执行）
        │
        ▼
    git commit -m "xxx"  ← 暂存区打包成一个 commit（可多次执行）
        │
        │   ← 回到"改代码"继续，再次 add + commit
        │
        ▼
    git push origin main  ← 一次性把所有 commit 推送到 GitHub
```

---

## 常用补救命令

| 场景 | 命令 | 说明 |
|------|------|------|
| 改乱了想恢复单个文件 | `git checkout -- 文件名` | 回到上次 commit 时的状态 |
| 改乱了想全部恢复 | `git checkout -- .` | 所有修改全部丢弃，谨慎使用 |
| add 多了想撤销某个文件 | `git reset HEAD 文件名` | 文件从暂存区退回工作目录，修改还在 |
| commit 信息写错了（没 push） | `git commit --amend -m "新描述"` | 修正上一次 commit 的信息 |
| 查看当前改了什么 | `git diff` | 看还没 add 的修改内容 |
| 查看暂存区里有什么 | `git diff --cached` | 看已经 add 但还没 commit 的内容 |
| 查看提交历史 | `git log --oneline` | 简洁的提交记录列表 |
| 查看最近 3 条提交详情 | `git log -3` | 显示作者、时间、完整信息 |

---

## 常见疑问

**Q: git add 能多次执行吗？**
A: 可以。每次 `git add` 把新修改追加到暂存区，直到 `git commit` 才清空暂存区。

**Q: commit 之后还能改吗？**
A: 没 push 之前可以用 `git commit --amend` 修改。push 之后就算了，追加一个新 commit 来修正更安全。

**Q: 要不要每次改完都 add + commit + push？**
A: add + commit 建议频繁做（改一个小功能就 commit 一次）。push 可以攒几次 commit 一起推。

**Q: git add . 会漏掉删除的文件吗？**
A: 不会，`.` 包括新增、修改、删除所有变更。但更安全的做法是用 `git add -A`，两者在本仓库情况下效果一样。
