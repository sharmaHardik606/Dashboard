import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { EllipsisVertical } from "lucide-react";


export default function InvoiceTable() {

    const invoices = [
  {
    id: "INV001",
    name: "John Doe",
    amount: "$120.00",
    renewalDate: "2025-08-01",
    status: "Paid",
  },
  {
    id: "INV002",
    name: "Jane Smith",
    amount: "$89.99",
    renewalDate: "2025-08-15",
    status: "Pending",
  },
  {
    id: "INV003",
    name: "Michael Johnson",
    amount: "$150.50",
    renewalDate: "2025-09-01",
    status: "Overdue",
  },
  {
    id: "INV004",
    name: "Emily Davis",
    amount: "$59.00",
    renewalDate: "2025-07-25",
    status: "Paid",
  },
  {
    id: "INV005",
    name: "Daniel Lee",
    amount: "$200.00",
    renewalDate: "2025-07-30",
    status: "Pending",
  },
];


return (
<div className="">
<Table className="">
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice ID</TableHead>
      <TableHead>Name</TableHead>
      <TableHead >Amount</TableHead>
      <TableHead>Renewal Date</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Action</TableHead>
    </TableRow>
  </TableHeader>
  {invoices.map((invoice) => (
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">{invoice.id}</TableCell>
      <TableCell className="font-medium">{invoice.name}</TableCell>
      <TableCell >{invoice.amount}</TableCell>
      <TableCell >{invoice.renewalDate}</TableCell>
      <TableCell>{invoice.status}</TableCell>
      <TableCell><EllipsisVertical /></TableCell>   
    </TableRow>
  </TableBody>
  ))}
</Table>
</div>
    );
}