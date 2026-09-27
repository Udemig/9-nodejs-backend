/**
 * Dynamic Client-Side Vehicle Imagery Engine (powered by Imagin.studio API)
 *
 * Strict Architectural Rule:
 * ZERO car image URLs or binary data are stored in MongoDB.
 * Images are dynamically generated on the client side using Imagin.studio's
 * real-time automotive 3D camera render API with multiple camera angles.
 */

export interface CarGalleryItem {
  url: string;
  title: string;
  angle: string;
}

const IMAGIN_CUSTOMER_KEY = "hrjavascript-mastery";

interface CleanVehicleModel {
  make: string;
  modelFamily: string;
}

/**
 * Normalizes brand and model names to standard Imagin Studio identifiers
 */
function normalizeMakeAndModel(brand: string, model: string): CleanVehicleModel {
  const b = brand.toLowerCase().trim();
  const m = model.toLowerCase().trim();

  // Mercedes variations
  if (b.includes("mercedes")) {
    if (m.includes("g 63") || m.includes("g-class") || m.includes("g63")) {
      return { make: "mercedes", modelFamily: "g-class" };
    }
    if (m.includes("s 580") || m.includes("s-class") || m.includes("s580") || m.includes("maybach s")) {
      return { make: "mercedes", modelFamily: "s-class" };
    }
    if (m.includes("eqs")) {
      return { make: "mercedes", modelFamily: "eqs" };
    }
    if (m.includes("v-class") || m.includes("v class") || m.includes("vito")) {
      return { make: "mercedes", modelFamily: "v-class" };
    }
    if (m.includes("a 45") || m.includes("a-class")) {
      return { make: "mercedes", modelFamily: "a-class" };
    }
    if (m.includes("e 300") || m.includes("e-class")) {
      return { make: "mercedes", modelFamily: "e-class" };
    }
    if (m.includes("amg gt") || m.includes("gt coupe")) {
      return { make: "mercedes", modelFamily: "amg-gt" };
    }
    return { make: "mercedes", modelFamily: "c-class" };
  }

  // Range Rover / Land Rover
  if (b.includes("range rover") || b.includes("land rover")) {
    if (m.includes("sport")) return { make: "land-rover", modelFamily: "range-rover-sport" };
    if (m.includes("velar")) return { make: "land-rover", modelFamily: "range-rover-velar" };
    if (m.includes("evoque")) return { make: "land-rover", modelFamily: "range-rover-evoque" };
    if (m.includes("defender")) return { make: "land-rover", modelFamily: "defender" };
    return { make: "land-rover", modelFamily: "range-rover" };
  }

  // Porsche
  if (b.includes("porsche")) {
    if (m.includes("911") || m.includes("carrera") || m.includes("gt3")) {
      return { make: "porsche", modelFamily: "911" };
    }
    if (m.includes("taycan")) {
      return { make: "porsche", modelFamily: "taycan" };
    }
    if (m.includes("cayenne")) {
      return { make: "porsche", modelFamily: "cayenne" };
    }
    if (m.includes("macan")) {
      return { make: "porsche", modelFamily: "macan" };
    }
    if (m.includes("panamera")) {
      return { make: "porsche", modelFamily: "panamera" };
    }
    return { make: "porsche", modelFamily: "911" };
  }

  // BMW
  if (b.includes("bmw")) {
    if (m.includes("i7")) return { make: "bmw", modelFamily: "i7" };
    if (m.includes("740") || m.includes("7 series")) return { make: "bmw", modelFamily: "7-series" };
    if (m.includes("m8") || m.includes("8 series")) return { make: "bmw", modelFamily: "8-series" };
    if (m.includes("m4") || m.includes("4 series")) return { make: "bmw", modelFamily: "4-series" };
    if (m.includes("i4")) return { make: "bmw", modelFamily: "i4" };
    if (m.includes("x7")) return { make: "bmw", modelFamily: "x7" };
    if (m.includes("x5")) return { make: "bmw", modelFamily: "x5" };
    if (m.includes("m135") || m.includes("1 series")) return { make: "bmw", modelFamily: "1-series" };
    return { make: "bmw", modelFamily: m.split(" ")[0] || "4-series" };
  }

  // Tesla
  if (b.includes("tesla")) {
    if (m.includes("model s")) return { make: "tesla", modelFamily: "model-s" };
    if (m.includes("model x")) return { make: "tesla", modelFamily: "model-x" };
    if (m.includes("model 3")) return { make: "tesla", modelFamily: "model-3" };
    if (m.includes("model y")) return { make: "tesla", modelFamily: "model-y" };
    return { make: "tesla", modelFamily: "model-s" };
  }

  // Audi
  if (b.includes("audi")) {
    if (m.includes("e-tron")) return { make: "audi", modelFamily: "e-tron-gt" };
    if (m.includes("r8")) return { make: "audi", modelFamily: "r8" };
    if (m.includes("rs q8") || m.includes("q8")) return { make: "audi", modelFamily: "q8" };
    if (m.includes("rs7") || m.includes("a7")) return { make: "audi", modelFamily: "a7" };
    if (m.includes("rs6") || m.includes("a6")) return { make: "audi", modelFamily: "a6" };
    if (m.includes("rs3") || m.includes("a3")) return { make: "audi", modelFamily: "a3" };
    return { make: "audi", modelFamily: m.split(" ")[0] || "a6" };
  }

  // Ferrari
  if (b.includes("ferrari")) {
    if (m.includes("f8")) return { make: "ferrari", modelFamily: "f8-tributo" };
    return { make: "ferrari", modelFamily: "roma" };
  }

  // Lamborghini
  if (b.includes("lamborghini")) {
    if (m.includes("urus")) return { make: "lamborghini", modelFamily: "urus" };
    return { make: "lamborghini", modelFamily: "huracan" };
  }

  // Aston Martin
  if (b.includes("aston martin")) {
    if (m.includes("dbx")) return { make: "aston-martin", modelFamily: "dbx" };
    return { make: "aston-martin", modelFamily: "vantage" };
  }

  // Bentley
  if (b.includes("bentley")) {
    if (m.includes("bentayga")) return { make: "bentley", modelFamily: "bentayga" };
    if (m.includes("flying spur")) return { make: "bentley", modelFamily: "flying-spur" };
    return { make: "bentley", modelFamily: "continental-gt" };
  }

  // Rolls-Royce
  if (b.includes("rolls-royce")) {
    if (m.includes("cullinan")) return { make: "rolls-royce", modelFamily: "cullinan" };
    return { make: "rolls-royce", modelFamily: "ghost" };
  }

  // Maserati
  if (b.includes("maserati")) {
    return { make: "maserati", modelFamily: "ghibli" };
  }

  // Volvo
  if (b.includes("volvo")) {
    return { make: "volvo", modelFamily: "xc90" };
  }

  // Volkswagen
  if (b.includes("volkswagen")) {
    if (m.includes("caravelle") || m.includes("multivan")) return { make: "volkswagen", modelFamily: "multivan" };
    return { make: "volkswagen", modelFamily: "golf" };
  }

  // Lexus
  if (b.includes("lexus")) {
    if (m.includes("lm")) return { make: "lexus", modelFamily: "lm" };
    return { make: "lexus", modelFamily: "rx" };
  }

  // Mini
  if (b.includes("mini")) {
    return { make: "mini", modelFamily: "cooper" };
  }

  // Chevrolet
  if (b.includes("chevrolet")) {
    return { make: "chevrolet", modelFamily: "corvette" };
  }

  // Toyota
  if (b.includes("toyota")) {
    return { make: "toyota", modelFamily: "supra" };
  }

  // Nissan
  if (b.includes("nissan")) {
    if (m.includes("gt-r") || m.includes("gtr")) return { make: "nissan", modelFamily: "gt-r" };
    return { make: "nissan", modelFamily: m.split(" ")[0] };
  }

  // Cadillac
  if (b.includes("cadillac")) {
    if (m.includes("escalade")) return { make: "cadillac", modelFamily: "escalade" };
    return { make: "cadillac", modelFamily: "escalade" };
  }

  // Lucid
  if (b.includes("lucid")) {
    return { make: "lucid", modelFamily: "air" };
  }

  // Default fallback: sanitize make and first model token
  return {
    make: b.replace(/[^a-z0-9]+/g, "-"),
    modelFamily: m.split(" ")[0].replace(/[^a-z0-9]+/g, "-"),
  };
}

