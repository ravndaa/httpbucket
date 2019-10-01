# Git Secrets

## GPG Signing (github verified)
Tips and tricks for signing commits. Check this link: https://help.github.com/en/articles/telling-git-about-your-signing-key

### Global Git Settings
If there is only one accounts or this is most often used, set it globally and then override on each repository. (not sure if this is true. =)
- https://help.github.com/en/articles/setting-your-username-in-git

### Repository Git Settings
Having multiple accounts and repository servers, we can add settings for each repository.
- set local user for repository: https://help.github.com/en/articles/setting-your-username-in-git

## Local branching

### Delete local branch
 - `git branch -d *branchname*` only works if pushed and merged to remote branche. 
 - `git branch -D *branchnme*` dont care about push and merge status.