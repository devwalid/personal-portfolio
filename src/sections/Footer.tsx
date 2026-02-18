export default function Footer() {
  return (
    <footer className="relative border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-6">
        {/* Copyright */}
        <p className="text-muted-foreground text-sm text-center">
          Made by Walid Himself | All Rights Reserved © {new Date().getFullYear()}
        </p>
      </div>

      {/* Giant name */}
      <div className="relative -mb-[0.15em] select-none pointer-events-none">
        <h2 className="text-[20vw] font-black leading-none tracking-tighter text-center text-foreground/[0.03] uppercase">
          WALID
        </h2>
      </div>
    </footer>
  );
}
