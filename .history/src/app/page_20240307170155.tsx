"use client"
import './globals.css'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStatsByUser } from "@/data/userStats";
import { getConnectedCall } from "@/data/connection";
import { useToast } from "@/components/ui/use-toast";
import { atom, useRecoilState } from 'recoil';
import { Skeleton } from "@/components/ui/skeleton";

  const userData = atom({
    key: 'userData', // unique ID (with respect to other atoms/selectors)
    default: [], // default initial value
  });


export default function Home() {

  const router = useRouter();
  const { toast } = useToast();
  const [data, setData] = useRecoilState(userData);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    if(data.length > 0) return;
    getStatsByUser().then((res) => {
      setLoading(false)
      setData(res?.data.message)
    }).catch(() => {
      toast({
        title: 'Error',
        description: 'There was an error fetching the user stats',
      })
    }
    )
  },[toast, setData, data])
  
  
  useEffect(() => {
    if (!getConnectedCall()) {
     router.push('/login')
    }
  }, [router])
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 px-4">
      <ComponentSelector
        FalseElement={<Skeleton className="" />}
        TrueElement={<DataTable columns={columns} data={data}/>}
        validator={() => !loading}
      />
    </main>
  );
}




interface ComponentSelectorProps {
  TrueElement: React.ReactNode;
  FalseElement: React.ReactNode;
  validator: () => boolean;
}

export function ComponentSelector({ TrueElement, FalseElement, validator }: ComponentSelectorProps) {
  return validator() ? TrueElement : FalseElement;
}






import { ColumnDef, SortingState } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Stats = {
  _id: string;
  nom: string;
  frag: number;
  clef: number;
  etoile_1: string;
  etoile_2: string;
  etoile_3: string;
  etoile_4: string;
  souhait_1: string;
  souhait_2: string;
  souhait_3: string;
  souhait_4: string;
  souhait_5: string;
  souhait_6: string;
  obtenu: 'oui' | 'non';
  userId: string;
};

export const columns: ColumnDef<Stats>[] = [
  {
    accessorKey: "nom",
    header: "Nom",
  },
  {
    accessorKey: "frag",
    header: "Frag",
  },
  {
    accessorKey: "clef",
    header: "Clef",
  },
  {
    accessorKey: "etoile_1",
    header: "Etoile 1",
  },
  {
    accessorKey: "etoile_2",
    header: "Etoile 2",
  },
  {
    accessorKey: "etoile_3",
    header: "Etoile 3",
  },
  {
    accessorKey: "etoile_4",
    header: "Etoile 4",
  },
  {
    accessorKey: "souhait_1",
    header: "Souhait 1",
  },
  {
    accessorKey: "souhait_2",
    header: "Souhait 2",
  },
  {
    accessorKey: "souhait_3",
    header: "Souhait 3",
  },
  {
    accessorKey: "souhait_4",
    header: "Souhait 4",
  },
  {
    accessorKey: "souhait_5",
    header: "Souhait 5",
  },
  {
    accessorKey: "souhait_6",
    header: "Souhait 6",
  },
  {
    accessorKey: "obtenu",
    header: "Obtenu",
  },
  {
    accessorKey: "userId",
    header: "Joueur",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment._id)}
            >
              Copy line id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
];



import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import * as React from "react"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  return (
    <div>
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      </div>
  )
}

