import { z } from "zod";
import { BaseTool } from "../utils/base-tool.js";

const TOOL_NAME = "get_news";
const TOOL_DESCRIPTION = `
when user types "/news" command, this tool will be called. Returns the TradingView news widget HTML code for a given market, so it can be embedded into a web page for display.\nInput: market (e.g., stock, crypto, etc.).\nOutput: TradingView news widget HTML code.
`;

export class TradingviewNewsTool extends BaseTool {
  name = TOOL_NAME;
  description = TOOL_DESCRIPTION;

  schema = z.object({
    market: z.string().describe("Market for the news, e.g., stock, crypto, etc.")
  });

  async execute({ market }: z.infer<typeof this.schema>): Promise<{
    content: Array<{ type: "text"; text: string }>;
  }> {
    // Generate TradingView News Widget HTML code
    const html = `<!-- TradingView Widget BEGIN -->\n<div class=\"tradingview-widget-container\">\n  <div class=\"tradingview-widget-container__widget\"></div>\n  <div class=\"tradingview-widget-copyright\"><a href=\"https://www.tradingview.com/\" rel=\"noopener nofollow\" target=\"_blank\"><span class=\"blue-text\">Track all markets on TradingView</span></a></div>\n  <script type=\"text/javascript\" src=\"https://s3.tradingview.com/external-embedding/embed-widget-timeline.js\" async>\n  {\n  \"feedMode\": \"market\",\n  \"isTransparent\": false,\n  \"displayMode\": \"regular\",\n  \"width\": 400,\n  \"height\": 550,\n  \"colorTheme\": \"dark\",\n  \"locale\": \"en\",\n  \"market\": \"${market}\"\n}\n  </script>\n</div>\n<!-- TradingView Widget END -->`;

    // Prompt for LLM on how to embed the HTML
    const prompt = `You're provided with a code snippet for a TradingView news widget (HTML). Your task is to integrate it into the user's website or web page.\nDon't change the code of this widget, just add it and make sure it renders correctly.\nIf you need to adjust styling, refer to your project's global styles or brand color variables.`;

    return {
      content: [
        { type: "text", text: html },
        { type: "text", text: prompt }
      ]
    };
  }
} 