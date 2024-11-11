'use client';

import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { useState, useRef } from 'react';
import { useFormContext } from "react-hook-form";
import FileItem from './file-item';

interface UploaderProps {
    schemaField: string;
}

export default function Uploader({
    schemaField,
}: UploaderProps) {
    const { setValue, getValues } = useFormContext();
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blobs, setBlobs] = useState<PutBlobResult[]>([]);


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
                    setUploadProgress(progress.percentage);
                    //console.log('Upload progress:', progress.percentage);
                }
            })
        );





        const newBlobs = await Promise.all(uploadPromises);
        setBlobs(newBlobs);


        const prevArray = getValues("fileUploads") ?? []

        const newFileUploads = newBlobs.map((blob) => ({
            fileName: blob.pathname,
            fileUrl: blob.url,
        }));

        setValue("fileUploads", prevArray.concat(newFileUploads));
    };


    const handleRemove = (fileUrl: string, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const prevFileUploadsArr = getValues("fileUploads") ?? []
        const newFileUploads = prevFileUploadsArr.filter((f: any) => f.fileUrl !== fileUrl);
        setValue("fileUploads", newFileUploads);
        setIsVisible(false);
    };

    return (
        <section>
            <input
                name="file"
                ref={inputFileRef}
                type="file"
                accept=".pdf,.xlsx,.docx,.pptx"
                multiple
                required
                onChange={handleFileChange}
            />
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
                {getValues("fileUploads") && (
                    <ul className="list-disc list-inside">
                        {getValues("fileUploads").length > 0 ? (
                            getValues("fileUploads").map((file: any) => (
                                <FileItem key={file.fileUrl} file={file} handleRemove={handleRemove} />
                            ))
                        ) : (
                            <li className="text-gray-500">No files uploaded</li>
                        )}
                    </ul>
                )}

            </div>
        </section>
    );
}