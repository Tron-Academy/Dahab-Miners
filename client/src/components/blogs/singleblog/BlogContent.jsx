import React from "react";

export default function BlogContent({ data }) {
  return (
    <div className="px-5 md:px-10 lg:px-[120px] py-10 z-[10] ">
      <article>
        <h1 className="py-5 text-xl font-semibold text-center">
          {data && data.title}
        </h1>
        <p dangerouslySetInnerHTML={{ __html: data && data.content }}></p>
      </article>
    </div>
  );
}
