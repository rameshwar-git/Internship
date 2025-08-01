import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { transactions } from "@/lib/mock-data";

export default function TransactionsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Transaction History</CardTitle>
        <CardDescription>
          A log of all donations made through your referral link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Donor Name</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">
                  {transaction.donorName === "Anonymous" ? (
                    <Badge variant="secondary">Anonymous</Badge>
                  ) : (
                    transaction.donorName
                  )}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  ₹{transaction.amount.toLocaleString("en-IN")}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
