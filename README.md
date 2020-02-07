# Connext-benchmarking
Super dumb/hacky benchmarking tools for connext

## Prep
Clone https://github.com/connextproject/indra and `make start`

Then clone this repo, `npm install`

Also install `0x` globally: `npm install -g 0x`

Copy your latest connext client into `./dist/`

Then run `npm run prep`.

## Files 
Latency.js runs transfers and prints the latency for each into console.

```
npm run latency
```

Flamegraph.js runs a transfer using 0x and outputs a flamegraph.

NOTE: this is currently broken - my bad, just add `latency(1)` at the bottom of the `latency.js` file and it should work.

```
npm run flamegraph
```

In both cases, the node process needs to be manually exited with `ctrl+c` lol
