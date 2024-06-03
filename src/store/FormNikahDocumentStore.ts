import { create } from "zustand";
import { devtools } from "zustand/middleware";
import produce from "immer";


function generateRandomNIK() {
  let nik = '';
  for (let i = 0; i < 16; i++) {
    nik += Math.floor(Math.random() * 10); // Menambahkan angka acak antara 0-9
  }
  return nik;
}
const pekId = 'fd185e32-2ee6-4678-adb6-bc6aac372a02'
const apaId = '8166e6cc-80d9-4a4a-94c8-c6606f740391'
const defaultField: any = {
  documentNikah: {
    aparatId: apaId,
    tanggalAkad: "2020-01-01 12:00",
    statusTempatAkad: "1",
    saksi1: "HER",
    saksi2: "HER1",
    kuaPencatatanId: "1",
    tanggalDiterimaKua: "2020-01-01",
    tanggalSuratKeluar: "2020-01-01",
    statusPemohon: "1",
    nskp: "120121",
    nskw: "120121",
    alamatTempatAkad: "asas",
  },
  pemohonPria: {
    nama: "Nasrul",
    gelarDepan: "Prof",
    gelarBelakang: "s,.kom",
    nik: generateRandomNIK(),
    pendidikan: "S1",
    gender: "L",
    tempatLahir: "popayato",
    tanggalLahir: "2020-01-01",
    statusWargaNegara: "WNI",
    pekerjaanId: pekId,
    telepon: "1212121",
    statusPerkawinan: "Jejaka",
    pasanganKe: "",
    agama: "konghucu",
    n6Id: "",
  },
  pemohonWanita: {
    nama: "Wulan",
    gelarDepan: "Prof",
    gelarBelakang: "s,.kom",
    nik: generateRandomNIK(),
    pendidikan: "S1",
    gender: "P",
    tempatLahir: "popayato",
    tanggalLahir: "2020-01-01",
    statusWargaNegara: "WNI",
    pekerjaanId: pekId,
    telepon: "1212121",
    statusPerkawinan: "Perawan",
    pasanganKe: "",
    agama: "islam",
    n6Id: "",
  },

  ortuAyahPria: {
    statusHidup: "1",
    binti: "asla",
    nama: "ARIS",
    nik: generateRandomNIK(),
    pendidikan: "S1",
    gender: "L",
    tempatLahir: "popayato",
    tanggalLahir: "2020-01-01",
    pekerjaanId: pekId,
    agama: "islam",
    statusWargaNegara: "WNI",
  },
  ortuIbuPria: {
    statusHidup: "1",
    binti: "asla",
    nama: "INDA",
    nik: generateRandomNIK(),
    pendidikan: "S1",
    gender: "L",
    tempatLahir: "popayato",
    tanggalLahir: "2020-01-01",
    pekerjaanId: pekId,
    agama: "islam",
    statusWargaNegara: "WNI",
  },
  ortuAyahWanita: {
    statusHidup: "1",
    binti: "asla",
    nama: "CARL",
    nik: generateRandomNIK(),
    pendidikan: "S1",
    gender: "P",
    tempatLahir: "popayato",
    tanggalLahir: "2020-01-01",
    pekerjaanId: pekId,
    agama: "islam",
    statusWargaNegara: "WNI",
  },
  ortuIbuWanita: {
    statusHidup: "1",
    binti: "asla",
    nama: "STEPHANIE",
    nik: generateRandomNIK(),
    pendidikan: "S1",
    gender: "P",
    tempatLahir: "popayato",
    tanggalLahir: "2020-01-01",
    pekerjaanId: pekId,
    agama: "islam",
    statusWargaNegara: "WNI",
  },
};

export const useStore = create<any>()(
  devtools(
    (set, get) => ({
      fields: defaultField,
      processing: false,
      rowSelected: null,
      step: 1,
      setFields: (key: any, value: any, step: number) => {
        return set((state: any) => ({
          fields: { ...state?.fields, [key]: value },
          step: step,
        }));
      },

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
      name: "form-nikah-document-storage",
    }
  )
);
