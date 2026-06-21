import { useEffect, useState } from "react";

export function useActiveQuestion(questionIds: string[]): Set<string> {
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const elements = questionIds
      .map((id) => document.getElementById(`question-${id}`))
      .filter((el): el is HTMLElement => el !== null);

    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const rawId = entry.target.id.replace("question-", "");
          if (entry.isIntersecting) {
            intersecting.add(rawId);
          } else {
            intersecting.delete(rawId);
          }
        }
        setActiveIds(new Set(intersecting));
      },
      { threshold: 0.5 },
    );

    for (const el of elements) observer.observe(el);

    return () => {
      observer.disconnect();
      intersecting.clear();
    };
  }, [questionIds]);

  return activeIds;
}
