type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`max-w-7xl mx-auto px-6 md:px-12 lg:px-20 ${className}`}
    >
      {children}
    </div>
  );
}