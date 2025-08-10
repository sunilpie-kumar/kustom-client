import { forwardRef, createContext, useContext } from "react";
import { Root, Item } from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

const ToggleGroupContext = createContext({
  size: "default",
  variant: "default",
});

const ToggleGroup = forwardRef(({ className, variant, size, children, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </Root>
));

ToggleGroup.displayName = Root.displayName;

const ToggleGroupItem = forwardRef(({ className, children, variant, size, ...props }, ref) => {
  const context = useContext(ToggleGroupContext);

  return (
    <Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </Item>
  );
});

ToggleGroupItem.displayName = Item.displayName;

export { ToggleGroup, ToggleGroupItem };