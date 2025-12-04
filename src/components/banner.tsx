interface BannerProps {
  children: React.ReactNode;
};

export const Banner = ({ children }: BannerProps) => {
  return (
    <div className="w-full flex justify-center gap-4 py-4 px-6 bg-zinc-100 rounded-md">
      {children}
    </div>
  );
};
