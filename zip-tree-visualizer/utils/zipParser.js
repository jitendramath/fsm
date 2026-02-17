import JSZip from "jszip";

/**
 * Yeh function ZIP file ko read karta hai aur saare file/folder paths ki 
 * ek simple array return karta hai.
 */
export const parseZipFiles = async (file) => {
  try {
    const zip = new JSZip();
    
    // ZIP file ko load karna (Binary format mein)
    const content = await zip.loadAsync(file);
    
    // Sabhi files aur folders ke relative paths nikaalna
    // Object.keys(content.files) humein ["folder/", "folder/file.txt", ...] jaisa data deta hai
    const filePaths = Object.keys(content.files);

    return filePaths;
  } catch (error) {
    console.error("Error parsing ZIP file:", error);
    throw new Error("Invalid ZIP file or corrupted data.");
  }
};
