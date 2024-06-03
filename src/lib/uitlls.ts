export function capitalize(str: any) {
  if (typeof str !== "string") {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function lowercase(str: any) {
  if (typeof str !== "string") {
    return "";
  }
  return str.toLowerCase();
}

export function isObjectEmpty(obj: object) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false; // The object is not empty
    }
  }
  return true; // The object is empty
}

export function ArrayUnique(array: any[]) {
  if (!Array.isArray(array)) {
    throw new Error("Input harus berupa array");
  }

  // Buat objek Set untuk menyimpan nilai unik
  const uniqueSet = new Set();

  // Filter nilai yang unik
  const uniqueArray = array.filter((item) => {
    // Nilai null diabaikan, karena null akan dianggap sama oleh Set
    if (item === null) {
      return true;
    }
    // Jika nilai belum ada di Set, tambahkan dan kembalikan true
    if (!uniqueSet.has(item)) {
      uniqueSet.add(item);
      return true;
    }
    // Jika nilai sudah ada di Set, kembalikan false
    return false;
  });

  return uniqueArray;
}

export function getFileNameFormat(fileName: any) {
  const match = fileName?.match(/\.(\w+)$/);
  return match ? match[1] : null;
}

export function cutText(text: string, cut: number = 80) {
  if (text?.length > cut) {
    return text.slice(0, cut) + "...";
  }
  return text;
}

export function splitQueryLocation(query: string) {
  if (typeof query !== "string") {
    return ["", ""];
  }
  if (query && query?.trim()) {
    const arr = query?.split("-");
    if (arr === undefined) {
      return ["", ""];
    }
    return arr;
  }
}

export function countGroupingCart(carts: any[]) {
  let counter: number = 0;
  if (!carts?.length) {
    return counter;
  }
  carts?.forEach((element) => {
    counter += parseInt(element?.items?.length);
  });

  return counter;
}

export function excludeGrouping(carts: any[]) {
  const res: any = [];

  carts?.forEach((element: any) => {
    if (element?.items?.length) {
      return res.push(...element?.items);
    }
  });
  return res;
}

export function individualToGroupping(carts: any[]) {
  const groups = Object.values(
    carts.reduce((acc, item) => {
      const { venueId, venueName, linkUrl, address, privacyPolicy } = item;
      if (!acc[venueId]) {
        acc[venueId] = {
          venueId,
          venueName,
          linkUrl,
          address,
          privacyPolicy,
          items: [],
        };
      }
      acc[venueId].items.push(item);
      return acc;
    }, {})
  );

  return groups;
}

//NEW

const createOnChangeHandler = (
  type: string,
  field: string,
  setFields: (path: string, value: string) => void
) => {
  return (value: string) =>
    setFields(`pemohon.${type === "P" ? "wanita" : "pria"}.${field}`, value);
};

const getValue = (fields: any, type: "P" | "L", field: string): string => {
  return fields.pemohon[type === "P" ? "wanita" : "pria"][field] || "";
};

const createOnSelectionChangeHandler = (
  type: "P" | "L",
  field: string,
  setFields: (path: string, value: string) => void
) => {
  return (e: React.ChangeEvent<HTMLSelectElement> | any) => {
    const value: any = Array.from(e)?.[0];
    setFields(`pemohon.${type === "P" ? "wanita" : "pria"}.${field}`, value);
  };
};

export { createOnChangeHandler, getValue, createOnSelectionChangeHandler };
