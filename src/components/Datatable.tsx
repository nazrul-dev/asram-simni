
import { Search } from 'lucide-react';
import React, { useEffect } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    Chip,
    Pagination,
    Spinner
} from "@nextui-org/react";

export default function DataTable({ triggerChangePage, triggerSearch, renderCell, ...args } : any) {
    const { columns, loading, rightTop, data, totalPage, totalRows, page: currentPage, searchingKey } = args
    const [filterValue, setFilterValue] = React.useState("");
    const [page, setPage] = React.useState(currentPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const hasSearchFilter = Boolean(filterValue);

    useEffect(() => {
        console.log(filterValue)
    }, [filterValue])

    const pages = totalPage;


    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return data.slice(start, end);
    }, [page, rowsPerPage]);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const handlePage = (value:any) => {
        triggerChangePage(value)
    }


    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value)
            triggerSearch(value);
            setPage(1);
        } else {
            setFilterValue("");
            triggerSearch('');
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
        triggerSearch('');
    }, [])

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name..."
                        startContent={<Search />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">

                        {rightTop}

                    </div>
                </div>

            </div>
        );
    }, [
        filterValue,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Chip>{`${items.length} of ${totalRows} `}</Chip>
                <div className='flex'>
                    <div>
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={pages}
                            onChange={(page) => handlePage(page)}
                        />
                    </div>
                    <div className="lg:hidden justify-end gap-2">
                        <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                            Previous
                        </Button>
                        <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        );
    }, [items.length, page, pages, hasSearchFilter]);

    const classNames = React.useMemo(
        () => ({

            th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
            td: [
                // changing the rows border radius
                // first
                "group-data-[first=true]:first:before:rounded-none",
                "group-data-[first=true]:last:before:rounded-none",
                // middle
                "group-data-[middle=true]:before:rounded-none",
                // last
                "group-data-[last=true]:first:before:rounded-none",
                "group-data-[last=true]:last:before:rounded-none",
            ],
        }),
        [],
    );

    return (
        <Table classNames={classNames} isStriped
            topContent={topContent}

            bottomContent={bottomContent}
            aria-label="Example table with custom renderCell">
            <TableHeader columns={columns}>
                {(column: any) => (
                    <TableColumn key={column.uid}   >
                        <div className={`${column.uid === "actions" ? "hidden" : ""}`} >
                            {column.name}
                        </div>
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody isLoading={loading}
                loadingContent={<Spinner label="Loading..." />} items={items}>
                {(item:any) => (
                    <TableRow key={item?.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
