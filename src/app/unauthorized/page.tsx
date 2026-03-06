import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen bg-linen flex flex-col items-center justify-center">
      <p className="text-[8rem] font-semibold text-olive/20 leading-none select-none">403</p>
      <p className="mt-2 text-sm uppercase tracking-widest text-carbon">Access denied</p>
      <p className="mt-2 text-xs text-olive tracking-wide">
        This gallery is restricted to administrators only.
      </p>
      <Link
        href="/login"
        className="mt-10 text-xs uppercase tracking-widest text-carbon border-b border-carbon/30 hover:border-carbon transition"
      >
        Back to login
      </Link>
    </main>
  );
}
