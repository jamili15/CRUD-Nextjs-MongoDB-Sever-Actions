"use client";
import { createPost, updatePost } from "@/_actions/postActions";
import React, { useRef, useState } from "react";
import { useMyContext } from "@/context/Provider";

const PostForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { editPost, setEditPost } = useMyContext();

  const handleAction = async (formData: FormData) => {
    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const image = formData.get("image") as string | null;

    if (!title || !description || !image) {
      setError("All fields are required.");
      return;
    }

    try {
      if (editPost) {
        await updatePost({ title, description, image, _id: editPost._id });
        setStatus("Post updated successfully");
      } else {
        await createPost({ title, description, image });
        setStatus("Post created successfully");
      }

      setEditPost(null);
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (err) {
      setError(editPost ? "Failed to update post" : "Failed to create post");
    }
  };

  return (
    <form
      action={handleAction}
      ref={formRef}
      className="flex gap-2 pl-2 items-center"
    >
      <label htmlFor="title">
        <input
          type="text"
          name="title"
          placeholder="title"
          required
          defaultValue={editPost?.title}
        />
      </label>
      <label htmlFor="description">
        <input
          type="text"
          name="description"
          placeholder="description"
          defaultValue={editPost?.description}
          required
        />
      </label>
      <label htmlFor="image">
        <input
          type="text"
          name="image"
          placeholder="image"
          defaultValue={editPost?.image}
          required
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
