import { create } from "zustand";
import { devtools } from "zustand/middleware";

function generateRandomNIK() {
  let nik = "";
  for (let i = 0; i < 16; i++) {
    nik += Math.floor(Math.random() * 10); // Menambahkan angka acak antara 0-9
  }
  return nik;
}

const defaultField: any = {
  tanggal_surat_keluar: "2024-06-01",
  nomor_surat_keluar: "X10/567/DESA/1020394/2024",
  aparaturdesa_id: "885ca460-4b5e-485d-9883-ef945c4878de",
  // nama_aparaturdesa: "AGUS WALUYO",
  nama: "Almarhuma",
  gelar_depan: "",
  gelar_belakang: "",
  jenis_kelamin: "L",
  pendidikan_terakhir: "SD",
  nama_panggilan: "Almarhuma",
  bin_binti: "Almarhuma",
  tempat_lahir: "Tangerang",
  tanggal_lahir: "1985",
  nik: generateRandomNIK(),
  kewarganegaraan: "Indonesia",
  agama: "Islam",
  pekerjaanId: "Wiraswasta",
  // alamat_desa_id: "1101010001",
  // alamat_nama_desa: "LATIUNG",
  // alamat_lengkap: "LATIUNG",
  tanggal_meninggal: "2024-01-01",
  alamat_meninggal: "",
};

export const useStore = create<any>()(
  devtools(
    (set, get) => ({
      columns: [
        { name: "NOMOR SURAT KELUAR", uid: "nomor_surat_keluar" },
        { name: "TANGGAL SURAT KELUAR", uid: "tanggal_surat_keluar" },
        { name: "NAMA", uid: "nama" },
        { name: "JENIS KELAMIN", uid: "jenis_kelamin" },
        { name: "TANGGAL MENINGGAL", uid: "tanggal_meninggal" },
        { name: "ACTIONS", uid: "actions" },
      ],
      modals: {
        alertDelete: false,
      },
      fields: defaultField,
      processing: false,
      rowSelected: null,
      step: 1,
      setFields: (newFields: any, step: number) => {
        return set((state: any) => ({
          fields: { ...state?.fields, ...newFields },
          step: step,
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
      name: "form-nikah-kematian-storage",
    }
  )
);
