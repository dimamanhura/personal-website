interface BannerProps {
  children: React.ReactNode;
}

export const Banner = ({ children }: BannerProps) => {
  return (
    <div className="flex w-full justify-center gap-4 rounded-md bg-zinc-100 px-6 py-4">
      {children}
    </div>
  );
};
