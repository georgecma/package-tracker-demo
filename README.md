
Pain points: 
1. Node.js documentation not clear. Ecosystem is very small so no good stackoverflow answers online. 
2. ConditionalMutation is called filter. Unintuitive function name.
3. During my conditional mutation. the insertion seems to split up data if I don't provide a column qualifier.
```
  locations:2                              @ 2022/08/17-15:46:07.627000
    "B"
  locations:3                              @ 2022/08/17-15:48:12.787000
    "B"
  locations:3                              @ 2022/08/17-15:46:48.051000
    "B"
  locations:3                              @ 2022/08/17-15:46:07.627000
    "B"
  locations:value                          @ 2022/08/17-15:51:19.211000
    "ASDSA"
```