import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Link as RouterLink, useParams } from "react-router";
import ScrollTable from "@/components/ScrollTable/ScrollTable";
import { methodSectionId, type MethodReference } from "@/content/methods/types";

type MethodTableProps = {
  methods: MethodReference[];
};

// The table of a page's methods, before the reference blocks, as docs-page.html shows
// it. Each name links to its reference block. A link within the page replaces the
// history entry (plan section 3.3).
const MethodTable = ({ methods }: MethodTableProps) => {
  const { slug } = useParams();

  return (
    <ScrollTable label="Method summary">
      <table>
        <thead>
          <tr>
            <th scope="col">Method</th>
            <th scope="col">What it does</th>
          </tr>
        </thead>
        <tbody>
          {methods.map((method) => (
            <tr key={method.name}>
              <Box component="td" sx={{ whiteSpace: "nowrap" }}>
                <Link
                  component={RouterLink}
                  to={`/docs/${slug}/${methodSectionId(method.name)}`}
                  replace
                  sx={(theme) => ({
                    fontFamily: theme.tokens.fontMono,
                    fontSize: "15px",
                  })}
                >
                  {method.name}
                </Link>
              </Box>
              <Box
                component="td"
                sx={(theme) => ({
                  color: theme.tokens.bodyText,
                  // On a phone the table scrolls sideways, rather than squeeze this
                  // column to one word a line.
                  minWidth: "14em",
                })}
              >
                {method.summary}
              </Box>
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollTable>
  );
};

export default MethodTable;
