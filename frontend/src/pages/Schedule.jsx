import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { fetchJSON } from "@/lib/api"
import "./Pages.css"

function MeetCardSkeleton() {
  return (
    <Card className="border-[var(--gray-200)] shadow-sm">
      <CardHeader className="space-y-2">
        <div className="h-5 w-4/5 animate-pulse rounded-md bg-[var(--gray-200)]" />
        <div className="h-4 w-1/3 animate-pulse rounded-md bg-[var(--gray-200)]" />
      </CardHeader>
      <CardContent>
        <div className="h-4 w-full animate-pulse rounded-md bg-[var(--gray-200)]" />
      </CardContent>
    </Card>
  )
}

function formatMeetDate(isoDate) {
  if (!isoDate) return ""
  const d = new Date(isoDate + "T12:00:00")
  if (Number.isNaN(d.getTime())) return isoDate
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function Schedule() {
  const {
    data: meets,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["meets"],
    queryFn: () => fetchJSON("/api/meets"),
  })

  const sortedMeets = useMemo(() => {
    if (!meets?.length) return []
    return [...meets].sort(
      (a, b) => new Date(a.meet_date) - new Date(b.meet_date),
    )
  }, [meets])

  return (
    <div className="page">
      <div className="page-header">
        <h1>Meet Schedule</h1>
        <p>Cross country meets and locations</p>
      </div>

      <section className="section">
        <div className="container">
          {isPending && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <MeetCardSkeleton key={i} />
              ))}
            </div>
          )}

          {isError && (
            <div className="mx-auto max-w-md rounded-xl border border-[var(--gray-200)] bg-[var(--white)] p-8 text-center shadow-sm">
              <p className="mb-2 font-medium text-[var(--primary-green)]">
                Couldn&apos;t load the schedule
              </p>
              <p className="mb-6 text-sm text-[var(--gray-600)]">
                {error?.message || "Something went wrong. Please try again."}
              </p>
              <Button type="button" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          )}

          {!isPending && !isError && sortedMeets && (
            <>
              {sortedMeets.length === 0 ? (
                <p className="text-center text-[var(--gray-600)]">
                  No meets scheduled yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {sortedMeets.map((m) => (
                    <Card
                      key={m.meet_id}
                      className="border-[var(--gray-200)] shadow-sm transition-shadow hover:shadow-md"
                    >
                      <CardHeader>
                        <CardTitle className="text-[var(--gray-800)]">
                          {m.name}
                        </CardTitle>
                        <CardDescription className="font-medium text-[var(--primary-green)]">
                          {formatMeetDate(m.meet_date)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-[var(--gray-600)]">
                          {m.location}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              <p className="schedule-note mt-8">
                * Schedule subject to change. Check back for updates.
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Schedule
