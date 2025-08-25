import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PublicLayout from "@/components/public-layout";
import PaketFilters from "@/components/paket/paket-filters";
import Pagination from "@/components/paket/pagination";
import { TourPackage } from "@/hooks/use-package";
import CtaButtons from "@/components/paket/cta-section";

const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_STORAGE_URL || "https://api-travel.elhusain.travel";
const API_HOST =
  process.env.API_HOST || "https://api-travel.elhusain.travel/api";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

const getImageUrl = (imageUrl: string | null) => {
  if (!imageUrl || imageUrl.trim() === "") {
    return "/images/placeholder.jpg";
  }
  return `${IMAGE_BASE_URL}${
    imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`
  }`;
};

interface PaketPageProps {
  searchParams?: {
    search?: string;
    category?: string;
    sort?: string;
    page?: string;
  };
}

export default async function PaketPage({ searchParams }: PaketPageProps) {
  const search = searchParams?.search || "";
  const categoryId = searchParams?.category || "all";
  const sortBy = searchParams?.sort || "newest";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 9;

  // 4. Bangun URL untuk memanggil API backend Anda DI SISI SERVER
  const params = new URLSearchParams({
    page: currentPage.toString(),
    limit: limit.toString(),
    sort: sortBy,
  });
  if (search) params.set("search", search);
  if (categoryId && categoryId !== "all") params.set("categoryId", categoryId);

  let packages = [];
  let categories = [];
  let meta = { totalCount: 0, totalPages: 0 };
  // const isLoading = false; // Akan kita handle dengan Suspense jika perlu, untuk sekarang anggap false

  try {
    // Panggil API paket dan kategori secara bersamaan
    const [packagesRes, categoriesRes] = await Promise.all([
      fetch(`${API_HOST}/tour-packages?${params.toString()}`, {
        cache: "no-store",
      }), // 'no-store' untuk data dinamis
      fetch(`${API_HOST}/categories`, { next: { revalidate: 3600 } }), // Cache kategori selama 1 jam
    ]);

    if (packagesRes.ok) {
      const packagesData = await packagesRes.json();
      packages = packagesData.data;
      meta = packagesData.meta;
    }
    if (categoriesRes.ok) {
      const categoriesData = await categoriesRes.json();
      categories = categoriesData.data;
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
    // Handle error state, mungkin dengan menampilkan pesan error
  }

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 mt-12">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Paket Travel
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Temukan paket travel terbaik dengan pelayanan prima dari
                El.Husain Travel
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <PaketFilters
            categories={categories}
            totalResults={meta.totalCount}
          />

          {/* Package Grid */}
          {packages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {packages.map((pkg: TourPackage) => (
                <Card
                  key={pkg.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link
                    href={`/paket/${pkg.id}`}
                    className="block aspect-video relative bg-gray-200"
                  >
                    <Image
                      src={getImageUrl(pkg.mainImageUrl)}
                      alt={pkg.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                      <Badge className="bg-amber-800 text-white text-xs sm:text-sm">
                        {pkg.category?.name || ""}
                      </Badge>
                    </div>
                  </Link>
                  <CardContent className="p-3 sm:p-6">
                    <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                      {pkg.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                      {pkg.shortDescription}
                    </p>
                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                      <div className="text-lg sm:text-2xl font-bold text-amber-800 truncate mr-2">
                        {formatPrice(pkg.price)}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                        {pkg.duration} hari
                      </div>
                    </div>
                    <Link href={`/paket/${pkg.id}`}>
                      <button className="btn btn-warning text-white w-full text-xs sm:text-sm py-2 sm:py-2.5">
                        Lihat Detail
                      </button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Tidak ada paket ditemukan
              </h3>
              <p className="text-gray-600">Coba ubah filter pencarian Anda.</p>
            </div>
          )}

          <Pagination currentPage={currentPage} totalPages={meta.totalPages} />
        </div>

        <CtaButtons />
      </div>
    </PublicLayout>
  );
}