/**
 * Supported Imagin Studio Angles (from official angle chart: 01 to 33):
 * - '01': Key marketing front-three-quarter shot (default)
 * - '05': Full side profile (left)
 * - '09': Rear three-quarter view (left)
 * - '13': Full rear direct view
 * - '17': Elevated rear three-quarter
 * - '21': High side angle
 * - '22': Low side profile
 * - '23': Direct front-facing low view
 * - '25': Front three-quarter low view
 * - '27': Elevated front three-quarter view
 * - '28': Front three-quarter right
 * - '29': Full front direct view
 * - '33': Top-down bird's-eye / overhead view
 */
export const SUPPORTED_IMAGIN_ANGLES = [
  { angle: '01', label: 'Ön Üç Çeyrek (Ana Görünüm)' },
  { angle: '05', label: 'Tam Yan Profil' },
  { angle: '09', label: 'Arka Üç Çeyrek Profil' },
  { angle: '13', label: 'Tam Arka Görünüm' },
  { angle: '17', label: 'Yüksek Arka Perspektif' },
  { angle: '21', label: 'Yüksek Yan Açı' },
  { angle: '22', label: 'Alçak Yan Profil' },
  { angle: '23', label: 'Ön Cephe (Alçak Dinamik)' },
  { angle: '25', label: 'Alçak Ön Üç Çeyrek' },
  { angle: '27', label: 'Yüksek Açılı Ön Perspektif' },
  { angle: '28', label: 'Sağ Ön Üç Çeyrek' },
  { angle: '29', label: 'Tam Ön Doğrudan Görünüm' },
  { angle: '33', label: 'Kuşbakışı Tepe Görünümü' },
] as const;

