"use client"
import './globals.css'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStatsByUser } from "@/data/userStats";
import { getConnectedCall } from "@/data/connection";
import { useToast } from "@/components/ui/use-toast";
import { atom, useRecoilState } from 'recoil';
import { Skeleton } from "@/components/ui/skeleton";

  const userData = atom<Stats[]>({
    key: 'userData', // unique ID (with respect to other atoms/selectors)
    default: [] as Stats[], // default initial value
  });

const isConnected = atom({
  key: 'isConnected', // unique ID (with respect to other atoms/selectors)
  default: false, // default initial value
});


export default function Home() {

  const router = useRouter();
  const { toast } = useToast();
  const [data, setData] = useRecoilState(userData);
  const [loading, setLoading] = useState(true)
  const [connected, setConnected] = useRecoilState(isConnected);
  

  useEffect(() => {
    getConnectedCall().then((res) => {
      setConnected(true)
    }).catch(() => {
      setConnected(false)
      router.push('/login')
    })
  },[toast, setConnected, router])


  useEffect(() => {
    if (data.length  > 0  || !connected) return;
      getStatsByUser().then((res) => {
        setLoading(false)
        setData(res?.data.message.map((d : Stats ) => d))
      }).catch(() => {
        toast({
          title: 'Error',
          description: 'There was an error fetching the user stats',
        })
      }
      )
  },[toast, setData, data, connected])
  
  

  

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


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"




import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, getFilteredRowModel, getSortedRowModel } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Stats = {
  _id: string;
  nom: string;
  frag: number;
  clef: number;
  etoile_1: boolean;
  etoile_2: boolean;
  etoile_3: boolean;
  etoile_4: boolean;
  souhait_1: boolean;
  souhait_2: boolean;
  souhait_3: boolean;
  souhait_4: boolean;
  souhait_5: boolean;
  souhait_6: boolean;
  obtenu: boolean;
  userId: string;
};

