# Resource
[text](https://developers.netlify.com/guides/write-mcps-on-netlify/#resources)
[text](https://mcp-example-express.netlify.app/)

## Develop Remotelly
URL: `https://deeptradingchartmcp.netlify.app/`

```json
  "mcpServers": {
    "deeptradingchartmcp": {
      "command": "npx",
      "args": [
        "mcp-remote@next",
        "https://deeptradingchartmcp.netlify.app/mcp"
      ]
    }
  }
```

### Inspector
`npx @modelcontextprotocol/inspector npx mcp-remote@next https://deeptradingchartmcp.netlify.app/mcp`


## Develop Locally
1. run `npm run dev`
2. open browser: `http://localhost:8888/`

```json
  "mcpServers": {
    "deeptradingchartmcp": {
      "command": "npx",
      "args": [
        "mcp-remote@next",
        "http://localhost:8888/mcp"
      ]
    }
  }
```

