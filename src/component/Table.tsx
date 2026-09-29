"use client";

import { ReactNode } from "react";

export interface TableColumn<T> {
    header: string;
    accessor: keyof T | ((row: T) => ReactNode);
    className?: string;
}

interface TableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    keyExtractor: (row: T, index: number) => string | number;
    loading?: boolean;
    emptyMessage?: string;
}

export default function Table<T>({
    columns,
    data,
    keyExtractor,
    loading = false,
    emptyMessage = "No records found",
}: TableProps<T>) {
    const getCellValue = (row: T, column: TableColumn<T>): ReactNode => {
        if (typeof column.accessor === "function") {
            return column.accessor(row);
        }
        return row[column.accessor] as ReactNode;
    };
    console.log(data, "PPPMMMM");
    return (
        <div className="w-full overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <table className="w-full min-w-[640px] text-left text-sm text-slate-300">
                <thead className="bg-slate-900/70 text-xs uppercase tracking-wider text-slate-400">
                    <tr>
                        {columns.map((column, idx) => (
                            <th
                                key={idx}
                                className={`px-6 py-4 font-semibold ${column.className ?? ""}`}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                    {loading ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-6 py-10 text-center text-slate-500"
                            >
                                Loading...
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-6 py-10 text-center text-slate-500"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((row, index) => (
                            <tr
                                key={keyExtractor(row, index)}
                                className="transition hover:bg-white/5"
                            >
                                {columns.map((column, idx) => (
                                    <td
                                        key={idx}
                                        className={`px-6 py-4 ${column.className ?? ""}`}
                                    >
                                        {getCellValue(row, column)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