export const columns: ColumnDef<Stats>[] = navigator.userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
) ? 
  [
    {
    accessorKey: "nom",
    header: ({ column }) => {
      return (
        <Button
          className='p-0'
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    },
  {
    accessorKey: "obtenu",
    header: "Obtenu",
  },
  {
    accessorKey: "userId",
     header: ({ column }) => {
      return (
        <Button
          className='p-0'
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Joueur
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const stats = row.original
 
      return (
        <Dialog>
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
              onClick={() => navigator.clipboard.writeText(stats._id)}
            >
              Copy line id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <DialogTrigger className='text-start'>Edit</DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
          </DropdownMenu>
          <DialogStats data={stats} />
        </Dialog>
      )
    },
  }
  ]
    : [
  {
    accessorKey: "nom",
    header: ({ column }) => {
      return (
        <Button
          className='p-0'
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "frag",
    header: ({ column }) => {
      return (
        <Button
          className='p-0'
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Frag
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "clef",
     header: ({ column }) => {
      return (
        <Button
          className='p-0'
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Clef
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
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
     header: ({ column }) => {
      return (
        <Button
          className='p-0'
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Joueur
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const stats = row.original
 
      return (
        <Dialog>
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
              onClick={() => navigator.clipboard.writeText(stats._id)}
            >
              Copy line id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <DialogTrigger className='w-full text-start'>Edit</DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
          </DropdownMenu>
              <DialogStats data={stats}/>
          </Dialog>
      )
    },
  }
];


import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
 
const formSchema = z.object({
  nom: z.string(),
  frag: z.number(),
  clef: z.number(),
  etoile_1: z.boolean(),
  etoile_2: z.boolean(),
  etoile_3: z.boolean(),
  etoile_4: z.boolean(),
  souhait_1: z.boolean(),
  souhait_2: z.boolean(),
  souhait_3: z.boolean(),
  souhait_4: z.boolean(),
  souhait_5: z.boolean(),
  souhait_6: z.boolean(),
  obtenu: z.boolean(),
  userId: z.string(),

})


export interface PropsDialogStats {
  data: Stats
}


export function DialogStats({ data }: PropsDialogStats) {


    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        nom: data.nom,
        frag: data.frag,
        clef: data.clef,
        etoile_1: data.etoile_1,
        etoile_2: data.etoile_2,
        etoile_3: data.etoile_3,
        etoile_4: data.etoile_4,
        souhait_1: data.souhait_1,
        souhait_2: data.souhait_2,
        souhait_3: data.souhait_3,
        souhait_4: data.souhait_4,
        souhait_5: data.souhait_5,
        souhait_6: data.souhait_6,
        obtenu: data.obtenu,
      },
    })
  
  type StatsWithoutId = Omit<Stats, '_id'>;
  
  const formItems: {
    name: keyof StatsWithoutId;
    label: string
    type: string
    disabled : boolean
    description: string
    }[] = [
      {
        name: "nom",
        label: "Nom du bosse",
        disabled: true,
        type: "text",
        description : 'this is the name of the boss',
      },
      {
        name: "frag",
        label: "Frag",
        disabled: false,
        type: "number",
        description : 'this is the number of frag',
      },
      {
        name: "clef",
        label: "Clef",
        type: "number",
        disabled: false,
        description : 'this is the number of clef',
      },
      {
        name: "etoile_1",
        label: "Etoile 1",
        type: "checkbox",
        disabled: false,
        description : 'this is the first etoile',
      },
      {
        name: "etoile_2",
        label: "Etoile 2",
        type: "checkbox",
        disabled: false,
        description : 'this is the second etoile',
      },
      {
        name: "etoile_3",
        label: "Etoile 3",
        type: "checkbox",
        disabled: false,
        description : 'this is the third etoile',
      },
      {
        name: "etoile_4",
        label: "Etoile 4",
        type: "checkbox",
        disabled: false,
        description : 'this is the fourth etoile',
      },
      {
        name: "souhait_1",
        label: "Souhait 1",
        type: "checkbox",
        disabled: false,
        description : 'this is the first souhait',
      },
      {
        name: "souhait_2",
        label: "Souhait 2",
        type: "checkbox",
        disabled: false,
        description : 'this is the second souhait',
      },
      {
        name: "souhait_3",
        label: "Souhait 3",
        type: "checkbox",
        disabled: false,
        description : 'this is the third souhait',
      },
      {
        name: "souhait_4",
        label: "Souhait 4",
        type: "checkbox",
        disabled: false,
        description : 'this is the fourth souhait',
      },
      {
        name: "souhait_5",
        label: "Souhait 5",
        type: "checkbox",
        disabled: false,
        description : 'this is the fifth souhait',
      },
      {
        name: "souhait_6",
        label: "Souhait 6",
        type: "checkbox",
        disabled: false,
        description : 'this is the sixth souhait',
      },
      {
        name: "obtenu",
        label: "Obtenu",
        type: "checkbox",
        disabled: false,
        description : 'This field represents what has been obtained',
      }

    ]
  
    function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
   }

  return (           
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{data.nom}</DialogTitle>
        <DialogDescription>
              <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 h-[20rem] overflow-y-auto">
              {formItems.map((item) => 
                <FormField
                  key={item.name}
                  control={form.control}
                  name={item.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.label}</FormLabel>
                      <FormControl>
                        <Input className='flex items-start w-auto' type={item.type} disabled={item.disabled}  {...field} />
                      </FormControl>
                      <FormDescription>
                          {item.description}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />)}
        <Button type="submit">Submit</Button>
      </form>
    </Form> 
        </DialogDescription>
      </DialogHeader>

    </DialogContent>
  )
}



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
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

import * as React from "react"

import {ArrowUpDown} from "lucide-react"
import { Input } from '@/components/ui/input';


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})



  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between  py-4">
        <div className="flex items-center gap-2 py-4">
          <Input
            placeholder="Filter names"
            value={(table.getColumn("nom")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("nom")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
                  
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}

                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
        <div  className='flex items-center space-x-2'>
        <Button
          size="sm"
          onClick={() => {}}
        >New</Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table?.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table?.getCanNextPage()}
        >
          Next
          </Button>
        </div>
      </div>
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
              <TableCell colSpan={columns?.length} className="h-24 text-center">
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

