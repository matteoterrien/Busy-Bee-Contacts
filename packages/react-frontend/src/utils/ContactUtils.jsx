// ContactUtils.jsx

export const getCommonBoxProps = (overrides = {}) => ({
  backgroundColor: "#FFF",
  borderRadius: 20,
  p: 4,
  border: "3px solid #000",
  m: 4,
  ...overrides,
});


export const getCommonButtonProps = (overrides = {}) => ({
  variant: "solid",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  ...overrides,
});

export const getCommonAvatarProps = (overrides = {}) => ({
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
