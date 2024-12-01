import { useState, useEffect } from "react";
import { Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const UpdateUserModal = ({
  open,
  onClose,
  onSubmit,
  data,
  setData,
}: {
  open: any;
  onClose: any;
  onSubmit: any;
  data: any;
  setData: any;
}) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    onSubmit({ name, title });
    setName("");
    setTitle("");
    onClose();
  };

  useEffect(() => {
    setName(data.name);
    setTitle(data.title);
  }, [data]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <div className="relative p-6 bg-white rounded-lg shadow-lg">
        {/* Close Button */}
        <button
          aria-label="close"
          onClick={onClose}
          className="absolute top-4 right-4 text-dgray-500 hover:text-gray-800"
        >
          <CloseIcon />
        </button>

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          User Details
        </h2>

        {/* Content */}
        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your name"
            />
          </div>

          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your title"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
          >
            Submit
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateUserModal;
