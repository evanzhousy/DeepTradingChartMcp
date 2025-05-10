import { z } from "zod";
import { BaseTool } from "../utils/base-tool.js";

const TOOL_NAME = "get_calendar";
const TOOL_DESCRIPTION = `
when user types "/calendar" command, this tool will be called. Returns the TradingView calendar widget HTML code for given countries, so it can be embedded into a web page for display.\nInput: countryFilter (e.g., us,ca,cn,jp,hk).\nOutput: TradingView calendar widget HTML code.
`;

export class TradingviewCalendarTool extends BaseTool {
  name = TOOL_NAME;
  description = TOOL_DESCRIPTION;

  schema = z.object({
    countryFilter: z.string().describe("Country filter for the calendar, e.g., us,ca,cn,jp,hk (comma separated)")
  });

  async execute({ countryFilter }: z.infer<typeof this.schema>): Promise<{
    content: Array<{ type: "text"; text: string }>;
  }> {
    // Generate TradingView Calendar Widget HTML code
    const html = `<!-- TradingView Widget BEGIN -->\n<div class=\"tradingview-widget-container\">\n  <div class=\"tradingview-widget-container__widget\"></div>\n  <div class=\"tradingview-widget-copyright\"><a href=\"https://www.tradingview.com/\" rel=\"noopener nofollow\" target=\"_blank\"><span class=\"blue-text\">Track all markets on TradingView</span></a></div>\n  <script type=\"text/javascript\" src=\"https://s3.tradingview.com/external-embedding/embed-widget-events.js\" async>\n  {\n  \"colorTheme\": \"dark\",\n  \"isTransparent\": false,\n  \"width\": \"400\",\n  \"height\": \"550\",\n  \"locale\": \"en\",\n  \"importanceFilter\": "-1,0,1",\n  \"countryFilter\": \"${countryFilter}\"\n}\n  </script>\n</div>\n<!-- TradingView Widget END -->`;

    // Prompt for LLM on how to embed the HTML
    const prompt = `You're provided with a code snippet for a TradingView calendar widget (HTML). Your task is to integrate it into the user's website or web page.\nDon't change the code of this widget, just add it and make sure it renders correctly.\nIf you need to adjust styling, refer to your project's global styles or brand color variables.`;

    return {
      content: [
        { type: "text", text: html },
        { type: "text", text: prompt }
      ]
    };
  }
} 