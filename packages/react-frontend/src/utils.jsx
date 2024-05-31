// utils.jsx
export const getCommonProps = (overrides = {}) => ({
  alignItems: "center",
  justifyContent: "space-between",
  ...overrides,
});

export const getCommonStackProps = (overrides = {}) => ({
  spacing: 2,
  isInline: true,
  alignItems: "center",
  justifyContent: "space-between",
  ...overrides,
});

export const getCommonButtonProps = (overrides = {}) => ({
  variant: "solid",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  ...overrides,
});

export const commonAvatarProps = {
  size: "2xl",
  showBorder: true,
  border: "5px solid #ffe990",
  maxWidth: 150,
  maxHeight: 150,
  overflow: "hidden",
  minWidth: 150,
  minHeight: 150,
  className: "avatar",
  cursor: "pointer",
};

export const commonBoxProps = {
  backgroundColor: "#E4DFAF",
  borderRadius: 20,
  overflow: "hidden",
  textAlign: "left",
  lineHeight: 0,
  p: 4,
};
