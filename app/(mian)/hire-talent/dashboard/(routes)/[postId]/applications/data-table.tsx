import React from 'react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  CellContext, // Import CellContext for typing
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useGetApplicationofPost } from '@/features/application/api/getapplicationsofPost';
import { SparkleButton } from '@/components/ui/magicalButton';
 

interface ApplicationData {
  id: string;
  studentId: string;
  postId: string;
  status: string;
  createdAt: Date;
  resumeUrl: string;
  studentName: string;
  profileUrl: string;
  selected: boolean;
  matchPercentage: number | null;
}

interface DataTableProps {
  columns: ColumnDef<ApplicationData, any>[];
  data: ApplicationData[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [tableData, setTableData] = React.useState<ApplicationData[]>(data);
  const [columns_, setColumns_] = React.useState<ColumnDef<ApplicationData, any>[]>(columns);
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const param = useParams<{ postId: string }>();
  const { data: applications, error, isLoading } = useGetApplicationofPost(param?.postId || '');

  const table = useReactTable({
    data: tableData,
    columns: columns_,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const runNLPModel = async () => {
    setLoading(true);
    try {
      if (!param?.postId) {
        toast({
          title: "Invalid postId",
          variant: "destructive",
        });
        return;
      }
  
      // Call API to update database (no data return expected)
      const response = await axios.post(`/api/proxy/update-matchpercent/${param?.postId}`);
  
      if (response.status === 200) {
        const updatedData = applications || [];
  
        if (Array.isArray(updatedData)) {
          const sortedData = updatedData
            .filter(item => typeof item.matchPercentage === 'number')
            .sort((a: ApplicationData, b: ApplicationData) => (b.matchPercentage || 0) - (a.matchPercentage || 0));
  
          setTableData(sortedData);
  
          // Check if 'AI Match' column already exists
          const columnExists = columns_.some(column => column.id === 'matchPercentage');
  
          if (!columnExists) {
            setColumns_(prevColumns => {
              // Find the index of the 'Actions' column
              const actionsIndex = prevColumns.findIndex(column => column.id === 'actions');
  
              // Create a new column array with 'AI Match' before 'Actions'
              const newColumns = [
                ...prevColumns.slice(0, actionsIndex),
                {
                  id: 'matchPercentage',
                  accessorFn: (row: ApplicationData) => row.matchPercentage, // Explicitly type `row` as `ApplicationData`
                  header: 'AI Match',
                  cell: (info: CellContext<ApplicationData, number | null>) =>
                    info.getValue() !== null ? `${info.getValue()}%` : 'N/A',
                },
                ...prevColumns.slice(actionsIndex)
              ];
  
              return newColumns;
            });
  
            setSorting([{ id: 'matchPercentage', desc: true }]); // Set sorting  
            toast({
              title: "Filter applied",
              variant: "success",
            });
          } else {
            toast({
              title: "AI Match column already added",
              variant: "success",
            });
          }
        } else {
          toast({
            title: "Unexpected data format",
            description: "The data received is not an array.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Failed to update database",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to run NLP model",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
    
  

  return (
    <div>
      <div className="flex items-center flex-wrap  gap-2 py-4 px-0">
     
        <Input
          placeholder="Filter by status"
          value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("status")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

 
        <SparkleButton
        onClick={runNLPModel}
        loading={loading}
      >
        {loading ? 'Processing...' : 'Run Magic'}
      </SparkleButton>
      
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
              .map((column) => (
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
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns_.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
