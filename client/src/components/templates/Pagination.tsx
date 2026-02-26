"use client";
import { PAGE_SIZE } from "@/features/users/constants/constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  pageNo : number,
  dataSize: number;
}

// Utility: produces a windowed page range with ellipsis markers
function getPageRange(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [1];

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");

  pages.push(total);
  return pages;
}

export function Pagination({ pageNo, dataSize }: PaginationProps) {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const totalPages = Math.max(1, Math.ceil(dataSize / PAGE_SIZE));
  const currentPage = Math.min(Math.max(pageNo, 1), totalPages);

  const setPage = (nextPage: number) => {
    const page = Math.min(Math.max(Math.floor(nextPage), 1), totalPages);
    const newParams = new URLSearchParams(Array.from(params.entries()));

    if (page === 1) {
      newParams.delete("page");
    } else {
      newParams.set("page", String(page));
    }

    const search = newParams.toString();
    router.push(search ? `${pathname}?${search}` : pathname);
  };

  const firstItem = dataSize === 0 ? 0 : Math.min((currentPage - 1) * PAGE_SIZE + 1, dataSize);
  const lastItem  = dataSize === 0 ? 0 : Math.min(currentPage * PAGE_SIZE, dataSize);
  const pageRange = getPageRange(currentPage, totalPages);

  return (
    <div className="flex items-center justify-between mt-4 px-1">
      <p className="text-zinc-500 text-xs">
        Showing <span className="text-zinc-300">{firstItem}–{lastItem}</span>{" "}
        of <span className="text-zinc-300">{dataSize}</span> users
      </p>

      <div className="flex items-center gap-1">
        <button
          disabled={currentPage === 1}
          onClick={() => setPage(currentPage - 1)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {pageRange.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-zinc-500 text-xs">
              …
            </span>
          ) : (
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
          )
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setPage(currentPage + 1)}
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