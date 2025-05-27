// Example: frontend/src/components/UploadThingUploader.tsx
// Make sure you have @uploadthing/react installed in your frontend project
import {
  UploadButton as UTUploadButton,
  UploadDropzone as UTUploadDropzone,
} from "@uploadthing/react";
// You might need to define or import your FileRouter type here
// For simplicity, I'll use a generic type, but ideally, it matches your backend.
// import type { OurFileRouter } from "../../../backend/src/config/uploadthing"; // Adjust path

// Replace 'any' with your actual OurFileRouter type if possible
export const UploadButton = UTUploadButton<any>;
export const UploadDropzone = UTUploadDropzone<any>;
