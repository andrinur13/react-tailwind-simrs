"use client";

import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PatientsAPI } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";

import { toast } from "sonner";
import { 
  Search, 
  Users, 
  Phone, 
  CreditCard, 
  Calendar, 
  UserPlus,
  Eye,
  Loader2,
  UserCircle
} from "lucide-react";

export default function PatientPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [patients, setPatients] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [lastPage, setLastPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);

  const limit = 10;

  // Params dari URL
  const deleted = searchParams.get("deleted");
  const created = searchParams.get("created");
  const updated = searchParams.get("updated");

  // Handle Toast untuk created / deleted / updated
  React.useEffect(() => {
    if (deleted === "1") toast.success("Pasien berhasil dihapus!");
    if (created === "1") toast.success("Pasien berhasil dibuat!");
    if (updated === "1") toast.success("Pasien berhasil diperbarui!");

    if (deleted === "1" || created === "1" || updated === "1") {
      const t = setTimeout(() => {
        navigate("/master/pasien", { replace: true });
      }, 500);

      return () => clearTimeout(t);
    }
  }, [deleted, created, updated]);

  // Load API with debounced search
  React.useEffect(() => {
    const loadPatients = async () => {
      setLoading(true);
      try {
        const result: any = await PatientsAPI.getList(page, limit, search);
        setPatients(result.data);
        setLastPage(result.meta.pagination.total_pages);
        setTotal(result.meta.pagination.total);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      loadPatients();
    }, search ? 500 : 0);

    return () => clearTimeout(debounceTimer);
  }, [page, search]);

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === "0000-00-00") return "-";
    try {
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "-";
    }
  };

  // Gender Badge with theme colors
  const getGenderBadge = (gender: string) => {
    if (gender === "L") {
      return (
        <Badge variant="default" className="gap-1">
          <UserCircle className="w-3 h-3" />
          Laki-laki
        </Badge>
      );
    }
    if (gender === "P") {
      return (
        <Badge variant="secondary" className="gap-1">
          <UserCircle className="w-3 h-3" />
          Perempuan
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="gap-1 text-muted-foreground">
        <UserCircle className="w-3 h-3" />
        -
      </Badge>
    );
  };

  // BPJS Badge
  const getBpjsBadge = (bpjsNumber: string) => {
    if (!bpjsNumber) {
      return (
        <Badge variant="outline" className="gap-1 text-muted-foreground">
          <CreditCard className="w-3 h-3" />
          Tidak ada
        </Badge>
      );
    }
    return (
      <Badge variant="default" className="gap-1 font-mono text-xs">
        <CreditCard className="w-3 h-3" />
        {bpjsNumber}
      </Badge>
    );
  };

  // Age Badge with variant based on age group
  const getAgeBadge = (age: number) => {
    let variant: "default" | "secondary" | "outline" | "destructive" = "outline";
    
    if (age < 12) variant = "secondary";
    else if (age < 18) variant = "default";
    else if (age < 60) variant = "outline";
    else variant = "destructive";

    return (
      <Badge variant={variant} className="gap-1">
        <Calendar className="w-3 h-3" />
        {age || 0} th
      </Badge>
    );
  };

  // Phone Badge
  const getPhoneBadge = (phones: string[]) => {
    if (!phones || phones.length === 0) {
      return (
        <Badge variant="outline" className="gap-1 text-muted-foreground">
          <Phone className="w-3 h-3" />
          -
        </Badge>
      );
    }
    return (
      <div className="flex flex-wrap gap-1">
        {phones.slice(0, 1).map((phone, idx) => (
          <Badge key={idx} variant="secondary" className="gap-1 text-xs">
            <Phone className="w-3 h-3" />
            {phone}
          </Badge>
        ))}
        {phones.length > 1 && (
          <Badge variant="outline" className="text-xs">
            +{phones.length - 1}
          </Badge>
        )}
      </div>
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05 },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="shadow-sm">
        <CardHeader className="border-b">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-row justify-between items-start"
            >
              <div className="space-y-1">
                <CardTitle className="text-2xl text-primary flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Data Master Pasien
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Kelola data master pasien rumah sakit
                </p>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => navigate("/master/pasien/create")}
                  className="gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Tambah Pasien Baru
                </Button>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Cari berdasarkan nama, NIK, atau NORM..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="pl-10"
                />
              </div>
              <Badge variant="secondary" className="gap-1 px-3 py-1.5">
                <Users className="w-3 h-3" />
                {total} pasien
              </Badge>
            </motion.div>
          </motion.div>
        </CardHeader>

        <CardContent className="pt-6">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-10 h-10 text-primary" />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 text-muted-foreground font-medium"
                >
                  Memuat data pasien...
                </motion.p>
              </motion.div>
            ) : patients.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-16"
              >
                <Users className="w-16 h-16 mx-auto text-muted-foreground/50" />
                <div className="text-muted-foreground text-lg font-medium mt-4">
                  Tidak ada pasien ditemukan
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Coba sesuaikan pencarian atau tambah pasien baru
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="table"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold w-12">No</TableHead>
                        <TableHead className="font-semibold">NORM</TableHead>
                        <TableHead className="font-semibold">Nama Pasien</TableHead>
                        <TableHead className="font-semibold">NIK</TableHead>
                        <TableHead className="font-semibold">BPJS</TableHead>
                        <TableHead className="font-semibold">Gender</TableHead>
                        <TableHead className="font-semibold">Tgl Lahir</TableHead>
                        <TableHead className="font-semibold">Umur</TableHead>
                        <TableHead className="font-semibold">Telepon</TableHead>
                        <TableHead className="text-center font-semibold">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {patients.map((patient, i) => (
                        <motion.tr
                          key={patient.id}
                          custom={i}
                          variants={tableRowVariants}
                          initial="hidden"
                          animate="visible"
                          className="group hover:bg-muted/50 transition-colors"
                        >
                          <TableCell className="font-medium text-muted-foreground">
                            {(page - 1) * limit + (i + 1)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-mono">
                              {patient.norm || "-"}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            {patient.name || "-"}
                          </TableCell>
                          <TableCell>
                            <span className="font-mono text-sm text-muted-foreground">
                              {patient.nik || "-"}
                            </span>
                          </TableCell>
                          <TableCell>{getBpjsBadge(patient.bpjs_number)}</TableCell>
                          <TableCell>{getGenderBadge(patient.gender)}</TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">
                              {formatDate(patient.birth_date)}
                            </span>
                          </TableCell>
                          <TableCell>{getAgeBadge(patient.age)}</TableCell>
                          <TableCell>{getPhoneBadge(patient.phones)}</TableCell>
                          <TableCell className="text-center">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  navigate(`/master/pasien/detail/${patient.id}`)
                                }
                                className="gap-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                Detail
                              </Button>
                            </motion.div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-between mt-4"
                >
                  <div className="text-sm text-muted-foreground">
                    Menampilkan {(page - 1) * limit + 1} sampai{" "}
                    {Math.min(page * limit, total)} dari {total} pasien
                  </div>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => page > 1 && setPage(page - 1)}
                          className={
                            page === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      {Array.from({ length: Math.min(5, lastPage) }, (_, i) => {
                        const startPage = Math.max(
                          1,
                          Math.min(page - 2, lastPage - 4)
                        );
                        const currentPage = startPage + i;
                        return currentPage <= lastPage ? (
                          <PaginationItem key={currentPage}>
                            <PaginationLink
                              isActive={page === currentPage}
                              onClick={() => setPage(currentPage)}
                              className="cursor-pointer"
                            >
                              {currentPage}
                            </PaginationLink>
                          </PaginationItem>
                        ) : null;
                      })}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => page < lastPage && setPage(page + 1)}
                          className={
                            page === lastPage
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}