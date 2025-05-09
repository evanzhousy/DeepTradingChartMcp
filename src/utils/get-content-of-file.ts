export async function getContentOfFile(path: string): Promise<string> {
  try {
    const fs = await import("fs/promises");
    return await fs.readFile(path, "utf-8");
  } catch (error) {
    console.error(`Error reading file ${path}:`, error);
    return "";
  }
}
