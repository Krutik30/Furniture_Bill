import { useQuery } from "@tanstack/react-query";
import MaterialReactTable, { MRT_ColumnDef, MaterialReactTableProps } from "material-react-table";

// export type MrtCustomColumnDef<T>  = {
//     [K in keyof T]: T[K];
//   } & {
//   } & MRT_ColumnDef<T> 

// export type MrtCustomColumnDef<T = Record<string, any>>  = MRT_ColumnDef<T> & {
    
export type MrtCustomColumnDef = MRT_ColumnDef & {

};

type MrtProviderType = {
    columns: MRT_ColumnDef[],
    currentTab?: string;
    fetchFunction: Function;
    renderRowActions: MaterialReactTableProps['renderRowActions'];
}   

export const MrtProvider = ({columns, currentTab, fetchFunction, renderRowActions}: MrtProviderType) => {
    const { isLoading, data} = useQuery({

        queryKey: [currentTab],
        queryFn: async() => {
            return await fetchFunction();
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        cacheTime:  48 * 60 * 60 * 1000,
        staleTime:  10 * 60 * 1000 
      });
    return (
        <MaterialReactTable
            columns={columns}
            data={data ?? []}
            initialState={{ 
                density: 'compact',
                columnPinning: { 
                    right: ['mrt-row-actions'] 
                }
            }} 
            enableRowActions
            renderRowActions={renderRowActions}
            state={{
                isLoading:isLoading
            }}
        />
    )
}