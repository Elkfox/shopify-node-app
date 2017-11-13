---
title:  "Utils"
handle: "utils"
category: "utils"
---
There are two util commands available:

`npm run cleardbs` - Which runs `./utils/cleardbs.js` and removes any entries in the databases you specify. By default it's set up to remove entries from `Shop` and `Counter`.

`npm run seeddbs` - Seeds databases using your settings inside `./utils/seeddbs.js`. Currently the only database it seeds is Counter.
