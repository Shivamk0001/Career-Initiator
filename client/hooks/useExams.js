"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { defaultExamFilters } from "@/lib/examConstants";
import { fetchExamsPage } from "@/services/examService";

/**
 * Paginated exam listing with filter/sort/search.
 * Replace `fetchExamsPage` with a real API client when backend is ready.
 */
export function useExams({ pageSize = 6, initialSort = "latest" } = {}) {
  const [filters, setFilters] = useState(defaultExamFilters);
  const [sort, setSort] = useState(initialSort);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const requestId = useRef(0);
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 320);
    return () => clearTimeout(t);
  }, [search]);

  const loadPage = useCallback(
    async (nextPage, append) => {
      const id = ++requestId.current;
      const isFirst = !append;
      if (isFirst) setLoading(true);
      else setLoadingMore(true);
      setError(null);
      try {
        const res = await fetchExamsPage({
          filters: filtersRef.current,
          sort,
          search: debouncedSearch,
          page: nextPage,
          pageSize
        });
        if (id !== requestId.current) return;
        setTotal(res.total);
        setHasMore(res.hasMore);
        setItems((prev) => (append ? [...prev, ...res.items] : res.items));
      } catch (e) {
        if (id !== requestId.current) return;
        setError(e?.message || "Something went wrong.");
        if (!append) setItems([]);
      } finally {
        if (id === requestId.current) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    },
    [debouncedSearch, pageSize, sort]
  );

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sort, filters]);

  useEffect(() => {
    loadPage(1, false);
  }, [debouncedSearch, sort, filters, loadPage]);

  const loadMore = useCallback(() => {
    if (!hasMore || loading || loadingMore) return;
    setPage((prev) => {
      const next = prev + 1;
      loadPage(next, true);
      return next;
    });
  }, [hasMore, loadPage, loading, loadingMore]);

  const refresh = useCallback(() => {
    setPage(1);
    loadPage(1, false);
  }, [loadPage]);

  const clearFilters = useCallback(() => {
    setFilters({ ...defaultExamFilters });
  }, []);

  const toggleFilterValue = useCallback((key, value) => {
    setFilters((prev) => {
      const current = prev[key] || [];
      const has = current.includes(value);
      const nextList = has ? current.filter((v) => v !== value) : [...current, value];
      return { ...prev, [key]: nextList };
    });
  }, []);

  const activeFilterTags = useMemo(() => {
    const tags = [];
    filters.streams.forEach((v) => tags.push({ key: `stream:${v}`, label: v, group: "streams" }));
    filters.levels.forEach((v) => tags.push({ key: `level:${v}`, label: v, group: "levels" }));
    filters.modes.forEach((v) => tags.push({ key: `mode:${v}`, label: v, group: "modes" }));
    filters.examTypes.forEach((v) => tags.push({ key: `type:${v}`, label: v, group: "examTypes" }));
    filters.applicationStatuses.forEach((v) => tags.push({ key: `app:${v}`, label: v, group: "applicationStatuses" }));
    return tags;
  }, [filters]);

  const removeTag = useCallback((tag) => {
    setFilters((prev) => ({
      ...prev,
      [tag.group]: (prev[tag.group] || []).filter((x) => x !== tag.label)
    }));
  }, []);

  return {
    filters,
    setFilters,
    toggleFilterValue,
    clearFilters,
    sort,
    setSort,
    search,
    setSearch,
    debouncedSearch,
    items,
    total,
    hasMore,
    loading,
    loadingMore,
    error,
    loadMore,
    refresh,
    activeFilterTags,
    removeTag,
    page,
    pageSize
  };
}
