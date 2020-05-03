import * as React from "react";
import { Box, styled } from "@cabezonidas/shop-ui";

const vhFn = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

const InnerShell = styled(Box)`
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
`;

const Shell = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Box>
>((props, ref) => {
  React.useEffect(() => {
    vhFn();
    window.addEventListener("resize", vhFn);
    return () => window.removeEventListener("resize", vhFn);
  }, []);
  return <InnerShell {...props} ref={ref} />;
});

export default Shell;
