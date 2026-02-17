/**
 * Yeh function flat paths ki array ko ek accurate nested tree mein badalta hai.
 * Example input: ["src/app.js", "src/components/Header.js"]
 */

export const buildTree = (paths) => {
  const root = { name: "root", type: "folder", children: [] };

  paths.forEach((path) => {
    // 1. Path ko split karke segments nikaalna (e.g., "a/b/c" -> ["a", "b", "c"])
    // Filter(Boolean) khali strings ko hata deta hai (jaise trailing slashes)
    const segments = path.split("/").filter(Boolean);
    let currentNode = root;

    segments.forEach((segment, index) => {
      const isLastSegment = index === segments.length - 1;
      const isFolder = !isLastSegment || path.endsWith("/");

      // 2. Check karna kya yeh segment pehle se current folder mein hai?
      let existingNode = currentNode.children.find(
        (child) => child.name === segment
      );

      if (!existingNode) {
        // 3. Naya node banana agar nahi mila
        const newNode = {
          name: segment,
          type: isFolder ? "folder" : "file",
          children: isFolder ? [] : undefined,
        };
        currentNode.children.push(newNode);
        existingNode = newNode;
      }

      // Agle segment ke liye andar jaana
      if (isFolder) {
        currentNode = existingNode;
      }
    });
  });

  // 4. Accuracy ke liye Sorting: Folders pehle, phir Files (Alphabetical)
  const sortTree = (node) => {
    if (node.children) {
      node.children.sort((a, b) => {
        if (a.type === b.type) {
          return a.name.localeCompare(b.name);
        }
        return a.type === "folder" ? -1 : 1;
      });
      node.children.forEach(sortTree);
    }
  };

  sortTree(root);
  return root.children; // Root wrapper ko hata kar asli tree dena
};
