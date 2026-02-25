"use client";
import { PAGE_SIZE } from "@/features/users/constants/constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  pageNo : number,
  dataSize: number;
}

export function Pagination({ pageNo, dataSize }: PaginationProps) {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const totalPages = Math.max(1, Math.ceil(dataSize / PAGE_SIZE));

  // parse page param, default to 1, clamp to [1, totalPages]

  let currentPage = Math.min(Math.max(pageNo, 1), totalPages);

  // helper to update page while preserving other query params
  const setPage = (nextPageOrUpdater: number | ((prev: number) => number)) => {
    const nextPage = typeof nextPageOrUpdater === "function"
      ? nextPageOrUpdater(currentPage)
      : nextPageOrUpdater;

    const page = Math.min(Math.max(Math.floor(nextPage), 1), totalPages);
    currentPage = page;
    // build new search params from existing ones
    const newParams = new URLSearchParams(Array.from(params.entries()));
    if (page === 1) {
      // remove page param to keep canonical URL for first page
      newParams.delete("page");
    } else {
      newParams.set("page", String(page));
    }

    const search = newParams.toString();
    const href = search ? `${pathname}?${search}` : pathname;
    router.push(href);
  };

  // compute display range
  const firstItem = dataSize === 0 ? 0 : Math.min((currentPage - 1) * PAGE_SIZE + 1, dataSize);
  const lastItem = dataSize === 0 ? 0 : Math.min(currentPage * PAGE_SIZE, dataSize);

  return (
    <div className="flex items-center justify-between mt-4 px-1">
      <p className="text-zinc-500 text-xs">
        Showing{" "}
        <span className="text-zinc-300">
          {firstItem}–{lastItem}
        </span>{" "}
        of <span className="text-zinc-300">{dataSize}</span> users
      </p>
      <div className="flex items-center gap-1">
        <button
          disabled={currentPage === 1}
          onClick={() => setPage((p) => p - 1)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-all border ${
              p === currentPage
                ? "bg-indigo-600 border-indigo-500 text-white"
                : "border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.08]"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}