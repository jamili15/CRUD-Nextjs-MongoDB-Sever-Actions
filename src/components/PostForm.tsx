"use client";

import { createPost, updatePost } from "@/_actions/postActions";
import React, { useEffect, useRef, useState } from "react";
import { useMyContext } from "@/context/Provider";

const PostForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { editPost, setEditPost } = useMyContext();

  const handleAction = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus(null);
    setError(null);

    try {
      if (editPost) {
        await updatePost({ title, image, description, _id: editPost._id });
        setStatus("Post updated successfully");
      } else {
        await createPost({ title, image, description });
        setStatus("Post created successfully");
      }

      setEditPost(null);
      setDescription("");
      setTitle("");
      setImage("");
    } catch (err) {
      if (editPost) {
        setError("Failed to update post");
      } else {
        setError("Failed to create post");
      }
    }
  };

  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title);
      setDescription(editPost.description);
      setImage(editPost.image);
    }
  }, [editPost]);

  return (
    <form
      onSubmit={handleAction}
      className="flex gap-2 pl-2 items-center"
      ref={formRef}
    >
      <div className="flex flex-col gap-5 ">
        <label htmlFor="title">
          <input
            type="text"
            placeholder="title"
            name="title"
            className="border px-1"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="description">
          <input
            type="text"
            placeholder="description"
            name="description"
            className="border px-1"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label htmlFor="image">
          <input
            type="text"
            placeholder="image"
            name="image"
            className="border px-1"
            value={image}
            required
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
      </div>

      {editPost ? (
        <>
          <button type="submit" className="p-1 border rounded bg-gray-200 px-2">
            Update
          </button>
          <button
            type="button"
            className="p-1 border rounded bg-gray-200 px-2"
            onClick={() => {
              setEditPost(null);
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button type="submit" className="p-1 border rounded bg-gray-200 px-2">
            Create
          </button>
        </>
      )}

      {status && <p className="text-green-500">{status}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default PostForm;
