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


export const UploadcareUploader = () => {
    const { setValue, getValues } = useFormContext();
  const [files, setFiles] = useState<OutputFileEntry[]>([]);
  const uploaderRef = useRef<InstanceType<UploadCtxProvider> | null>(null);

 //const [fileUploads, setFileUploads] = useState<any[]>([]);
  defineLocale('en', {
    'choose-file': getValues("fileUploads") ? "Upload Another File" : "Choose File",
  })


  const handleFileUpload = (file: OutputFileEntry) => {
    setFiles((prevFiles) => [...prevFiles, file]);
    console.log("fileupload success",file);
    //console.log()
    const prevArray = getValues("fileUploads") ?? []

    const newFileUploads = [...prevArray, {
        fileName: file.name,
        fileUrl: file.cdnUrl,
        uuid: file.uuid
    }];


    setValue("fileUploads", newFileUploads);
    setValue("uploadButtonHit", false);
    //console.log("getValues",getValues());
  };

  const handleFileRemove = (file: OutputFileEntry) => {
    console.log("file removed")
    setFiles((prevFiles) =>
      prevFiles.filter((prevFile) => prevFile.uuid !== file.uuid)
    );
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
  };

/*   const handleRemove = (file: OutputFileEntry, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleFileRemove(file);
  };
 */

  return (
    <section>
        <FileUploaderMinimal
          pubkey="fb60afc0c82a00b9aa61"
          apiRef={uploaderRef}
          //onChange={handleChanges}
         //onFileAdded={handleUpdateUploadHit("file has been added", true)}
        //onFileUploadStart={handleUpdateUploadHit("file upload in progress", true)}
        //onFileUploadProgress={handleUpdateUploadHit("file upload in progress", true)}
          //onFileUploadFailed={handleUpdateUploadHit("file upload failed", true)}
          onFileUploadSuccess={handleFileUpload}
            onFileRemoved={handleFileRemove}
            collectionValidators={
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
            } 
          store={false}
          fileValidators={[  
            (file) => {
              console.log("filepayload",file)
                
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
                <li key={file.uuid} className="flex items-center justify-between">
                  <a href={file.fileUrl as string} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                    {file.fileName}
                  </a>
                  <button
                    onClick={(event) => handleRemove(file.uuid, event)}
                    className="ml-2 text-red-500 hover:text-red-700"
                    aria-label="Remove file"
                  >
                    <X size={16} />
                  </button>
                </li>
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

