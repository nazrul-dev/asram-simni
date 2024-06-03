import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create<any>()(
  devtools(
    (set, get) => ({
      columns: [
        { name: "TANGGAL_AKAD", uid: "tanggalAkad" },
        { name: "STTATUS PEMOHON", uid: "statusPemohon" },
        { name: "KUA PENCATATAN", uid: "kuaPencatatanId" },
        { name: "TGL DITERIMA KUA", uid: "tanggalDiterimaKua" },
        { name: "NSK L", uid: "nskl" },
        { name: "NSK P", uid: "nskp" },
        { name: "ACTIONS", uid: "actions" },
      ],
      processing: false,
      rowSelected: null,
      modals: {
        alertDelete: false,
      },
      setForm: (field: any) => {
        console.log(field);
        return set((state: any) => ({
          form: field,
        }));
      },
      setField: (field: any, value: string) => {
        console.log(field);
        return set((state: any) => ({
          form: { ...state.form, [field]: value },
        }));
      },
      handleModalsTrigger: (type: string, item?: any) =>
        set((state: any) => ({
          rowSelected: item ? item : null,
          modals: {
            ...state.modals,
            [type]: !state.modals[type],
          },
        })),
      handleRowSelected: (data: any) =>
        set((state: any) => ({
          rowSelected: data ? data : null,
        })),
      setProcessing: (boolean: boolean) =>
        set(() => ({
          processing: boolean,
        })),
    }),
    {
      name: "document-storage",
    }
  )
);
