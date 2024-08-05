# node inspect index.mjs
list(100)
setBreakpoint(13)
cont

# curl -i "localhost:3000?salary=3000&discount=15"

exec req
exec req.url
exec new URLSearchParams(req.url)
exec new URLSearchParams(req.url).get('salary')
exec new URLSearchParams(req.url).get('discount')
exec new URLSearchParams(req.url).get('/salary')
exec new URLSearchParams(req.url).get('/?salary')
exec Object.fromEntries(new URLSearchParams(req.url.replace('/', '')))
saved to: debug.log
.help

<!-- r para restart --> 

clearBreakpoint('index.mjs', 13)
breakpoints

# REPL
node inspect index.mjs
list(100)
setBreakpoint(16)
cont
# Em outro terminal: curl -i "localhost:3000?salary=3000&discount=15"
repl
data
