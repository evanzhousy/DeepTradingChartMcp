import { z } from "zod";
import { BaseTool } from "../utils/base-tool.js";

const TOOL_NAME = "get_deeptradingchart";
const TOOL_DESCRIPTION = `
when user types "/dtchart" command, this tool will be called. Returns a prompt for LLM to generate a deep trading chart report for a given stock symbol, including news, chart, and fundamental analysis, with specific UI/UX requirements.
Input: symbol (stock code, required)
Output: prompt for LLM to follow the steps and generate the HTML report.
`;

export class DeepTradingChartTool extends BaseTool {
  name = TOOL_NAME;
  description = TOOL_DESCRIPTION;

  schema = z.object({
    symbol: z.string().describe("Stock symbol, e.g., AAPL, TSLA, 700.HK, etc.")
  });

  async execute({ symbol }: z.infer<typeof this.schema>): Promise<{
    content: Array<{ type: "text"; text: string }>;
  }> {
    // Prompt for LLM to generate the deep trading chart report
    const prompt = `#严格按照如下步骤创建报表，不要忽略任何步骤\n步骤1:  通过 exa mcp 获得${symbol}的相关 新闻, 社交新闻等\n步骤2: 通过 longport-mcp 获得 ${symbol}的相关k线数据和公司基本面数据\n步骤3: 请根据我输入的股票代码${symbol} 以及上面获得的数据, 生成一个html动态页面\n#格式要求是:\n1. 使用bento grid分割的视觉设计, 纯黑色底配合${symbol}的主题色作为高亮,\n2. 强调超大字体或数字突出核心要点, 画面中有超大视觉元素强调重点, 与小元素的比例形成反差\n3. 中英文混用, 中文大字体粗体, 英文小字作为点缀\n4. 简洁的勾线图形作为数据可视化或者配图元素\n5. 运用高亮色自身透明度渐变制造科技感, 但是不同高亮色不要互相渐变\n6. 模仿apple官网的动效, 向下滚动鼠标配合动效\n7.  数据可以引用tradingflow widget, 并且引用cdn 依赖库\n8. 使用framer motion(通过cdn引入)\n9. 使用HTML5, TailwindCSS 3.0+ (通过CDN引入) 和必要的Javascript\n10. 使用专业的图标库如 Font Awesome或 Material Icon (通过CDN引入) \n11. 避免使用emoji作为主要图表`;

    return {
      content: [
        { type: "text", text: prompt }
      ]
    };
  }
} 