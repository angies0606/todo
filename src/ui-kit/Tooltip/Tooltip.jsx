import { styled } from "@mui/material/styles";
import MaterialTooltip, { tooltipClasses } from "@mui/material/Tooltip";

const Tooltip = styled(({ className, ...props }) => (
  <MaterialTooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.info.main
  },
  
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.info.main
  },
}));

export default Tooltip;