import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function Tablecalc({ data, headers, description }: any) {
  return (
    <Table>
      <TableCaption>{description}</TableCaption>
      <TableHeader>
        <TableRow>
          {headers.map((header: any, index: any) => (
            <TableHead key={index}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: any, index: any) => (
          <TableRow key={index}>
            {Object.values(item).map((value: any, index) => (
              <TableCell key={index}>{value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
