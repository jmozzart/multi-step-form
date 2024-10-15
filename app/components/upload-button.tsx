'use client';
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
  //const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [fileUploads, setFileUploads] = useState<any[]>([]);
//const filesUploaded = getValues("fileUploads");
//setFileUploads(filesUploaded);
    //setValue("uploadButtonHit", false);

  const handleFileUpload = (file: OutputFileEntry) => {
    setFiles((prevFiles) => [...prevFiles, file]);
    console.log("fileupload success",file);
    console.log()
    const newFileUploads = [...fileUploads, {
        fileName: file.name,
        fileUrl: file.cdnUrl,
        uuid: file.uuid
    }];

    setFileUploads(newFileUploads);
    setValue("fileUploads", newFileUploads);
    //console.log("getValues",getValues());
  };

  const handleFileRemove = (file: OutputFileEntry) => {
    setFiles((prevFiles) =>
      prevFiles.filter((prevFile) => prevFile.uuid !== file.uuid)
    );

    const newFileUploads = fileUploads.filter((f) => f.uuid !== file.uuid);
    setFileUploads(newFileUploads);
    setValue("fileUploads", newFileUploads);
  }

  const handleChanges = () => {

    //console.log("filesUploaded",filesUploaded);
    //setValue("uploadButtonHit", undefined);
  }

  


  return (
    <section>
        <FileUploaderMinimal
          pubkey="fb60afc0c82a00b9aa61"
          apiRef={uploaderRef}
          onChange={handleChanges}
          onFileUploadSuccess={handleFileUpload}
          onFileRemoved={handleFileRemove}
          fileValidators={[  
            (file) => {
                
                const acceptedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
                if (acceptedTypes.includes(file.mimeType)) {
                  return undefined;
                } else {
                  return {
                    name: 'File Type Error',
                    message: 'File type is not accepted. Only PDF, DOCX, and XLSX files are allowed.',
                  };
                }
              }
        ]}
        />
      <div className="img-gallery">

       
            
{/* 
       {files.map((file) => (
         <img
           key={file.uuid}
           src={file.cdnUrl as string}
           alt="Preview"
           className="img-preview"
         />
       ))} */}
      </div>
    </section>
  );
};

