---
layout: Documentation
---
### Set environment variable

```bash
# GitHub Personal Access Token
PAT=<git repo:read token>
# Repo Information
ORG=mgamble
REPO=mlgamble.github.io
BRANCH=master
LOCATION=assets
```

### Download assets

```bash
# Download the raw files
curl -LH "Authorization: token $PAT" \
"https://api.github.com/repos/$ORG/$REPO/contents/$LOCATION?ref=$BRANCH" | \ 
grep -e '"name"' -e '"download_url"' | \
awk '{print $2}' | \
tr -d '",' | paste - - | \
xargs -L1 -P16 curl -Lo

# Find files that reference git LFS and generate a payload for the LFS API
grep -l 'version https://git-lfs.github.com/spec/v1' * | \
xargs grep -vh 'version' | \
tr ':' ' ' | \
awk '{print $NF}' | paste - - | \
awk '{print "{ \"oid\": \""$1"\", \"size\": "$2" }"}' | paste -sd ',' - | \
awk '{print "{ \"operation\": \"download\", \"ref\": \"'$BRANCH'\", \"objects\": [ "$0" ] }" }' | \
python -m json.tool > /tmp/git-lfs.payload

# Replace LFS stubs with the actual contents
curl -XPOST -LH "Authorization: token $PAT" -H 'Accept: application/vnd.git-lfs+json' -H 'Content-Type: application/vnd.git-lfs+json' \
"https://github.com/$ORG/$REPO.git/info/lfs/objects/batch" -d @/tmp/git-lfs.payload | \
grep -e '"oid"' -e '"href"' -e '"Authorization"' | tr -d '",' | \
awk '{print $NF}' | paste - - - | \
awk '{system("grep -l "$1" *")} {print $2"?token="$3}' | paste - - | \
xargs -L1 curl -Lo
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTY4MDU2OTc2OF19
-->