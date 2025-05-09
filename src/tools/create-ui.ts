import { z } from "zod";
import { BaseTool } from "../utils/base-tool.js";
import { twentyFirstClient } from "../utils/http-client.js";
import { CallbackServer } from "../utils/callback-server.js";
import open from "open";
import { getContentOfFile } from "../utils/get-content-of-file.js";

const UI_TOOL_NAME = "21st_magic_component_builder";
const UI_TOOL_DESCRIPTION = `
"Use this tool when the user requests a new UI component—e.g., mentions /ui, /21 /21st, or asks for a button, input, dialog, table, form, banner, card, or other React component.
This tool ONLY returns the text snippet for that UI component. 
After calling this tool, you must edit or add files to integrate the snippet into the codebase."
`;

interface CreateUiResponse {
  text: string;
}

export class CreateUiTool extends BaseTool {
  name = UI_TOOL_NAME;
  description = UI_TOOL_DESCRIPTION;

  schema = z.object({
    message: z.string().describe("Full users message"),
    searchQuery: z
      .string()
      .describe(
        "Generate a search query for 21st.dev (library for searching UI components) to find a UI component that matches the user's message. Must be a two-four words max or phrase"
      ),
    absolutePathToCurrentFile: z
      .string()
      .describe(
        "Absolute path to the current file to which we want to apply changes"
      ),
    absolutePathToProjectDirectory: z
      .string()
      .describe("Absolute path to the project root directory"),
    context: z
      .string()
      .describe(
        "Extract additional context about what should be done to create a ui component/page based on the user's message, search query, and conversation history, files. Don't halucinate and be on point."
      ),
  });

  async execute({
    message,
    searchQuery,
    absolutePathToCurrentFile,
    context,
  }: z.infer<typeof this.schema>): Promise<{
    content: Array<{ type: "text"; text: string }>;
  }> {
    try {
      const response = await twentyFirstClient.post<{
        data1: { text: string };
        data2: { text: string };
        data3: { text: string };
      }>("/api/create-ui-variation", {
        message,
        searchQuery,
        fileContent: await getContentOfFile(absolutePathToCurrentFile),
        context,
      });

      if (response.status !== 200) {
        open("https://21st.dev/settings/billing");
        return {
          content: [
            {
              type: "text" as const,
              // @ts-ignore
              text: response.data.text as string,
            },
          ],
        };
      }

      const server = new CallbackServer();
      const { data } = await server.promptUser({
        initialData: {
          data1: response.data.data1,
          data2: response.data.data2,
          data3: response.data.data3,
        },
      });

      const componentData = data || {
        text: "No component data received. Please try again.",
      };

      const responseToUser = `
${"```tsx"}      
${componentData.code}
${"```"}      


You're provided with a code snippet for a UI component. Your task is to integrate it into user's codebase.
Don't change the code of this component, just add it, integrate it, make sure that you add all imports, if you have missing ui components from this code -use shadcn/ui for imports.


### Styling instructions
Check your globals.css and tailwind.config.js for brand color variables
Replace hardcoded colors with your brand color variables where appropriate
Example: replace 'bg-blue-500' with 'bg-brand' if you have brand colors defined

## Integration instructions
Make sure all required dependencies are installed
Check component's TypeScript types match your project's conventions
Verify all imported components and utilities exist in your project

## Shadcn/ui instructions
After you add the component, make sure to add the component to the project. If you can't resolve components from demo code,
Make sure to install shadcn/ui components from the demo code missing imports

Examples of importing shadcn/ui components:
if these imports can't be resolved:
${"```tsx"}
import {
  Table
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
${"```"}

then run this command:
${"```bash"}
npx shadcn@latest add table textarea
${"```"}


      `;

      return {
        content: [
          {
            type: "text" as const,
            text: responseToUser,
          },
        ],
      };
    } catch (error) {
      console.error("Error executing tool", error);
      throw error;
    }
  }
}
