import { z } from "zod";
import { BaseTool } from "../utils/base-tool.js";

const TOOL_NAME = "get_heatmap";
const TOOL_DESCRIPTION = `
when user types "/heatmap" command, this tool will be called. Returns the TradingView heatmap widget HTML code for a given data source, so it can be embedded into a web page for display.\nInput: data source (e.g., SPX500, NASDAQ, etc.).\nOutput: TradingView heatmap widget HTML code.
`;

export class TradingviewHeatmapTool extends BaseTool {
  name = TOOL_NAME;
  description = TOOL_DESCRIPTION;

  schema = z.object({
    dataSource: z.string().describe("Data source for the heatmap, e.g., SPX500, NASDAQ, etc.")
  });

  async execute({ dataSource }: z.infer<typeof this.schema>): Promise<{
    content: Array<{ type: "text"; text: string }>;
  }> {
    // Generate TradingView Heatmap Widget HTML code
    const html = `<!-- TradingView Widget BEGIN -->\n<div class=\"tradingview-widget-container\">\n  <div class=\"tradingview-widget-container__widget\"></div>\n  <div class=\"tradingview-widget-copyright\"><a href=\"https://www.tradingview.com/\" rel=\"noopener nofollow\" target=\"_blank\"><span class=\"blue-text\">Track all markets on TradingView</span></a></div>\n  <script type=\"text/javascript\" src=\"https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js\" async>\n  {\n  \"exchanges\": [],\n  \"dataSource\": \"${dataSource}\",\n  \"grouping\": \"sector\",\n  \"blockSize\": \"market_cap_basic\",\n  \"blockColor\": \"change\",\n  \"locale\": \"en\",\n  \"symbolUrl\": \"\",\n  \"colorTheme\": \"dark\",\n  \"hasTopBar\": true,\n  \"isDataSetEnabled\": true,\n  \"isZoomEnabled\": true,\n  \"hasSymbolTooltip\": true,\n  \"isMonoSize\": true,\n  \"width\": \"100%\",\n  \"height\": \"100%\"\n}\n  </script>\n</div>\n<!-- TradingView Widget END -->`;

    // Prompt for LLM on how to embed the HTML
    const prompt = `You're provided with a code snippet for a TradingView heatmap widget (HTML). Your task is to integrate it into the user's website or web page.\nDon't change the code of this widget, just add it and make sure it renders correctly.\nIf you need to adjust styling, refer to your project's global styles or brand color variables.`;

    return {
      content: [
        { type: "text", text: html },
        { type: "text", text: prompt }
      ]
    };
  }
} 