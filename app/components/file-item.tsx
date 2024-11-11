import React, { useState } from 'react';
import { X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface File {
	fileUrl: string;
	fileName: string;
}

interface Props {
	file: File;
	handleRemove: (fileUrl: string, event: React.MouseEvent<HTMLButtonElement>) => void;
}

const FileItem: React.FC<Props> = ({ file, handleRemove }) => {
	const [isVisible, setIsVisible] = useState(true);

	const handleClick = (fileUrl: string, event: React.MouseEvent<HTMLButtonElement>) => {
		handleRemove(fileUrl, event);
		setIsVisible(false);
	};

	if (!isVisible) return null;

	return (
		<li key={file.fileUrl} className={twMerge("flex items-center justify-between")}>
			<a href={file.fileUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
				{file.fileName}
			</a>
			<button
				onClick={(event) => handleClick(file.fileUrl, event)}
				className="ml-2 text-red-500 hover:text-red-700"
				aria-label="Remove file"
			>
				<X size={16} />
			</button>
		</li>
	);
};

export default FileItem;