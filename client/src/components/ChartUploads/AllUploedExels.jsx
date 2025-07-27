import React from "react";
import { useExcelUpload } from "../../context/excelUploadcontext";
import { useNavigate, Link } from "react-router-dom";
import { SquareArrowOutUpRight } from "lucide-react";

const AllUploedExels = () => {
  const { excelData, loading, error } = useExcelUpload();
  const navigate = useNavigate();

  if (loading) return <div>Loading Excel Data...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-[var(--card)] p-6 rounded-lg shadow-md border border-[var(--border)]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Uploaded Excel Files</h2>
      </div>

      {excelData.length === 0 ? (
        <div className="text-gray-500">
          <p>No files uploaded yet.</p>
          <Link
            to="/upload"
            className=" text-gray-500 hover:text-indigo-500 transition"
          >
            Click here to upload files
          </Link>
        </div>
      ) : (
        <ul className="space-y-2">
          {excelData.map((file) => (
            <li
              key={file._id}
              onClick={() =>
                navigate(`/upload/chart/${encodeURIComponent(file.fileName)}`, {
                  state: { fileData: file },
                })
              }
              className="flex items-center justify-between border border-gray-200 rounded-md p-3 hover:bg-[var(--border)] text-black transition cursor-pointer"
            >
              <span
                className="text-[var(--text)] truncate max-w-[80%]"
                title={file.fileName}
              >
                {file.fileName}
              </span>
              <SquareArrowOutUpRight
                size={16}
                className="text-blue-600 shrink-0"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllUploedExels;
