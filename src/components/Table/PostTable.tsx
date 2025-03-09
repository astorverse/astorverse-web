import type { CollectionEntry } from "astro:content";
import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";

interface PostTableProps {
  posts: CollectionEntry<"posts">[];
}

const PostTable: React.FC<PostTableProps> = ({ posts }) => {
  const handleRowClick = (postId: string) => {
    window.location.href = `/admin/blog/posts/${postId}`;
  };

  return (
    <div className="overflow-hidden rounded-lg border border-skin-line bg-transparent">
      <div className="h-full w-full overflow-x-auto">
        <table className="m-0 h-full w-full min-w-full divide-y divide-skin-line">
          <thead className="bg-skin-fill">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-black-muted">
                제목
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-black-muted">
                작성자
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-black-muted">
                작성일
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-black-muted">
                태그
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-black-muted">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-skin-line">
            {posts.map(post => (
              <tr
                key={post.id}
                onClick={() => handleRowClick(post.id)}
                className="cursor-pointer hover:bg-skin-fill/50"
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="font-medium text-black-accent">
                    {post.data.title}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-black-base">
                  {post.data.author}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-black-base">
                  {post.data.createdAt}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {post.data.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-skin-accent/10 px-2 py-0.5 text-xs font-medium text-skin-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <a
                      href={`/admin/blog/posts/${post.id}/edit`}
                      className="inline-flex items-center rounded p-1 text-black-muted hover:text-skin-accent"
                      title="수정"
                      onClick={e => e.stopPropagation()}
                    >
                      <FaPen className="text-sm" />
                    </a>
                    <button
                      className="hover:text-danger inline-flex items-center rounded p-1 text-black-muted"
                      title="삭제"
                      onClick={e => {
                        e.stopPropagation();
                        // 삭제 로직 구현
                      }}
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostTable;
