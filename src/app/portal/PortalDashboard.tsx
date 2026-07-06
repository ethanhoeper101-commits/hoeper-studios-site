"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  IconPhone,
  IconMail,
  IconTrash,
  IconCopy,
  IconCheck,
  IconSearch,
  IconLogout,
  IconInbox,
  IconChevronDown,
  IconRefresh,
} from "@tabler/icons-react";
import {
  type Lead,
  hadWebsiteLabel,
  goalsLabel,
  digitsOnly,
} from "@/lib/lead-types";
import { markLeadReadAction, deleteLeadAction } from "./actions";

type Filter = "all" | "new" | "read";

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export default function PortalDashboard({ leads }: { leads: Lead[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [isPending, startTransition] = useTransition();

  const unreadCount = leads.filter((l) => !l.read).length;
  const weekCount = useMemo(
    () => leads.filter((l) => Date.now() - l.createdAt < WEEK_MS).length,
    [leads]
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (filter === "new" && l.read) return false;
      if (filter === "read" && !l.read) return false;
      if (!q) return true;
      return [l.yourName, l.businessName, l.businessType, l.city, l.email, l.phone]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [leads, query, filter]);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: `All ${leads.length}` },
    { key: "new", label: `New ${unreadCount}` },
    { key: "read", label: `Read ${leads.length - unreadCount}` },
  ];

  async function handleLogout() {
    await fetch("/api/portal/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <main className="min-h-[100dvh] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-[1100px]">
        {/* Header */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/30 bg-gold/[0.06]">
              <svg viewBox="0 0 64 64" width="22" height="22" aria-hidden>
                <g fill="#C9A84C">
                  <rect x="19" y="15" width="8" height="34" rx="1.5" />
                  <rect x="37" y="15" width="8" height="34" rx="1.5" />
                  <rect x="14" y="33" width="31" height="7" rx="1.5" />
                </g>
              </svg>
            </span>
            <div>
              <h1 className="font-display text-xl font-semibold text-white md:text-2xl">
                Leads Portal
              </h1>
              <p className="text-xs text-gray-muted">Hoeper Studios</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.refresh()}
              className="inline-flex items-center gap-2 rounded-sm border border-white/10 px-3.5 py-2 text-xs font-bold tracking-widest text-white/70 transition-colors hover:border-gold/40 hover:text-gold"
            >
              <IconRefresh size={15} /> REFRESH
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-sm border border-white/10 px-3.5 py-2 text-xs font-bold tracking-widest text-white/70 transition-colors hover:border-gold/40 hover:text-gold"
            >
              <IconLogout size={15} /> LOG OUT
            </button>
          </div>
        </header>

        {/* Stat tiles */}
        <div className="mb-8 grid grid-cols-3 gap-3 md:gap-4">
          <Stat label="Total leads" value={leads.length} />
          <Stat label="New" value={unreadCount} accent />
          <Stat label="This week" value={weekCount} />
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xs">
            <IconSearch
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/50"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, business, city…"
              className="w-full rounded-sm border border-white/10 bg-black/40 py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 transition-colors focus:border-gold/60 focus:outline-none"
            />
          </div>

          <div className="flex gap-1.5">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-sm border px-3.5 py-2 text-xs font-bold tracking-widest transition-colors ${
                  filter === f.key
                    ? "border-gold/60 bg-gold/10 text-gold"
                    : "border-white/10 text-white/60 hover:border-gold/30 hover:text-white"
                }`}
              >
                {f.label.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        {visible.length === 0 ? (
          <EmptyState hasLeads={leads.length > 0} />
        ) : (
          <div className="flex flex-col gap-3">
            {visible.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                isPending={isPending}
                onToggleRead={() =>
                  startTransition(async () => {
                    await markLeadReadAction(lead.id, !lead.read);
                    router.refresh();
                  })
                }
                onDelete={() =>
                  startTransition(async () => {
                    await deleteLeadAction(lead.id);
                    router.refresh();
                  })
                }
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="rounded-sm border border-border-subtle bg-surface-card px-4 py-5 text-center md:py-7">
      <p
        className={`font-display text-3xl font-semibold leading-none md:text-5xl ${
          accent && value > 0 ? "text-gold" : "text-white"
        } tabular-nums`}
      >
        {value}
      </p>
      <p className="mt-2 text-xs text-gray-muted md:text-sm">{label}</p>
    </div>
  );
}

function EmptyState({ hasLeads }: { hasLeads: boolean }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-sm border border-dashed border-white/10 py-20 text-center">
      <IconInbox size={40} className="text-gold/40" stroke={1.4} />
      <p className="text-white/70">
        {hasLeads ? "No leads match your search." : "No leads yet."}
      </p>
      <p className="max-w-xs text-sm text-gray-muted">
        {hasLeads
          ? "Try a different search or filter."
          : "New demo requests from your website will show up here automatically."}
      </p>
    </div>
  );
}

function LeadCard({
  lead,
  isPending,
  onToggleRead,
  onDelete,
}: {
  lead: Lead;
  isPending: boolean;
  onToggleRead: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(!lead.read);
  const [copied, setCopied] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const when = mounted
    ? new Date(lead.createdAt).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  function copyDetails() {
    const text = [
      `Name: ${lead.yourName}`,
      `Business: ${lead.businessName} (${lead.businessType})`,
      `Phone: ${lead.phone}`,
      `Email: ${lead.email}`,
      `City: ${lead.city}`,
      lead.currentWebsite ? `Current site: ${lead.currentWebsite}` : null,
      `Had a website: ${hadWebsiteLabel(lead.hadWebsite)}`,
      `Goal: ${goalsLabel(lead.goals)}`,
      lead.message ? `Notes: ${lead.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <div
      className={`overflow-hidden rounded-sm border bg-surface-card transition-colors ${
        lead.read ? "border-border-subtle" : "border-gold/40"
      }`}
    >
      {/* Summary row */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 px-4 py-4 text-left md:px-6"
      >
        {!lead.read && (
          <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-gold" aria-label="New" />
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg font-semibold text-white">
            {lead.businessName}
          </p>
          <p className="truncate text-sm text-gray-muted">
            {lead.yourName} · {lead.businessType} · {lead.city}
          </p>
        </div>
        <div className="hidden flex-shrink-0 text-right text-xs text-gray-muted sm:block">
          {when}
        </div>
        <IconChevronDown
          size={18}
          className={`flex-shrink-0 text-gold/60 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Details */}
      {open && (
        <div className="border-t border-white/5 px-4 py-5 md:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Phone">
              <a href={`tel:+1${digitsOnly(lead.phone)}`} className="text-gold hover:text-gold-light">
                {lead.phone}
              </a>
            </Field>
            <Field label="Email">
              <a href={`mailto:${lead.email}`} className="break-all text-gold hover:text-gold-light">
                {lead.email}
              </a>
            </Field>
            <Field label="Current website">
              {lead.currentWebsite ? (
                <a
                  href={
                    lead.currentWebsite.startsWith("http")
                      ? lead.currentWebsite
                      : `https://${lead.currentWebsite}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-gold hover:text-gold-light"
                >
                  {lead.currentWebsite}
                </a>
              ) : (
                <span className="text-white/40">None</span>
              )}
            </Field>
            <Field label="Had a website before">
              <span className="text-white/90">{hadWebsiteLabel(lead.hadWebsite)}</span>
            </Field>
            <Field label="Main goal">
              <span className="text-white/90">{goalsLabel(lead.goals)}</span>
            </Field>
            {when && (
              <Field label="Submitted">
                <span className="text-white/90">{when}</span>
              </Field>
            )}
          </div>

          {lead.message && (
            <div className="mt-4">
              <p className="mb-1.5 text-xs font-bold tracking-widest text-gold/70">NOTES</p>
              <p className="whitespace-pre-wrap rounded-sm border border-white/5 bg-black/30 p-3 text-sm leading-relaxed text-white/90">
                {lead.message}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <a
              href={`tel:+1${digitsOnly(lead.phone)}`}
              className="btn-press inline-flex items-center gap-2 rounded-sm bg-gold px-4 py-2 text-xs font-bold tracking-widest text-black"
            >
              <IconPhone size={15} /> CALL
            </a>
            <a
              href={`mailto:${lead.email}`}
              className="inline-flex items-center gap-2 rounded-sm border border-gold/40 px-4 py-2 text-xs font-bold tracking-widest text-gold transition-colors hover:bg-gold/5"
            >
              <IconMail size={15} /> EMAIL
            </a>
            <button
              onClick={copyDetails}
              className="inline-flex items-center gap-2 rounded-sm border border-white/10 px-4 py-2 text-xs font-bold tracking-widest text-white/70 transition-colors hover:border-gold/30 hover:text-white"
            >
              {copied ? <IconCheck size={15} className="text-gold" /> : <IconCopy size={15} />}
              {copied ? "COPIED" : "COPY"}
            </button>
            <button
              onClick={onToggleRead}
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-sm border border-white/10 px-4 py-2 text-xs font-bold tracking-widest text-white/70 transition-colors hover:border-gold/30 hover:text-white disabled:opacity-50"
            >
              {lead.read ? "MARK NEW" : "MARK READ"}
            </button>

            <div className="ml-auto">
              {confirming ? (
                <span className="inline-flex items-center gap-2">
                  <span className="text-xs text-white/60">Delete?</span>
                  <button
                    onClick={onDelete}
                    disabled={isPending}
                    className="inline-flex items-center gap-1.5 rounded-sm bg-red-500/90 px-3 py-2 text-xs font-bold tracking-widest text-white hover:bg-red-500 disabled:opacity-50"
                  >
                    <IconTrash size={14} /> YES
                  </button>
                  <button
                    onClick={() => setConfirming(false)}
                    className="rounded-sm border border-white/10 px-3 py-2 text-xs font-bold tracking-widest text-white/60"
                  >
                    NO
                  </button>
                </span>
              ) : (
                <button
                  onClick={() => setConfirming(true)}
                  className="inline-flex items-center gap-2 rounded-sm border border-white/10 px-4 py-2 text-xs font-bold tracking-widest text-white/50 transition-colors hover:border-red-500/50 hover:text-red-400"
                >
                  <IconTrash size={15} /> DELETE
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-xs font-bold tracking-widest text-gold/70">
        {label.toUpperCase()}
      </p>
      <div className="text-sm">{children}</div>
    </div>
  );
}
