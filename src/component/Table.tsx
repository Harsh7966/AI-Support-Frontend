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
    /** Optional: renders an "Actions" column with per-row buttons */
    actions?: (row: T, index: number) => ReactNode;
}

export default function Table<T>({
    columns,
    data,
    keyExtractor,
    loading = false,
    emptyMessage = "No records found",
    actions,
}: TableProps<T>) {
    const totalColumns = columns.length + (actions ? 1 : 0);
    const getCellValue = (row: T, column: TableColumn<T>): ReactNode => {
        const value =
            typeof column.accessor === "function"
                ? column.accessor(row)
                : (row[column.accessor] as ReactNode);

        // Show "null" for empty values (null, undefined, empty/blank string)
        if (
            value === null ||
            value === undefined ||
            (typeof value === "string" && value.trim() === "")
        ) {
            return "-";
        }

        // Booleans render nothing in React, so show them as text
        if (typeof value === "boolean") {
            return String(value);
        }

        return value;
    };

    return (
        <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[640px] text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                        {columns.map((column, idx) => (
                            <th
                                key={idx}
                                className={`px-6 py-4 font-semibold ${column.className ?? ""}`}
                            >
                                {column.header}
                            </th>
                        ))}
                        {actions && (
                            <th className="px-6 py-4 font-semibold">Actions</th>
                        )}
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                    {loading ? (
                        <tr>
                            <td
                                colSpan={totalColumns}
                                className="px-6 py-10 text-center text-slate-500"
                            >
                                Loading...
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={totalColumns}
                                className="px-6 py-10 text-center text-slate-500"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((row, index) => (
                            <tr
                                key={keyExtractor(row, index)}
                                className="transition hover:bg-slate-50"
                            >
                                {columns.map((column, idx) => (
                                    <td
                                        key={idx}
                                        className={`px-6 py-4 ${column.className ?? ""}`}
                                    >
                                        {getCellValue(row, column)}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="px-6 py-4">
                                        {actions(row, index)}
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
