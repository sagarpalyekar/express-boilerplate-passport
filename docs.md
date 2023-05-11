# Commands List

## Command to get colorized and formatted logs

### [Reference](https://www.alexbevi.com/blog/2021/05/26/formatting-mongodb-4-dot-4-plus-logs/)

#### New Line Formatter
stdbuf -o0 tail -f /opt/homebrew/var/log/mongodb/mongo.log | stdbuf -o0 jq -r -C '.msg |= sub("\n";"") | .t."$date"+" "+.c+" ["+.ctx+"] "+.msg, .attr | select(.!=null)' | sed 's/\\n/\n/g; s/\\t/\t/g'

#### One liner 
tail -f data/mongodb.log | jq --compact-output -r -C '.msg |= sub("\n";"") | .t."$date"+" "+.c+" ["+.ctx+"] "+.msg, .attr | select(.!=null)'