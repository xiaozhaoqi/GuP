# GuP Extension Adds Stocks Information In Your Editor Status Bar.
## Example
You need add  
```
"gup.code": "sz000151,sz002284,sz002373",  
"gup.interval": "60000"  
```
in VS Code setting.json.  
And Editor Status Bar will show the number of your config.
The number will refresh every 60000ms.

## Change Log
v0.0.1: support single code query.  
v0.1.0: support mutliple codes query.  
v0.1.1: refresh from 9am to 15pm, minimum interval is 10000ms.  
v0.2.0: move status bar to the first one, stop refresh from 12am to 13pm.  
