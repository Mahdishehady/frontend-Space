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
    <Table >
      
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
      {description && (<TableFooter className="bg-primary-foreground text-foreground" >
        <TableRow >
          <TableCell colSpan={3}>Mean</TableCell>
          <TableCell className="text-left ">{description.mean}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3}>STD</TableCell>
          <TableCell className="text-left">{description.STD}</TableCell>
        </TableRow>
      </TableFooter>)}
      
    </Table>
  );
}
