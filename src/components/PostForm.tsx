"use client";

import { createPost, updatePost } from "@/_actions/postActions";
import React, { useRef, useState } from "react";
import { useMyContext } from "@/context/Provider";
import { Data } from "@/types";

const PostForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { editPost, setEditPost } = useMyContext();

  const handleAction = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setStatus(null);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    try {
      if (editPost) {
        await updatePost({ title, image, id: editPost._id });
        setStatus("Post updated successfully");
      } else {
        await createPost({ title, image });
        setStatus("Post created successfully");
      }

      setEditPost(null);

      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (err: unknown) {
      if (editPost) {
        setError("Failed to update post");
      } else {
        setError("Failed to create post");
      }
    }
  };

  return (
    <form
      onSubmit={handleAction}
      className="flex gap-2 pl-2 items-center"
      ref={formRef}
    >
      <label htmlFor="title">
        <input
          type="text"
          placeholder="title"
          name="title"
          className="border px-1"
          required
          defaultValue={editPost?.title}
        />
      </label>
      <label htmlFor="image">
        <input
          type="text"
          placeholder="image"
          name="image"
          className="border px-1"
          required
          defaultValue={editPost?.image}
        />
      </label>

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
