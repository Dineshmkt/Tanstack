import React, { useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import type { User } from '../api/userApi';
import DeleteButton from './DeleteButton';

const API_URL = 'https://jsonplaceholder.typicode.com/comments';

const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch data');
  const data: User[] = await res.json();
  return data.slice(0, 20);
};

type UserTableProps = {
  search: string;
};

const UserTable: React.FC<UserTableProps> = ({ search }) => {
  console.log("search",search)
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const handleDelete = (id: number) => {
    const updated = data.filter((u) => u.id !== id);
    queryClient.setQueryData(['users'], updated);
  };

  const filteredData = useMemo(() => {
    return data.filter((user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const columns = useMemo<ColumnDef<User>[]>(() => [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className='flex gap-3'>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded" onClick={() => navigate(`/edit/${row.original.id}`)}>Edit</button>
          <DeleteButton onDelete={() => handleDelete(row.original.id)} />
        </div>
      ),
    },
  ], [navigate]);

  const table = useReactTable({
    data: filteredData,
    columns,
    pageCount: Math.ceil(filteredData.length / pagination.pageSize),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <p>Loading...</p>;

 return (
  <div className="p-4">
    <table className="min-w-full border border-gray-600 bg-gray-800 text-white rounded-md overflow-hidden">
      <thead className="bg-gray-700">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="p-3 border border-gray-600 text-left">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-700">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-3 border border-gray-600">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

    <div className="flex items-center justify-between mt-4">
      <div className="flex gap-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded text-white"
        >
          Previous
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded text-white"
        >
          Next
        </button>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-white">Page Size:</label>
        <select
          value={pagination.pageSize}
          onChange={(e) =>
            setPagination((prev) => ({
              ...prev,
              pageSize: Number(e.target.value),
            }))
          }
          className="px-2 py-1 bg-gray-700 text-white border border-gray-500 rounded"
        >
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>
);
}

export default React.memo(UserTable); 
