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

function formatGrade(grade) {
  const n = Number(grade)
  const map = { 9: "9th", 10: "10th", 11: "11th", 12: "12th" }
  return map[n] ? `${map[n]} Grade` : `Grade ${grade}`
}

function AthleteCardSkeleton() {
  return (
    <Card className="border-[var(--gray-200)] shadow-sm">
      <CardHeader className="space-y-2">
        <div className="h-5 w-3/4 animate-pulse rounded-md bg-[var(--gray-200)]" />
        <div className="h-4 w-1/3 animate-pulse rounded-md bg-[var(--gray-200)]" />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="h-4 w-1/2 animate-pulse rounded-md bg-[var(--gray-200)]" />
      </CardContent>
    </Card>
  )
}

function Roster() {
  const {
    data: athletes,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["athletes"],
    queryFn: () => fetchJSON("/api/athletes"),
  })

  return (
    <div className="page">
      <div className="page-header">
        <h1>Team Roster</h1>
        <p>Meet the Jones County Cross Country team</p>
      </div>

      <section className="section">
        <div className="container">
          {isPending && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <AthleteCardSkeleton key={i} />
              ))}
            </div>
          )}

          {isError && (
            <div className="mx-auto max-w-md rounded-xl border border-[var(--gray-200)] bg-[var(--white)] p-8 text-center shadow-sm">
              <p className="mb-2 font-medium text-[var(--primary-green)]">
                Couldn&apos;t load the roster
              </p>
              <p className="mb-6 text-sm text-[var(--gray-600)]">
                {error?.message || "Something went wrong. Please try again."}
              </p>
              <Button type="button" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          )}

          {!isPending && !isError && athletes && (
            <>
              {athletes.length === 0 ? (
                <p className="text-center text-[var(--gray-600)]">
                  No athletes listed yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {athletes.map((a) => (
                    <Card
                      key={a.athlete_id}
                      className="border-[var(--gray-200)] shadow-sm transition-shadow hover:shadow-md"
                    >
                      <CardHeader>
                        <CardTitle className="text-[var(--gray-800)]">
                          {a.name}
                        </CardTitle>
                        <CardDescription>
                          {formatGrade(a.grade)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-[var(--gray-600)]">
                          <span className="font-medium text-[var(--primary-green)]">
                            5K PR:{" "}
                          </span>
                          {a.personal_record_time}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Roster
