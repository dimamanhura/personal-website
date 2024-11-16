interface BannerProps {
  children: React.ReactNode;
};

const Banner = ({ children }: BannerProps) => {
  return (
    <div className="w-full flex justify-center gap-4 py-4 px-6 bg-stone-200 rounded-md">
      {children}
    </div>
  );
};

export default Banner;
