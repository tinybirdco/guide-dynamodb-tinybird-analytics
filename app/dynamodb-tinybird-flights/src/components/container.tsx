import { cn } from "@/lib/utils";

export type Props = React.HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
  classNameContent?: string;
};

const Container = ({
  children,
  className,
  classNameContent,
  ...rest
}: Props) => {
  return (
    <div {...rest} className={cn("relative w-full", className)}>
      <div
        className={cn(
          "grid grid-cols-4 gap-x-5 w-full px-12 mx-auto max-w-7xl md:grid-cols-12 md:gap-x-6 md:px-12 lg:gap-x-8 lg:px-12",
          classNameContent
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
