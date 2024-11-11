'use client';

import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { useState, useRef } from 'react';

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blobs, setBlobs] = useState<PutBlobResult[]>([]);

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error('No files selected');
    }

    const files = Array.from(inputFileRef.current.files);
    const uploadPromises = files.map(file =>
      upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
        multipart: true,
        onUploadProgress: (progress) => {
          console.log('Upload progress: '+file.name, progress);
        }
      })
    );

    const newBlobs = await Promise.all(uploadPromises);
    setBlobs(newBlobs);
  };

  return (
    <>
      <h1>Upload Your Avatar</h1>

      <form onSubmit={handleUpload}>
        <input name="file" ref={inputFileRef} type="file" multiple required  accept=".pdf,.xlsx,.docx,.pptx"/>
        <button type="submit">Upload</button>
      </form>
      {blobs.length > 0 && (
        <div>
          {blobs.map((blob, index) => (
            <div key={index}>
              Blob url: <a href={blob.url}>{blob.url}</a>
            </div>
          ))}
        </div>
      )}
    </>
  );
}