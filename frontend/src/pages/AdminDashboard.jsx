import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { apiJSON, fetchJSON } from "@/lib/api"
import { clearAdminToken } from "@/lib/auth"

const emptyForm = {
  name: "",
  grade: "9",
  personal_record_time: "",
}

function formatGrade(grade) {
  const n = Number(grade)
  const map = { 9: "9th", 10: "10th", 11: "11th", 12: "12th" }
  return map[n] ? `${map[n]} Grade` : `Grade ${grade}`
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [formOpen, setFormOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [pendingDelete, setPendingDelete] = useState(null)

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

  const saveMutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      if (id != null) {
        return apiJSON(`/api/athletes/${id}`, { method: "PUT", body: payload })
      }
      return apiJSON("/api/athletes", { method: "POST", body: payload })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["athletes"] })
      setFormOpen(false)
      setEditId(null)
      setForm(emptyForm)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => apiJSON(`/api/athletes/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["athletes"] })
      setDeleteOpen(false)
      setPendingDelete(null)
    },
  })

  function openAdd() {
    setEditId(null)
    setForm(emptyForm)
    setFormOpen(true)
  }

  function openEdit(a) {
    setEditId(a.athlete_id)
    setForm({
      name: a.name,
      grade: String(a.grade),
      personal_record_time: a.personal_record_time,
    })
    setFormOpen(true)
  }

  function openDelete(a) {
    setPendingDelete({ id: a.athlete_id, name: a.name })
    setDeleteOpen(true)
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    const payload = {
      name: form.name.trim(),
      grade: Number(form.grade),
      personal_record_time: form.personal_record_time.trim(),
    }
    saveMutation.mutate({ id: editId, payload })
  }

  function handleLogout() {
    clearAdminToken()
    navigate("/login", { replace: true })
  }

  return (
    <div className="min-h-screen bg-[var(--gray-100)]">
      <header className="border-b border-[var(--gray-200)] bg-[var(--white)] px-4 py-4 shadow-sm">
        <div className="container flex max-w-6xl items-center justify-between">
          <h1 className="font-heading text-xl font-semibold text-[var(--primary-green)] sm:text-2xl">
            Admin Dashboard
          </h1>
          <Button type="button" variant="outline" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </header>

      <main className="container max-w-6xl py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[var(--gray-600)]">
            Manage team roster. Changes appear on the public site after refresh.
          </p>
          <Button type="button" onClick={openAdd}>
            Add Athlete
          </Button>
        </div>

        {isPending && (
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-xl border border-[var(--gray-200)] bg-[var(--white)] py-16">
            <Loader2
              className="size-10 animate-spin text-[var(--primary-green)]"
              aria-hidden
            />
            <p className="text-sm text-[var(--gray-600)]">Loading athletes…</p>
          </div>
        )}

        {isError && (
          <div className="mx-auto max-w-md rounded-xl border border-[var(--gray-200)] bg-[var(--white)] p-8 text-center shadow-sm">
            <p className="mb-2 font-medium text-[var(--primary-green)]">
              Couldn&apos;t load athletes
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
          <div className="rounded-xl border border-[var(--gray-200)] bg-[var(--white)] shadow-sm">
            {athletes.length === 0 ? (
              <p className="p-8 text-center text-[var(--gray-600)]">No athletes yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-[var(--primary-green)]">Name</TableHead>
                    <TableHead className="text-[var(--primary-green)]">Grade</TableHead>
                    <TableHead className="text-[var(--primary-green)]">
                      Personal record
                    </TableHead>
                    <TableHead className="text-right text-[var(--primary-green)]">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {athletes.map((a) => (
                    <TableRow key={a.athlete_id}>
                      <TableCell className="font-medium text-[var(--gray-800)]">
                        {a.name}
                      </TableCell>
                      <TableCell>{formatGrade(a.grade)}</TableCell>
                      <TableCell className="text-[var(--primary-green)]">
                        {a.personal_record_time}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => openEdit(a)}
                          >
                            Edit
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => openDelete(a)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        )}
      </main>

      <Dialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open)
          if (!open) {
            setEditId(null)
            setForm(emptyForm)
            saveMutation.reset()
          }
        }}
      >
        <DialogContent className="sm:max-w-md" showCloseButton>
          <form onSubmit={handleFormSubmit}>
            <DialogHeader>
              <DialogTitle>{editId != null ? "Edit athlete" : "Add athlete"}</DialogTitle>
              <DialogDescription>
                {editId != null
                  ? "Update this athlete and save."
                  : "Enter details for the new athlete."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="athlete-name">Name</Label>
                <Input
                  id="athlete-name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                  disabled={saveMutation.isPending}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="athlete-grade">Grade</Label>
                <Select
                  value={form.grade}
                  onValueChange={(v) => setForm((f) => ({ ...f, grade: v }))}
                  disabled={saveMutation.isPending}
                >
                  <SelectTrigger id="athlete-grade" className="w-full">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9">9</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="11">11</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="athlete-pr">Personal record</Label>
                <Input
                  id="athlete-pr"
                  value={form.personal_record_time}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, personal_record_time: e.target.value }))
                  }
                  placeholder="e.g. 17:42"
                  required
                  disabled={saveMutation.isPending}
                />
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormOpen(false)}
                disabled={saveMutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving…" : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open)
          if (!open && !deleteMutation.isPending) {
            setPendingDelete(null)
          }
        }}
      >
        <DialogContent className="sm:max-w-md" showCloseButton>
          <DialogHeader>
            <DialogTitle>Delete athlete?</DialogTitle>
            <DialogDescription>
              {pendingDelete
                ? `This will permanently remove ${pendingDelete.name} from the roster.`
                : ""}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={deleteMutation.isPending || !pendingDelete}
              onClick={() => {
                if (pendingDelete) {
                  deleteMutation.mutate(pendingDelete.id)
                }
              }}
            >
              {deleteMutation.isPending ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
