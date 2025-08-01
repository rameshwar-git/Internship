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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { leaderboard } from "@/lib/mock-data";
import { Trophy } from "lucide-react";

type LeaderboardEntry = {
  rank: number;
  name: string;
  amount: number;
};

function LeaderboardTable({ data }: { data: LeaderboardEntry[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px] text-center">Rank</TableHead>
          <TableHead>Intern</TableHead>
          <TableHead className="text-right">Amount Raised</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((entry) => (
          <TableRow key={entry.rank} className={entry.name === "Alex Doe" ? "bg-primary/10" : ""}>
            <TableCell className="font-bold text-lg text-center">
              <div className="flex items-center justify-center">
                {entry.rank === 1 && <Trophy className="h-5 w-5 text-yellow-500 mr-2" />}
                {entry.rank === 2 && <Trophy className="h-5 w-5 text-gray-400 mr-2" />}
                {entry.rank === 3 && <Trophy className="h-5 w-5 text-yellow-700 mr-2" />}
                {entry.rank}
              </div>
            </TableCell>
            <TableCell className="font-medium">{entry.name}</TableCell>
            <TableCell className="text-right font-semibold">
              ₹{entry.amount.toLocaleString("en-IN")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function LeaderboardPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Leaderboard</CardTitle>
        <CardDescription>
          See how you stack up against other interns.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="allTime">All-Time</TabsTrigger>
          </TabsList>
          <TabsContent value="daily">
            <LeaderboardTable data={leaderboard.daily} />
          </TabsContent>
          <TabsContent value="weekly">
            <LeaderboardTable data={leaderboard.weekly} />
          </TabsContent>
          <TabsContent value="allTime">
            <LeaderboardTable data={leaderboard.allTime} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
