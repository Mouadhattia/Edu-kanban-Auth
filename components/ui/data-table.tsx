"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface DataTableProps<T> {
  data: T[]
  columns: {
    id: string
    header: string | React.ReactNode
    cell: (item: T) => React.ReactNode
    sortable?: boolean
    searchable?: boolean
  }[]
  pagination?: boolean
  pageSize?: number
  searchable?: boolean
  sortable?: boolean
  loading?: boolean
  emptyState?: React.ReactNode
  className?: string
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  pagination = true,
  pageSize = 10,
  searchable = true,
  sortable = true,
  loading = false,
  emptyState,
  className,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState<{ column: string; direction: "asc" | "desc" } | null>(null)
  const [filteredData, setFilteredData] = useState<T[]>(data)
  const [paginatedData, setPaginatedData] = useState<T[]>([])

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / pageSize)

  // Update filtered data when data, search, or sort changes
  useEffect(() => {
    let result = [...data]

    // Apply search filter
    if (search) {
      const searchableColumns = columns.filter((col) => col.searchable !== false).map((col) => col.id)

      result = result.filter((item) => {
        return searchableColumns.some((colId) => {
          const value = (item as any)[colId]
          return value && String(value).toLowerCase().includes(search.toLowerCase())
        })
      })
    }

    // Apply sorting
    if (sort) {
      result.sort((a, b) => {
        const aValue = (a as any)[sort.column]
        const bValue = (b as any)[sort.column]

        if (aValue === bValue) return 0

        // Handle undefined or null values
        if (aValue === undefined || aValue === null) return sort.direction === "asc" ? -1 : 1
        if (bValue === undefined || bValue === null) return sort.direction === "asc" ? 1 : -1

        // Sort strings
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sort.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        }

        // Sort numbers and other types
        return sort.direction === "asc" ? (aValue < bValue ? -1 : 1) : aValue < bValue ? 1 : -1
      })
    }

    setFilteredData(result)
    setPage(1) // Reset to first page when filters change
  }, [data, search, sort])

  // Update paginated data when filtered data or page changes
  useEffect(() => {
    if (pagination) {
      const start = (page - 1) * pageSize
      const end = start + pageSize
      setPaginatedData(filteredData.slice(start, end))
    } else {
      setPaginatedData(filteredData)
    }
  }, [filteredData, page, pageSize, pagination])

  // Handle sort toggle
  const handleSort = (column: string) => {
    if (!sortable) return

    if (sort?.column === column) {
      if (sort.direction === "asc") {
        setSort({ column, direction: "desc" })
      } else {
        setSort(null)
      }
    } else {
      setSort({ column, direction: "asc" })
    }
  }

  // Pagination controls
  const goToPage = (newPage: number) => {
    setPage(Math.max(1, Math.min(newPage, totalPages)))
  }

  // Render loading state
  if (loading) {
    return (
      <div className={cn("space-y-2", className)}>
        {searchable && (
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-10 w-[250px]" />
          </div>
        )}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.id}>
                    <Skeleton className="h-5 w-full" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: pageSize }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {pagination && (
          <div className="flex items-center justify-between py-4">
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[250px]" />
          </div>
        )}
      </div>
    )
  }

  // Render empty state
  if (data.length === 0) {
    return (
      <div className={cn("space-y-2", className)}>
        {searchable && (
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-[250px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setSearch("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}
        <div className="rounded-md border p-8 flex flex-col items-center justify-center text-center">
          {emptyState || (
            <div className="py-6">
              <p className="text-muted-foreground">No data available</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-2", className)}>
      {searchable && (
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-[250px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setSearch("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredData.length} {filteredData.length === 1 ? "item" : "items"}
          </div>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id}>
                  {column.sortable !== false && sortable ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="-ml-3 h-8 data-[state=open]:bg-accent"
                      onClick={() => handleSort(column.id)}
                    >
                      {column.header}
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{column.cell(item)}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-muted-foreground">
            Showing {Math.min(filteredData.length, (page - 1) * pageSize + 1)}-
            {Math.min(page * pageSize, filteredData.length)} of {filteredData.length}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={() => goToPage(1)} disabled={page === 1}>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => goToPage(page - 1)} disabled={page === 1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Select value={page.toString()} onValueChange={(value) => goToPage(Number.parseInt(value))}>
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder={page} />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: totalPages }, (_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={() => goToPage(page + 1)} disabled={page === totalPages}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => goToPage(totalPages)} disabled={page === totalPages}>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
