import React, { useRef } from "react";
import { FaBookmark, FaChevronRight } from "react-icons/fa";
import ImageWithSkeleton from "~components/Skeleton/ImageWithSkeleton";
import { useIntersectionObserver } from "~hooks/UseIntersectionObserver/UseIntersectionObserver";
import type { PostEntry, Series } from "~/types/post.type";

interface HorizontalSeriesCardProps extends Series {}

const HorizontalSeriesCard: React.FC<HorizontalSeriesCardProps> = ({
  series,
  count,
  ogImage,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef);
  const coverImage = ogImage || "/default-blog-image.jpg";

  return (
    <div
      ref={cardRef}
      className={`h-48 transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <a
        href={`/series/${encodeURIComponent(series)}`}
        className="group relative flex h-full flex-row overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white to-skin-fill/5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="flex h-full w-full">
          {/* 이미지 영역 */}
          <div className="relative h-full w-1/3 min-w-[150px] overflow-hidden">
            <ImageWithSkeleton
              src={coverImage.toString()}
              alt={series}
              className="h-full w-full object-cover"
            />
          </div>
          {/* 텍스트 영역 */}
          <div className="flex w-2/3 flex-col justify-center overflow-hidden bg-white p-4">
            <div className="flex items-center gap-2">
              <FaBookmark className="h-4 w-4 text-skin-accent" />
              <h3 className="truncate text-lg font-bold text-black-accent">
                {series}
              </h3>
            </div>
            <p className="mt-2 truncate text-sm text-black-muted">
              총 {count}개의 포스트
            </p>
            <div className="mt-2 flex items-center gap-1 text-sm font-medium text-skin-accent">
              <span className="truncate">시리즈 보기</span>
              <FaChevronRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default HorizontalSeriesCard;
