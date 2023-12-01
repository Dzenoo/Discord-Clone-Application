"use client";
import { ImageUploadProps } from "@/types/image-upload";
import { useRef, useState, useEffect } from "react";

const ImagesUpload: React.FC<ImageUploadProps> = ({ id, onInputChange }) => {
  const filePickerRef = useRef<any | null>(null);
  const [file, setFile] = useState<string | any | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | any | undefined>();
  const [isValid, setIsValid] = useState<boolean | null>(false);

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader: FileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pickedFile;
    let fileIsValid = isValid;

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      fileIsValid = true;
    } else {
      fileIsValid = false;
    }

    onInputChange(id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className="flex justify-center items-center">
        <div className="w-36 h-36 rounded-full object-cover">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Prewiew"
              className="w-36 h-36 rounded-full object-cover"
            />
          )}
          {!previewUrl && (
            <div
              className="w-36 h-36 rounded-full border border-blue-700 flex justify-center items-center text-white cursor-pointer transition-colors hover:bg-blue-700 hover:text-white"
              onClick={pickImageHandler}
            >
              Add Image Here
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagesUpload;
