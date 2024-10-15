import Link from 'next/link';

export const Footer = () => {
  const date = new Date();
  return (
    <footer>
      <div className="container flex flex-col justify-center items-center gap-4 p-2">
        <p className="text-xs">© Copyright {date.getFullYear()}</p>
        <Link
          href="https://github.com/EnderPuentes/ula-msi-distributions"
          aria-label="See source code"
          className="text-xs flex justify-center gap-4 items-center underline"
          target="_blank"
        >
          See source code
        </Link>
      </div>
    </footer>
  );
};
