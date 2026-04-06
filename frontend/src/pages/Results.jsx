import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { fetchJSON } from "@/lib/api"
import "./Pages.css"

function Results() {
  const {
    data: results,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["results"],
    queryFn: () => fetchJSON("/api/results"),
  })

  return (
    <div className="page">
      <div className="page-header">
        <h1>Race Results</h1>
        <p>Individual finishes by meet</p>
      </div>

      <section className="section">
        <div className="container">
          {isPending && (
            <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 py-16">
              <Loader2
                className="size-10 animate-spin text-[var(--primary-green)]"
                aria-hidden
              />
              <p className="text-sm text-[var(--gray-600)]">Loading results…</p>
            </div>
          )}

          {isError && (
            <div className="mx-auto max-w-md rounded-xl border border-[var(--gray-200)] bg-[var(--white)] p-8 text-center shadow-sm">
              <p className="mb-2 font-medium text-[var(--primary-green)]">
                Couldn&apos;t load results
              </p>
              <p className="mb-6 text-sm text-[var(--gray-600)]">
                {error?.message || "Something went wrong. Please try again."}
              </p>
              <Button type="button" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          )}

          {!isPending && !isError && results && (
            <>
              {results.length === 0 ? (
                <p className="text-center text-[var(--gray-600)]">
                  No race results posted yet.
                </p>
              ) : (
                <div className="rounded-xl border border-[var(--gray-200)] bg-[var(--white)] shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-[var(--primary-green)]">
                          Athlete
                        </TableHead>
                        <TableHead className="text-[var(--primary-green)]">
                          Meet
                        </TableHead>
                        <TableHead className="text-[var(--primary-green)]">
                          Time
                        </TableHead>
                        <TableHead className="text-[var(--primary-green)]">
                          Place
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.map((r) => (
                        <TableRow key={r.result_id}>
                          <TableCell className="max-w-[200px] whitespace-normal font-medium text-[var(--gray-800)]">
                            {r.athlete_name}
                          </TableCell>
                          <TableCell className="max-w-[260px] whitespace-normal text-[var(--gray-600)]">
                            {r.meet_name}
                          </TableCell>
                          <TableCell className="font-medium text-[var(--primary-green)]">
                            {r.finish_time}
                          </TableCell>
                          <TableCell>{r.place}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              <div className="no-more-results">
                <p>More results will be posted as the season progresses.</p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Results
