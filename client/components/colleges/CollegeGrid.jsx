"use client";

import CollegeCard from "@/components/colleges/CollegeCard";

export default function CollegeGrid({ colleges, wishlist, compareList, onSave, onCompare }) {
  const compareSet = new Set(compareList.map((c) => c._id || c.website_link));
  const wishSet = new Set(wishlist.map((c) => c._id || c.website_link));

  return (
    <div className="space-y-4">
      {colleges.map((college) => {
        const id = college._id || college.website_link;
        return (
          <CollegeCard
            key={id}
            college={college}
            saved={wishSet.has(id)}
            compared={compareSet.has(id)}
            compareDisabled={compareList.length >= 3 && !compareSet.has(id)}
            onSave={onSave}
            onCompare={onCompare}
          />
        );
      })}
    </div>
  );
}
