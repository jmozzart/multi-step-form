'use client';
import React, { useRef, useState } from 'react';
import {
  FileUploaderMinimal,
  FuncCollectionValidator,
  OutputCollectionState,
  OutputFileEntry,
  UploadCtxProvider,
  defineLocale
} from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import { useFormContext } from "react-hook-form";
import { X } from 'lucide-react';
import  FileItem from './file-item';


export const UploadcareUploader = () => {
    const { setValue, getValues } = useFormContext();
 // const [files, setFiles] = useState<OutputFileEntry[]>([]);
  const uploaderRef = useRef<InstanceType<UploadCtxProvider> | null>(null);

  const [isVisible, setIsVisible] = useState(true);

  defineLocale('en', {
    'choose-file': getValues("fileUploads") ? "Upload Another File" : "Choose File",
  })


  const handleFileUpload = (file: OutputFileEntry) => {
 
    console.log("fileupload success",file);
   
    const prevArray = getValues("fileUploads") ?? []

    const newFileUploads = [...prevArray, {
        fileName: file.name,
        fileUrl: file.cdnUrl,
        uuid: file.uuid
    }];


    setValue("fileUploads", newFileUploads);
    setValue("uploadButtonHit", false);

  };

  const handleFileRemove = (file: OutputFileEntry) => {
    console.log("file removed")
   
    const prevFileUploadsArr = getValues("fileUploads") ?? []
    const newFileUploads = prevFileUploadsArr.filter((f: any) => f.uuid !== file.uuid);

    setValue("uploadButtonHit", false);
    setValue("fileUploads", newFileUploads);
  }



  function handleUpdateUploadHit(event: string, val: boolean) {
    console.log(event);
    setValue("uploadButtonHit", val);
    console.log("uploadButtonHit get values",getValues("uploadButtonHit"));
    return undefined
  }

  const handleRemove = (uuid: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const prevFileUploadsArr = getValues("fileUploads") ?? []
    const newFileUploads = prevFileUploadsArr.filter((f: any) => f.uuid !== uuid);
    setValue("fileUploads", newFileUploads);
    setIsVisible(false);
  };



  return (
    <section>
        <FileUploaderMinimal
          pubkey="fb60afc0c82a00b9aa61"
          apiRef={uploaderRef}
          onChange={
            (collection: OutputCollectionState) => {
              console.log("collection on Change", collection);
              if (collection.isUploading === false) {
                setValue("uploadButtonHit", false);
              } else {
                setValue("uploadButtonHit", true);
              }
              return undefined;
            }
          }

          onFileUploadSuccess={handleFileUpload}
            onFileRemoved={handleFileRemove}
         /*    collectionValidators={
              [
                (collection) => {
                  console.log("collection", collection);
                  if (collection.failedCount === 0 || collection.failedCount == 0) {
                    setValue("uploadButtonHit", false);
                  } else {
                    setValue("uploadButtonHit", true);
                  }

                  return undefined; // Ensure the function returns undefined
                }
                  
              ]
            }  */
          store={false}
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
        
 <div className="mt-6">
        {getValues("fileUploads") && (
          <ul className="list-disc list-inside">
            {getValues("fileUploads").length > 0 ? (
              getValues("fileUploads").map((file: any) => (
                <FileItem key={file.uuid} file={file} handleRemove={handleRemove} />
              ))
            ) : (
              <li className="text-gray-500">No files uploaded</li>
            )}
          </ul>
        )}
      </div>
    </section>
  );
};

