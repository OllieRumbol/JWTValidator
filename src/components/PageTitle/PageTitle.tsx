type PageTitleProps = {
  // The page's name. Home has none.
  name?: string;
};

// The browser tab title, in the form spec section 6.1.1, item 9 gives. React places the
// <title> in the document head.
const PageTitle = ({ name }: PageTitleProps) => {
  const title = name ? `${name} — JWT Validator` : "JWT Validator";
  return <title>{title}</title>;
};

export default PageTitle;
