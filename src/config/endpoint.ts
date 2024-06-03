const BASE_URL = process.env.NEXT_PUBLIC_BE_URL;
const SIGN_UP = `${BASE_URL}/auth/desa/signin`;
const PEKERJAAN = `${BASE_URL}/masters/pekerjaan`;
const JABATAN = `${BASE_URL}/masters/jabatan`;
const APARATUR = `${BASE_URL}/masters/aparatur-desa`;
const DOKUMEN_NIKAH = `${BASE_URL}/document/nikah`;
const DOKUMEN_NIKAH_FORM = `${BASE_URL}/document/nikah/store`;
const DOKUMEN_N6 = `${BASE_URL}/n6`;
const USERS_DESA = `${BASE_URL}/users/desa/get`;
const MYPROFILE = `${BASE_URL}/users/desa/my-profile`;
const CHANGE_PROFILE = `${BASE_URL}/users/desa/change-profile`;
const CHANGE_PASSWORD = `${BASE_URL}/users/desa/change-password`;

export {
  DOKUMEN_N6,
  MYPROFILE,
  CHANGE_PASSWORD,
  CHANGE_PROFILE,
  PEKERJAAN,
  USERS_DESA,
  JABATAN,
  APARATUR,
  DOKUMEN_NIKAH,
  DOKUMEN_NIKAH_FORM,
  SIGN_UP,
};
