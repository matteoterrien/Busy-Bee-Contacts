// CreateContactUtils.jsx
import {
  DeleteIcon,
} from "@chakra-ui/icons";

export const getCommonBoxProps = (overrides = {}) => ({
    backgroundColor: "#FFF",
    borderRadius: 20,
    p: 4,
    border: "3px solid #000",
    m: 4,
    ...overrides,
  });
  
  export const getCommonHStackProps = (overrides = {}) => ({
    spacing: 2,
    alignItems: "center",
    justifyContent: "space-between",
    ...overrides,
  });
  
  export const getCommonButtonProps = (overrides = {}) => ({
    variant: "solid",
    size: "md",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    ...overrides,
  });
  
  export const getCommonAvatarProps = (overrides = {}) => ({
    size: "2xl",
    showBorder: true,
    border: "5px solid #6969",
    maxWidth: 150,
    maxHeight: 150,
    overflow: "hidden",
    minWidth: 150,
    minHeight: 150,
    ...overrides,
  });
  
  export const getCommonStackProps = (overrides = {}) => ({
    spacing: 6,
    isInline: true,
    justifyContent: "space-between",
    alignItems: "center",
    m: 3,
    ...overrides,
  });
  
  export const getCommonInnerBoxProps = (overrides = {}) => ({
    backgroundColor: "#E4DFAF",
    borderRadius: 20,
    overflow: "hidden",
    textAlign: "left",
    lineHeight: 0,
    p: 4,
    ...overrides,
  });
  
  export const getIconButtonProps = (overrides = {}) => ({
    ariaLabel: "icon",
    icon: <DeleteIcon />,
    size: "md",
    backgroundColor: "red.500",
    className: "butred",
    ...overrides,
  });
  
  export const getAvatarGroupProps = (overrides = {}) => ({
    spacing: 3,
    max: 25,
    size: "xl",
    justifyContent: "center",
    m: 3,
    height: 130,
    overflow: "scroll",
    alignItems: "stretch",
    flexDirection: "row",
    display: "block",
    opacity: 1,
    backgroundColor: "whiteAlpha.300",
    ...overrides,
  });
  