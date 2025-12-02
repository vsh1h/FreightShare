"use client";

import React from "react";

export default function EditProfileModal({
  show,
  onClose,
  editName,
  setEditName,
  editPhone,
  setEditPhone,
  editEmail,
  setEditEmail,
  editPassword,
  setEditPassword,
  editCurrentPassword,
  setEditCurrentPassword,
  editConfirmPassword,
  setEditConfirmPassword,
  profilePreview,
  savedProfilePicUrl,
  handleProfilePicChange,
  handleDeleteProfilePic,
  submitEdit,
}) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Edit Profile</h3>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        <form onSubmit={submitEdit} className="mt-4 space-y-3">
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full mt-1 border rounded p-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <input
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              className="w-full mt-1 border rounded p-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              type="email"
              className="w-full mt-1 border rounded p-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Current Password</label>
            <input
              value={editCurrentPassword}
              onChange={(e) => setEditCurrentPassword(e.target.value)}
              type="password"
              className="w-full mt-1 border rounded p-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">New Password</label>
            <input
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
              type="password"
              className="w-full mt-1 border rounded p-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Confirm New Password
            </label>
            <input
              value={editConfirmPassword}
              onChange={(e) => setEditConfirmPassword(e.target.value)}
              type="password"
              className="w-full mt-1 border rounded p-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Profile picture</label>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-sm text-gray-500">
                {profilePreview
                  ? "Selected image"
                  : savedProfilePicUrl
                  ? "Saved image"
                  : "No image selected"}
              </span>
              <label className="px-3 py-2 bg-white border rounded cursor-pointer text-sm">
                Choose file
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="hidden"
                />
              </label>
            </div>

            {profilePreview && (
              <div className="relative inline-block">
                <img
                  src={profilePreview}
                  alt="preview"
                  className="w-24 h-24 mt-2 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={handleDeleteProfilePic}
                  className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-xs border hover:bg-red-100"
                >
                  ✕
                </button>
              </div>
            )}

            {!profilePreview && savedProfilePicUrl && (
              <div className="relative inline-block">
                <img
                  src={savedProfilePicUrl}
                  alt="preview"
                  className="w-24 h-24 mt-2 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={handleDeleteProfilePic}
                  className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-xs border hover:bg-red-100"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-white border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
