"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { defaultCourseFilters } from "@/lib/courseConstants";
import { fetchCoursesPage } from "@/services/courseService";

export function useCourses({ pageSize = 9, initialSort = "popularity" } = {}) {
  const [filters, setFilters] = useState(defaultCourseFilters);
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
        const res = await fetchCoursesPage({
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

  const clearFilters = useCallback(() => {
    setFilters({ ...defaultCourseFilters });
  }, []);

  const toggleFilterValue = useCallback((key, value) => {
    setFilters((prev) => {
      const current = prev[key] || [];
      const has = current.includes(value);
      const nextList = has ? current.filter((v) => v !== value) : [...current, value];
      return { ...prev, [key]: nextList };
    });
  }, []);

  const setFeeRange = useCallback((feeMin, feeMax) => {
    setFilters((prev) => ({ ...prev, feeMin, feeMax }));
  }, []);

  const setRatingMin = useCallback((ratingMin) => {
    setFilters((prev) => ({ ...prev, ratingMin }));
  }, []);

  const activeFilterTags = useMemo(() => {
    const tags = [];
    filters.streams.forEach((v) => tags.push({ key: `st:${v}`, label: v, group: "streams", value: v }));
    filters.levels.forEach((v) => tags.push({ key: `lv:${v}`, label: v, group: "levels", value: v }));
    filters.durations.forEach((v) => tags.push({ key: `du:${v}`, label: v, group: "durations", value: v }));
    filters.modes.forEach((v) => tags.push({ key: `mo:${v}`, label: v, group: "modes", value: v }));
    filters.entranceExams.forEach((v) => tags.push({ key: `ex:${v}`, label: v, group: "entranceExams", value: v }));
    filters.specializations.forEach((v) => tags.push({ key: `sp:${v}`, label: v, group: "specializations", value: v }));
    if (filters.feeMin > defaultCourseFilters.feeMin || filters.feeMax < defaultCourseFilters.feeMax) {
      tags.push({
        key: "fee",
        label: `Fees ₹${filters.feeMin}–${filters.feeMax} L/yr`,
        group: "__fee",
        value: null
      });
    }
    if (filters.ratingMin > 0) {
      tags.push({ key: "rt", label: `${filters.ratingMin}+ rating`, group: "__rating", value: null });
    }
    return tags;
  }, [filters]);

  const removeTag = useCallback((tag) => {
    if (tag.group === "__fee") {
      setFilters((prev) => ({
        ...prev,
        feeMin: defaultCourseFilters.feeMin,
        feeMax: defaultCourseFilters.feeMax
      }));
      return;
    }
    if (tag.group === "__rating") {
      setFilters((prev) => ({ ...prev, ratingMin: 0 }));
      return;
    }
    setFilters((prev) => ({
      ...prev,
      [tag.group]: (prev[tag.group] || []).filter((x) => x !== tag.value)
    }));
  }, []);

  return {
    filters,
    setFilters,
    toggleFilterValue,
    setFeeRange,
    setRatingMin,
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
    activeFilterTags,
    removeTag,
    page,
    pageSize
  };
}