/**
 * Builds an Imagin.studio URL for a given vehicle and camera angle.
 * Default angle is '01' (key marketing front-three-quarter view).
 */
export function buildImaginCarUrl(
  brand: string,
  model: string,
  angle: string = '01',
  year: number = 2024
): string {
  const { make, modelFamily } = normalizeMakeAndModel(brand, model);
  const url = new URL('https://cdn.imagin.studio/getImage');

  url.searchParams.set('customer', IMAGIN_CUSTOMER_KEY);
  url.searchParams.set('make', make);
  url.searchParams.set('modelFamily', modelFamily);
  url.searchParams.set('modelYear', year.toString());
  url.searchParams.set('angle', angle);
  url.searchParams.set('zoomType', 'fullscreen');

  return url.toString();
}

/**
 * Primary card showcase image (default angle: '01' Front 3/4)
 */
export function getCarImage(
  brand: string,
  model: string,
  _category: string = 'Spor',
  year: number = 2024
): string {
  return buildImaginCarUrl(brand, model, '01', year);
}

/**
 * Multi-angle dynamic gallery for vehicle detail page
 * Uses verified supported angles: 01, 05, 09, 13, 23, 27, 33
 */
export function getCarGallery(
  brand: string,
  model: string,
  _category: string = 'Spor',
  year: number = 2024
): CarGalleryItem[] {
  return [
    {
      url: buildImaginCarUrl(brand, model, '01', year),
      title: 'Ön Üç Çeyrek Dinamik Açı (Varsayılan)',
      angle: '01',
    },
    {
      url: buildImaginCarUrl(brand, model, '05', year),
      title: 'Tam Yan Profil',
      angle: '05',
    },
    {
      url: buildImaginCarUrl(brand, model, '09', year),
      title: 'Sol Arka Üç Çeyrek',
      angle: '09',
    },
    {
      url: buildImaginCarUrl(brand, model, '13', year),
      title: 'Tam Arka Görünüm',
      angle: '13',
    },
    {
      url: buildImaginCarUrl(brand, model, '23', year),
      title: 'Ön Cephe (Alçak Dinamik)',
      angle: '23',
    },
    {
      url: buildImaginCarUrl(brand, model, '27', year),
      title: 'Yüksek Açılı Ön Perspektif',
      angle: '27',
    },
    {
      url: buildImaginCarUrl(brand, model, '33', year),
      title: 'Kuşbakışı Tepe Görünümü',
      angle: '33',
    },
  ];
}
