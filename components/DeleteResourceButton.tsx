"use client";

import { useState, useTransition, CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { deleteResource } from "@/app/r/[id]/actions";

export default function DeleteResourceButton({
  resourceId,
  resourceTitle,
}: {
  resourceId: number;
  resourceTitle: string;
}) {
  const router = useRouter();
  const { isLoaded, user } = useUser();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase().trim();
  const isAdminUser =
    !!adminEmail &&
    !!user?.emailAddresses.some((e) => e.emailAddress.toLowerCase() === adminEmail);

  if (!isLoaded || !isAdminUser) return null;

  const handleClick = () => {
    const confirmed = window.confirm(
      `Remove "${resourceTitle}" from public view?\n\nThe file stays in storage and existing buyers can still download it from their library, but new visitors won't see it on browse or be able to buy it.\n\nThis can be undone — ping a dev to restore.`,
    );
    if (!confirmed) return;
    setError(null);
    startTransition(async () => {
      const result = await deleteResource(resourceId);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push("/browse");
      router.refresh();
    });
  };

  return (
    <div style={s.wrap}>
      <button onClick={handleClick} disabled={pending} style={{ ...s.btn, opacity: pending ? 0.6 : 1 }}>
        {pending ? "Removing…" : "🗑 Remove from shop"}
      </button>
      {error && <div style={s.error}>{error}</div>}
    </div>
  );
}

const s: Record<string, CSSProperties> = {
  wrap: { display: "inline-flex", flexDirection: "column", gap: "4px" },
  btn: {
    padding: "6px 14px",
    borderRadius: "9999px",
    background: "transparent",
    color: "#E63946",
    border: "1.5px solid #E63946",
    fontSize: "12px",
    fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
  },
  error: { fontSize: "12px", color: "#E63946", fontFamily: "'DM Sans', sans-serif" },
};
