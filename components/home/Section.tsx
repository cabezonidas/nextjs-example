import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import { Box } from "@cabezonidas/shop-ui";

export const Section = styled(Box)(() => ({
  position: "relative",
  minHeight: 400,
  height: "100%",
  width: "100%",
  scrollSnapAlign: "start",
  overflow: "hidden",
})).withComponent("section");
