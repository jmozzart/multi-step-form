import React, { useState } from 'react';
import { X } from 'lucide-react';

interface File {
  uuid: string;
  fileUrl: string;
  fileName: string;
}

interface Props {
  file: File;
  handleRemove: (uuid: string, event: React.MouseEvent<HTMLButtonElement>) => void;
}

const FileItem: React.FC<Props> = ({ file, handleRemove }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = (uuid: string, event: React.MouseEvent<HTMLButtonElement>) => {
	handleRemove(uuid, event);
	setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
	<li key={file.uuid} className="flex items-center justify-between">
	  <a href={file.fileUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
		{file.fileName}
	  </a>
	  <button
		onClick={(event) => handleClick(file.uuid, event)}
		className="ml-2 text-red-500 hover:text-red-700"
		aria-label="Remove file"
	  >
		<X size={16} />
	  </button>
	</li>
  );
};

export default FileItem;