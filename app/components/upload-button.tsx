import React, { useRef, useState } from 'react';
import {
  FileUploaderMinimal,
  OutputFileEntry,
  UploadCtxProvider,
} from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import { useFormContext } from "react-hook-form";


export const UploadcareUploader = () => {
    const { setValue, getValues } = useFormContext();
  const [files, setFiles] = useState<OutputFileEntry[]>([]);
  const uploaderRef = useRef<InstanceType<UploadCtxProvider> | null>(null);
  const [fileUrls, setFileUrls] = useState<string[]>([]);

  const handleFileUpload = (file: OutputFileEntry) => {
    setFiles((prevFiles) => [...prevFiles, file]);
    console.log("fileupload success",file);
    const newFileUrls = [...fileUrls, file.cdnUrl as string];
    setFileUrls(newFileUrls);
    setValue("uploadedFiles", newFileUrls);
    console.log("getValues",getValues());
  };

  return (
    <section>
        <FileUploaderMinimal
        pubkey="fb60afc0c82a00b9aa61"
        apiRef={uploaderRef}
        onFileUploadSuccess={handleFileUpload}
        />
      <div className="img-gallery">
       {files.map((file) => (
         <img
           key={file.uuid}
           src={file.cdnUrl as string}
           alt="Preview"
           className="img-preview"
         />
       ))}
      </div>
    </section>
  );
};

