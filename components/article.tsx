"use client";

import Link from "next/link";
import Image from "next/image";
import { usePosts } from "@/hooks/use-article";

const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_STORAGE_URL || "https://api-travel.elhusain.travel";

export default function Article() {
  const { posts, isLoading } = usePosts({ limit: 3 });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Fungsi truncate body supaya tidak terlalu panjang
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="w-full py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-[20px] font-bold md:ml-20">Artikel</h1>
          <Link href="/artikel">
            <button className="btn btn-warning text-white hidden flex-none lg:block md:mr-20">
              Lihat Semua
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0 md:px-20">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="card bg-base-100 shadow-xl flex flex-col h-full animate-pulse"
                >
                  <div className="h-32 sm:h-40 bg-gray-200 rounded-t"></div>
                  <div className="card-body p-3 sm:p-4">
                    <div className="h-4 sm:h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="h-8 sm:h-10 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))
            : posts.map((article: any) => (
                <div
                  key={article.id}
                  className="card bg-base-100 shadow-xl flex flex-col h-full"
                >
                  <figure>
                    <Image
                      src={
                        article.imageUrls?.[0]
                          ? `${IMAGE_BASE_URL}${article.imageUrls[0]}`
                          : "/images/placeholder.jpg"
                      }
                      alt={article.title}
                      width={300}
                      height={200}
                      className="w-full h-32 sm:h-40 object-cover"
                    />
                  </figure>
                  <div className="card-body p-3 sm:p-4">
                    <span className="badge badge-xs badge-warning text-xs">
                      Artikel
                    </span>
                    <h2 className="text-base sm:text-xl font-bold mt-2 line-clamp-2 leading-tight">
                      {article.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2 sm:line-clamp-3">
                      {truncateText(article.body, 100)}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500 truncate">
                        {formatDate(article.createdAt)}
                      </span>
                    </div>
                    <div className="mt-3 sm:mt-4">
                      <Link href={`/artikel/${article.slug}`}>
                        <button className="btn btn-warning btn-block text-white text-xs sm:text-sm py-2 sm:py-2.5">
                          Baca Selengkapnya
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
