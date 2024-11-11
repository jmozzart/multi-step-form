'use client';

import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { useState, useRef } from 'react';
import { useFormContext } from "react-hook-form";
import FileItem from './file-item';
import { Upload } from 'lucide-react';
import { set } from 'zod';

interface UploaderProps {
    schemaField: string;
    heading: string;
}

export default function Uploader({
    schemaField,
    heading,
}: UploaderProps) {
    const { setValue, getValues } = useFormContext();
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blobs, setBlobs] = useState<PutBlobResult[]>([]);
    const [uploadBtnDisable, setUploadBtnDisable] = useState(false);

    const [isVisible, setIsVisible] = useState(true);
    const [uploadProgress, setUploadProgress] = useState(0);


    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            throw new Error('No files selectedxx');
        }

        const files = Array.from(event.target.files);
        const uploadPromises = files.map(file =>
            upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/upload',
                multipart: true,
                onUploadProgress: (progress) => {
                    setValue("uploadButtonHit", true);
                    setUploadBtnDisable(true);
                    setUploadProgress(progress.percentage);
                    // disable the upload button while uploading
                    if (progress.percentage === 100) {
                        setValue("uploadButtonHit", false);
                        setUploadBtnDisable(false);
                    }
                }
            })
        );


        const newBlobs = await Promise.all(uploadPromises);
        setBlobs(newBlobs);


        const prevArray = getValues(schemaField) ?? []

        const newFileUploads = newBlobs.map((blob) => ({
            fileName: blob.pathname,
            fileUrl: blob.url,
        }));

        setValue(schemaField, prevArray.concat(newFileUploads));
        setValue("uploadButtonHit", false);
    };


    const handleRemove = (fileUrl: string, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const prevFileUploadsArr = getValues(schemaField) ?? []
        const newFileUploads = prevFileUploadsArr.filter((f: any) => f.fileUrl !== fileUrl);
        setValue(schemaField, newFileUploads);
        setIsVisible(false);
        setValue("uploadButtonHit", false);
    };

    return (
        <div>
            <div className="mt-6">
                <h4 className="block text-xl font-medium text-gray-700 mb-2">{heading}</h4>
                <div className="flex items-center w-full">
                    <label className="flex flex-col items-center w-full px-4 py-4 bg-white text-indigo-600 rounded-lg shadow-lg tracking-wide uppercase border border-indigo-600 cursor-pointer hover:bg-indigo-600 hover:text-white">
                        {/*  <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.88 9.94l-5.66-5.66a1.5 1.5 0 00-2.12 0l-5.66 5.66a1.5 1.5 0 000 2.12l5.66 5.66a1.5 1.5 0 002.12 0l5.66-5.66a1.5 1.5 0 000-2.12zM10 14.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                        </svg> */}
                        <Upload size={32} />
                        <span className="mt-2 text-base leading-normal">Select file(s)</span>
                        <input
                            name="file"
                            ref={inputFileRef}
                            type="file"
                            accept=".pdf,.xlsx,.docx,.pptx"
                            multiple
                            required
                            onChange={handleFileChange}
                            className="hidden"
                            disabled={uploadBtnDisable}
                        />
                    </label>
                </div>
            </div>
            {uploadProgress > 0 && uploadProgress < 100 && (
                <div className='mt-6'>
                    <div className="w-full bg-gray-200 rounded-full h-7 relative">
                        <div className="bg-indigo-600 h-7 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
                            {uploadProgress}%
                        </span>
                    </div>
                </div>
            )}
            <div className='mt-6'>
                {getValues(schemaField) && (
                    <ul className="list-disc list-inside">
                        {getValues(schemaField).length > 0 ? (
                            getValues(schemaField).map((file: any) => (
                                <FileItem key={file.fileUrl} file={file} handleRemove={handleRemove} />
                            ))
                        ) : (
                            <li className="text-gray-500">No files uploaded</li>
                        )}
                    </ul>
                )}

            </div>
        </div>
    );
}