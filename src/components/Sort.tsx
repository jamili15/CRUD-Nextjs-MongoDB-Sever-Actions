"use client";
import useCustomRouter from "@/hooks/useCustomRouter";
import React from "react";

const Sort = () => {
  const { query, pushQuery } = useCustomRouter();

  return (
    <div>
      Sort: {``}
      <select
        name="sort"
        id="sort"
        value={query.sort || "createdAt_asc"}
        onChange={(e) => pushQuery({ sort: e.target.value })}
      >
        <option value="createdAt_asc">A - Z</option>
        <option value="createdAt_desc">Z - A</option>
      </select>
    </div>
  );
};

export default Sort;
