import { z } from "zod";
import { BaseTool } from "../utils/base-tool.js";

const TOOL_NAME = "get_tradingview_chart";
const TOOL_DESCRIPTION = `
when user types "/chart" command, this tool will be called. Returns the TradingView chart widget HTML code for a given stock symbol, so it can be embedded into a web page for display.\nInput: Stock symbol (e.g., AAPL, TSLA, GOOG, etc.).\nOutput: TradingView widget HTML code.
`;

export class TradingviewChartTool extends BaseTool {
  name = TOOL_NAME;
  description = TOOL_DESCRIPTION;

  schema = z.object({
    symbol: z.string().describe("Stock symbol, e.g., AAPL, TSLA, GOOG, etc.")
  });

  async execute({ symbol }: z.infer<typeof this.schema>): Promise<{
    content: Array<{ type: "text"; text: string }>;
  }> {
    // Generate TradingView Widget HTML code
    const html = `<!-- TradingView Widget BEGIN -->\n<div class="tradingview-widget-container" style="height:100%;width:100%">\n  <div class="tradingview-widget-container__widget" style="height:calc(100% - 32px);width:100%"></div>\n  <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a></div>\n  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js" async>\n  {\n  \"autosize\": true,\n  \"symbol\": \"${symbol}\",\n  \"interval\": \"D\",\n  \"timezone\": \"Etc/UTC\",\n  \"theme\": \"dark\",\n  \"style\": \"1\",\n  \"locale\": \"en\",\n  \"allow_symbol_change\": true,\n  \"support_host\": \"https://www.tradingview.com\"\n}\n  </script>\n</div>\n<!-- TradingView Widget END -->`;

    // Prompt for LLM on how to embed the HTML
    const prompt = `You're provided with a code snippet for a TradingView stock chart widget (HTML). Your task is to integrate it into the user's website or web page.\nDon't change the code of this widget, just add it and make sure it renders correctly.\nIf you need to adjust styling, refer to your project's global styles or brand color variables.`;

    return {
      content: [
        { type: "text", text: html },
        { type: "text", text: prompt }
      ]
    };
  }
} 